<template>
	<div class="box box-login" v-if="displayNewReport">
		<h2 class="mb-3">Nový report</h2>
		<p class="mb-3">
			Report za předchozí mesíč ještě není vytvořen.
			<br>
			Čas, kdy jej bude možné vytvořit, je ještě {{ newReportData.days }} dní.
		</p>
		<button @click="crateReport" class="c-button button-blue">
			<i class="icofont-plus" />
			Vytvořit report
		</button>
	</div>
</template>

<script>
// import moment from "moment"
import { mapState } from "vuex"
import { getCookie } from "@/utils/authHelpers"
import { API_HOST } from "@/consts.js"
import axios from "axios"

export default {
	name: "NewReport",

	computed: {
		...mapState(["displayNewReport", "newReportData", "toplistId"])
	},

	methods: {
		async crateReport () {
			await axios({
				method: "get",
				url: `${API_HOST}/v1/profi/${this.toplistId}/report/month`,
				headers: {
					Authorization: getCookie("authToken")
				}
			}).then((response) => {
				console.log(response.data)
				this.$store.commit("setDisplayNewReport", false)
				this.$buefy.notification.open({
					duration: 5000,
					message: "Požadavek úspěšně vytvořen",
					position: "is-bottom-right",
					type: "is-success",
					hasIcon: true
				})
			}).catch(error => {
				this.$buefy.notification.open({
					duration: 5000,
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

<style lang="scss" scoped>
.box-login {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 40px;

	p {
		color: #428bca;
		font-weight: 300;
		font-size: 20px;
	}
}
</style>
