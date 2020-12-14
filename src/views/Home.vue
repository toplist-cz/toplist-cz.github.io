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
import axios from "axios"
import { getCookie, getJwtFromUrl, parseJwt } from "@/utils/authHelpers"
import { API_HOST } from "@/consts.js"
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
		SideBar
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

					if (!getCookie("authToken")) {
						await this.getAuth(jwt, toplistId, repeat)
					} else {
						this.$store.commit("setIsLoggedIn", true)
						await this.getAvailableReports(toplistId, repeat)
					}
				}
			}
			loadingComponent.close()
		},

		async getAuth (jwt, topListId, repeat) {
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
				// document.cookie = `authToken=${response.data.token};samesite=strict;max-age=3600;path=/`
				document.cookie = `authToken=${response.data.token};max-age=3600;path=/`
				this.getAvailableReports(topListId)
				this.$store.commit("setIsLoggedIn", true)
			}).catch((error) => {
				// TODO catchOr
				if (error.response.status === 401 && !repeat) {
					document.cookie = "authToken=;samesite=strict;max-age=0"
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
					Authorization: getCookie("authToken")
				}
			}).then((response) => {
				this.$store.commit("setAvailableReports", response.data)
				if (response.data.length === 0 || response.data[0].dateFrom !== moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")) {
					this.$store.commit("setDisplayNewReport", true)
					this.$store.commit("setNewReportData", {
						id: response.data[0].id,
						days: this.reportCountdownDays(),
						time: this.reportCountdown()
					})
				}
			}).catch((error) => {
				// TODO catchOr
				if (error.response.status === 401 && !repeat) {
					document.cookie = "authToken=;samesite=strict;max-age=0"
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

		somethingWentWrong (logout) {
			if (logout) {
				document.cookie = "authToken=;samesite=strict;max-age=0"
				this.$router.push({ path: "/" })
				this.$store.commit("setIsLoggedIn", false)
			} else {
				this.runApp(true)
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
