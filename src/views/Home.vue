<template>
	<div>
		<NavBar />
		<SideBar />
		<div class="container" style="position: relative">
			<Settings
				:header="$t('settings')"
				:message="$t('displayedStatistics')"
				type="success"
			/>
			<Login />
			<NewReport />
			<ReportWOP />
			<Reports @runAppAgain="runApp(true)" />
			<Footer />
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"
import Login from "@/components/Login.vue"
import NewReport from "@/components/NewReport.vue"
import Settings from "@/components/Settings.vue"
import Reports from "@/components/Reports.vue"
import Footer from "@/components/Footer.vue"
import ReportWOP from "@/components/ReportWOP.vue"
import axios from "axios"
import { getJwtFromUrl, parseJwt } from "@/utils/authHelpers"
import { API_HOST, APP_ID } from "@/consts.js"
import moment from "moment"

export default {
	name: "Home",

	components: {
		NavBar,
		Login,
		NewReport,
		Settings,
		Reports,
		Footer,
		SideBar,
		ReportWOP
	},

	async created () {
		await this.runApp()
	},

	methods: {
		async runApp (repeat = false) {
			const loadingComponent = this.$buefy.loading.open()

			await this.getStats()
			const jwt = await getJwtFromUrl()
			if (jwt) {
				if (!parseJwt(jwt)) {
					await this.$router.push({ path: "/" })
					this.$store.commit("setIsLoggedIn", false)

					loadingComponent.close()
				} else {
					let toplistId = null
					for (const id in parseJwt(jwt).sco) {
						toplistId = id
					}

					this.$store.commit("setToplistId", toplistId)
					this.$store.commit("setJWT", jwt)
					setTimeout(this.renewJWT, 60000)

					if (!sessionStorage.getItem("authToken")) {
						await this.getAuth(jwt, toplistId, repeat)
					} else {
						this.$store.commit("setIsLoggedIn", true)
						await this.getAvailableReports(toplistId, repeat)
					}
				}
			}
			loadingComponent.close()
		},

		async renewJWT () {
			// console.log(this.jwt)
			await axios({
				method: "put",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: `${API_HOST}/auth/${APP_ID}`,
				data: JSON.stringify({
					token: this.$store.state.jwt
				})
			}).then((response) => {
				this.$store.commit("setJWT", response.data.token)
				setTimeout(this.renewJWT, 60000)
			})
		},

		async getAuth (jwt, topListId, repeat) {
			await axios({
				method: "put",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: `${API_HOST}/auth/${APP_ID}`,
				data: JSON.stringify({
					token: jwt
				})
			}).then((response) => {
				sessionStorage.setItem("authToken", response.data.token)
				this.getAvailableReports(topListId)
				this.$store.commit("setIsLoggedIn", true)
			}).catch((error) => {
				if (error.response.status === 401 && !repeat) {
					sessionStorage.removeItem("authToken")
					this.runApp(true)
				} else {
					this.somethingWentWrong(repeat)
				}
			})
		},

		async getAvailableReports (id, repeat) {
			await axios({
				method: "get",
				url: `${API_HOST}/v1/profi/${id}/reports/month?limit=12`,
				headers: {
					Authorization: sessionStorage.getItem("authToken")
				}
			}).then((response) => {
				this.$store.commit("setAvailableReports", response.data.filter(i => i.status === "done"))
				if (response.data.length === 0 || response.data[0].dateFrom !== moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")) {
					this.$store.commit("setDisplayNewReport", true)
					this.$store.commit("setNewReportData", {
						id: (response.data.length > 0) ? response.data[0].id : 0,
						days: this.reportCountdownDays(),
						time: this.reportCountdown()
					})
				}
				if (response.data.length > 0 && response.data[0].status !== "done") {
					this.$store.commit("setReportWOP", true)
					// this.$store.commit("setDisplayNewReport", false) - zatim ukazovat oboje
				}
			}).catch((error) => {
				if (error.response && error.response.status === 401 && !repeat) {
					sessionStorage.removeItem("authToken")
					this.runApp(true)
				} else {
					this.somethingWentWrong(repeat)
				}
			})
		},

		reportCountdownDays () {
			const now = new Date().getTime()
			const distance = moment().endOf("month").toDate() - now
			return Math.floor(distance / (1000 * 60 * 60 * 24))
		},

		somethingWentWrong (logout) { // nekdy to je logout a nekdy repeat?
			if (logout) {
				sessionStorage.removeItem("authToken")
				this.$router.push({ path: "/" })
				this.$store.commit("setIsLoggedIn", false)
			} else {
				// this.runApp(true) // pri chybe neopakovat porad dokola
			}

			this.$buefy.notification.open({
				duration: 3000,
				message: logout ? this.$t("loggedOut") : this.$t("somethingWentWrong"),
				position: "is-bottom",
				type: "is-warning",
				hasIcon: true
			})
		},

		reportCountdown () {
			const now = new Date().getTime()
			return moment().endOf("month").toDate() - now
		},

		async getStats () {
			await axios({
				method: "get",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: `${API_HOST}/sharedData/job`
			}).then((response) => {
				this.$store.commit("setStats", response.data)
			}).catch(() => {
				this.somethingWentWrong(false)
			})
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>
