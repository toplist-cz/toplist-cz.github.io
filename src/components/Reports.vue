<template>
	<div v-if="statisticsData">
		<h2 class="title title-space-between">
			<b-button @click="previousReport" icon-left="arrow-left" type="is-warning" />
			{{ statisticsData.dateFrom | moment('MMMM YYYY') | capitalize }}
			<b-button @click="nextReport" icon-left="arrow-right" type="is-warning" />
		</h2>

		<GraphBox
			v-for="statistic of statistics"
			:key="statistic.statId"
			:statId="statistic.statId"
			:name="statistic.title"
			:type="statistic.renderer"
			:has-both-charts="statistic.bothCharts"
			:result="statistic.result"
			:default-chart="statistic.defaultChart"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex"
import STATS from "@/utils/stats"
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
		...mapState(["statisticsData", "availableReports"])
	},

	watch: {
		statisticsData (newValue) {
			this.parseData(this.statisticsData.stats)
		}
	},

	methods: {
		parseData (statistics) {
			const statisticsData = []

			statistics.forEach(statistic => {
				const hasBothCharts = [4, 6, 7, 25]
				const pieChartIsDefault = [4, 6, 7]
				statisticsData.push({
					...statistic,
					renderer: STATS[statistic.statId].renderer,
					keyword: STATS[statistic.statId].keyword,
					bothCharts: hasBothCharts.includes(statistic.statId),
					defaultChart: pieChartIsDefault.includes(statistic.statId) ? "pie" : "line"
				})
			})
			this.statistics = statisticsData
		},

		nextReport () {
			const currentReportIndex = this.availableReports.findIndex((report) => report.dateFrom === this.$route.params.reportDate)
			let newIndex = currentReportIndex - 1

			if (currentReportIndex === 0) {
				newIndex = this.availableReports.length - 1
			}

			this.$router.push({
				name: "Home",
				params: { reportDate: this.availableReports[newIndex].dateFrom },
				query: { jwt: this.$route.query.jwt } })
				.catch(() => {})
		},

		previousReport () {
			const currentReportIndex = this.availableReports.findIndex((report) => report.dateFrom === this.$route.params.reportDate)
			let newIndex = currentReportIndex + 1

			if (currentReportIndex === this.availableReports.length - 1) {
				newIndex = 0
			}

			this.$router.push({
				name: "Home",
				params: { reportDate: this.availableReports[newIndex].dateFrom },
				query: { jwt: this.$route.query.jwt } })
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
