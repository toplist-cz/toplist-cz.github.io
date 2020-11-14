<template>
	<div>
		<NavBar />
		<div class="container">
			<Alert header="Nastavení" message="zobrazené statistiky:" type="success" />
			<Login :display="isLoggedIn" />
			<NewReport :display="isLoggedIn" />
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
import { API_HOST } from "./consts.js"

export default {
	name: "App",
	components: {
		NavBar,
		Login,
		NewReport,
		Alert,
		Reports
	},
	data () {
		return {
			isLoggedIn: false
		}
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
				this.isLoggedIn = true
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
				document.cookie = `authToken=${response.data.token};samesite=strict;max-age=24000`
				this.getAvailableReports(topListId)
				this.isLoggedIn = true
			}).catch(error => {
				console.error(error)
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
			}).catch(error => {
				console.error(error)
			})
		}

	}
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>
