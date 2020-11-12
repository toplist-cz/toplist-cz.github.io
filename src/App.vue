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
	}
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>
