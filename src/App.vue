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
		const jwt = await this.getJwtFromUrl()
		if (jwt) {
			localStorage.setItem("jwt", jwt)
			this.getAuth(jwt)
			let toplistId = null
			for (const id in this.parseJwt(jwt).sco) {
				toplistId = id
			}
			await this.getAvailableReports(toplistId)
		}
	},

	methods: {
		getJwtFromUrl () {
			const vars = {}
			window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
				vars[key] = value
			})
			return vars.jwt
		},
		parseJwt (token) {
			const base64Url = token.split(".")[1]
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
			const jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
			}).join(""))

			return JSON.parse(jsonPayload)
		},
		async getAuth (jwt) {
			await axios({
				method: "post",
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				url: "https://profi.toplist.cz/api/auth",
				data: JSON.stringify({
					token: jwt
				})
			}).then((response) => {
				document.cookie = "authToken=" + response.data.token + ";samesite=strict;max-age=3600"
			}).catch((error) => {
				console.error(error)
			})
		},
		async getAvailableReports (id) {
			await axios({
				method: "get",
				url: "https://profi.toplist.cz/api/v1/profi/" + id + "/reports/month?limit=12",
				headers: {
					Authorization: this.$store.getters.getToken
				}
			}).then((response) => {
				console.log(response)
			})
		}

	}
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>
