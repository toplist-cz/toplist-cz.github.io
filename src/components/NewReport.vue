<template>
	<div class="box box-login" v-if="displayNewReport">
		<h2 class="mb-3">Nový report</h2>
		<p class="mb-3">
			Report za předchozí mesíč ještě není vytvořen.
			<br>
			Čas, kdy jej bude možné vytvořit, je ještě {{ newReportData.days }} dní.
		</p>
		<button class="c-button button-blue">
			<i class="icofont-plus" />
			Vytvořit report
		</button>
	</div>
</template>

<script>
// import moment from "moment"
import { mapState } from "vuex"

export default {
	name: "NewReport",

	computed: {
		...mapState(["displayNewReport", "newReportData"])
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
