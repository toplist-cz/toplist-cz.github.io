<template>
	<div v-if="statisticsData">
		<h2 class="title">
			{{ statisticsData.dateFrom | moment('MMMM YYYY') | capitalize }}
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
			console.log(statisticsData)
		}
	}
}
</script>
