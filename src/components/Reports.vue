<template>
	<div class="reports-box" v-if="statisticsData">
		<div v-show="statistics.length" class="box fixed-reports-nav" :style="fixedReportsTop">
			<b-button
				v-scroll-to="{el: `.stat${statistic.statId}`, offset: -70,}"
				@click="scrollToStat(statistic.statId)"
				v-for="statistic of statistics"
				:key="statistic.statId"
				type="is-light"
				expanded
				class="mb-1"
			>
				{{ statistic.title }}
			</b-button>
		</div>

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
import scrollPosition from "@/utils/scrollPosition"

export default {
	name: "Reports",

	mixins: [scrollPosition("position")],

	components: {
		GraphBox
	},

	data () {
		return {
			statistics: []
		}
	},

	computed: {
		...mapState(["statisticsData", "availableReports", "dateFrom"]),
		fixedReportsTop () {
			if (this.position[1] >= 480) {
				return "top: 10px;position: fixed;"
			}
			return "top: 69px;"
		}
	},

	watch: {
		statisticsData (newValue) {
			this.statistics = this.statisticsData
		}
	},

	methods: {
		scrollToStat (id) {

			// VueScrollTo.scrollTo(".stat" + id + ", 50px", 200)
			// const cancelScroll = VueScrollTo.scrollTo(".stat" + id + ", 50px", 200)
			// cancelScroll()
		},
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
