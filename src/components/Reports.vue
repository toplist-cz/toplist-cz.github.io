<template>
	<div v-if="statisticsData">
		<h2 class="title title-space-between">
			<b-button @click="previousReport" icon-left="arrow-left" type="is-warning" />
			{{ dateFrom | moment('MMMM YYYY') | capitalize }}
			<b-button @click="nextReport" icon-left="arrow-right" type="is-warning" />
		</h2>

		<GraphBox
			v-for="statistic of statistics"
			:visible="statistic.visible"
			:key="statistic.statId"
			:statId="statistic.statId"
			:name="statistic.title"
			:keyword="statistic.keyword"
			:type="statistic.renderer"
			:has-both-charts="statistic.bothCharts"
			:result="statistic.result"
			:default-chart="statistic.defaultChart"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex"
import GraphBox from "@/components/GraphBox"

export default {
	name: "Reports",

	components: {
		GraphBox
	},

	data () {
		return {
			statistics: []
		}
	},

	computed: {
		...mapState(["statisticsData", "availableReports", "dateFrom"])
	},

	watch: {
		statisticsData (newValue) {
			this.statistics = this.statisticsData
		}
	},

	methods: {
		nextReport () {
			const currentReportIndex = this.availableReports.findIndex((report) => report.dateFrom === this.$route.query.d)
			let newIndex = currentReportIndex - 1

			if (currentReportIndex === 0) {
				newIndex = this.availableReports.length - 1
			}

			this.$router.push({
				name: "Home",
				query: { d: this.availableReports[newIndex].dateFrom, jwt: this.$route.query.jwt } })
				.catch(() => {})
		},

		previousReport () {
			const currentReportIndex = this.availableReports.findIndex((report) => report.dateFrom === this.$route.query.d)
			let newIndex = currentReportIndex + 1

			if (currentReportIndex === this.availableReports.length - 1) {
				newIndex = 0
			}

			this.$router.push({
				name: "Home",
				query: { d: this.availableReports[newIndex].dateFrom, jwt: this.$route.query.jwt } })
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
.title-space-between{
	display: flex;
	justify-content: space-between;
}
</style>
