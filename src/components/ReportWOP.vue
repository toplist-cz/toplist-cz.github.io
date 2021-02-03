<template>
	<div class="box box-login box-new-report" v-if="isReportWOP">
		<h2 class="mb-3">{{ $t('reportWOP') | capitalize }}</h2>
		<p class="mb-4"><strong>{{ $t('reportWOP') }}</strong></p>
	</div>
</template>

<script>
import { mapState } from "vuex"

export default {
	name: "ReportWOP",

	props: ["visible", "header", "message", "type"],

	computed: {
		...mapState(["isReportWOP"]),

		alertType () {
			return `alert alert-${this.type}`
		}
	},

	watch: {
		statisticsData () {
			this.statisctics = this.statisticsData
			this.checkedStatistics = []
			this.statisticsData.forEach(item => {
				if (item.visible) {
					this.checkedStatistics.push(item.keyword)
				}
			})
		}
	},

	methods: {
		close () {
			this.$store.commit("setReportWOPBoxVisible", false)
		}
	}
}
</script>

<style lang="scss" scoped>
.alert {
	padding: 20px 10px;
	border-radius: 0.5rem;
	box-shadow: 5px 5px 3px gainsboro;
	margin-bottom: 20px;
	color: #212529;
	text-align: center;
	position: relative;

	h2 {
		text-align: center;
		margin: 8px 8px 12px 8px;
		font-weight: 300;
		font-size: 30px;
	}

	i {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 30px;
		cursor: pointer;
	}
}

.alert-success {
	background: #d5f5d0;
}
</style>
