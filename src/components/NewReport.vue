<template>
	<div class="box box-login box-new-report" v-if="displayNewReport">
		<h2 class="mb-3">Nový report</h2>
		<p class="mb-3 has-text-centered">
			Report za mesíč <strong>{{ nameOfLastMonth }}</strong> ještě není vytvořen.
			<br>
			Čas, kdy jej bude možné vytvořit, je ještě <strong>{{ newReportData.days }} dní</strong>.
		</p>
		<b-button @click="crateReport" icon-left="plus" type="is-info">Vytvořit report</b-button>
	</div>
</template>

<script>
// import moment from "moment"
import { mapState } from "vuex"
import { getCookie } from "@/utils/authHelpers"
import { API_HOST } from "@/consts.js"
import axios from "axios"
import moment from "moment"

export default {
	name: "NewReport",

	computed: {
		...mapState(["displayNewReport", "newReportData", "toplistId"]),
		nameOfLastMonth () {
			return moment().subtract(1, "month").startOf("month").format("MMMM")
		}
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
					duration: 3000,
					message: "Požadavek úspěšně vytvořen",
					position: "is-bottom-right",
					type: "is-success",
					hasIcon: true
				})
			}).catch(error => {
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

		strong {
			color: #428bca;
		}
	}
}
</style>
