<template>
	<div v-if="statisticsData">
		<h2 class="title">
			{{ statisticsData.dateFrom | moment('MMMM YYYY') | capitalize }}
		</h2>
		<div
			class="graph-panel"
			v-for="statistic of statistics"
			:key="statistic.statId"
		>
			{{ statistic.keyword }}
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import STATS from "@/utils/stats"

export default {
	name: "Reports",

	components: {

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
				statisticsData.push({
					...statistic,
					renderer: STATS[statistic.statId].renderer,
					keyword: STATS[statistic.statId].keyword
				})
			})
			this.statistics = statisticsData
			console.log(statisticsData)
		}
	}
}
</script>
