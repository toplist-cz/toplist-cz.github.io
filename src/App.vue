<template>
	<div>
		<NavBar />
		<div class="container">
			<Alert header="Nastavení" message="zobrazené statistiky:" type="success" />
			<Login />
			<NewReport />
			<Reports />
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import Login from "@/components/Login.vue"
import NewReport from "@/components/NewReport.vue"
import Alert from "@/components/Alert.vue"
import Reports from "@/components/Reports.vue"
import axios from "axios"
import { getCookie, getJwtFromUrl, parseJwt } from "@/utils/authHelpers"
import { API_HOST } from "@/consts.js"
import moment from "moment"

export default {
	name: "App",
	components: {
		NavBar,
		Login,
		NewReport,
		Alert,
		Reports
	},

	async created () {
		const loadingComponent = this.$buefy.loading.open()
		const jwt = await getJwtFromUrl()
		if (jwt) {
			let toplistId = null
			for (const id in parseJwt(jwt).sco) {
				toplistId = id
			}

			this.$store.commit("setToplistId", toplistId)

			if (!getCookie("authToken")) {
				await this.getAuth(jwt, toplistId)
			} else {
				this.$store.commit("setIsLoggedIn", true)
				await this.getAvailableReports(toplistId)
			}
		}
		loadingComponent.close()
	},

	methods: {
		async getAuth (jwt, topListId) {
			await axios({
				method: "post",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: `${API_HOST}/auth`,
				data: JSON.stringify({
					token: jwt
				})
			}).then((response) => {
				document.cookie = `authToken=${response.data.token};samesite=strict;max-age=3600`
				this.getAvailableReports(topListId)
				this.$store.commit("setIsLoggedIn", true)
			}).catch(error => {
				console.error(error)

				this.$store.commit("setIsLoggedIn", false)
				this.$buefy.notification.open({
					duration: 3000,
					message: error.response ? error.response.data.description : "Something went wrong",
					position: "is-bottom-right",
					type: "is-danger",
					hasIcon: true
				})
			})
		},
		async getAvailableReports (id) {
			await axios({
				method: "get",
				url: `${API_HOST}/v1/profi/${id}/reports/month?limit=12`,
				headers: {
					Authorization: getCookie("authToken")
				}
			}).then((response) => {
				this.$store.commit("setAvailableReports", response.data)
				if (response.data.length === 0 || response.data[0].dateFrom !== moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")) {
					this.$store.commit("setDisplayNewReport", true)
					this.$store.commit("setNewReportData", {
						id: response.data[0].id,
						days: this.reportCountdown()
					})
				}
			}).catch(error => {
				document.cookie = "authToken=;samesite=strict;max-age=0"
				this.$buefy.notification.open({
					duration: 3000,
					message: error.response.data.description,
					position: "is-bottom-right",
					type: "is-danger",
					hasIcon: true
				})
			})
		},
		reportCountdown () {
			const now = new Date().getTime()
			const distance = moment().endOf("month").toDate() - now
			return Math.floor(distance / (1000 * 60 * 60 * 24))
		},
		async getStats () {
			await axios({
				method: "post",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: `${API_HOST}/sharedData/job`
			}).then((response) => {
				console.log(response.data)
				// this.$store.commit("setStats", response.data)
			}).catch(error => {
				console.error(error)
				this.$buefy.notification.open({
					duration: 3000,
					message: error.response.data.description,
					position: "is-bottom-right",
					type: "is-danger",
					hasIcon: true
				})
			})
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>
