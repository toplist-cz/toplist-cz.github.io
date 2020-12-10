<template>
	<div class="reports-box" v-if="statisticsData && isLoggedIn">
		<div v-show="statistics.length" class="box fixed-reports-nav" :style="fixedReportsTop">
			<b-button
				v-scroll-to="{el: `.stat${statistic.statId}`, offset: -70,}"
				v-for="statistic of statistics"
				:key="statistic.statId"
				:type="getReportButtonType(statistic.statId)"
				expanded
				class="mb-1"
			>
				{{ statistic.title }}
			</b-button>
		</div>

		<h2 class="title title-space-between fixed-title" :style="fixedTitleTop">
			<b-button size="is-medium" @click="previousReport" icon-left="arrow-left" type="is-warning" />
			<!--{{ dateFrom | moment('MMMM YYYY') | capitalize }}-->
			<b-select
				icon="list"
				:placeholder="dateFrom | moment('MMMM YYYY') | capitalize"
				size="is-medium"
				expanded
				v-model="selectedReport"
				@input="getReport"
			>
				<option
					v-for="report of availableReports"
					:key="report.id"
					:value="report"
				>
					{{ report.dateFrom | moment('MMMM YYYY') | capitalize }}
				</option>
			</b-select>
			<b-button size="is-medium" @click="nextReport" icon-left="arrow-right" type="is-warning" />
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
			@visibleStatistic="changeVisibleStatistic"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex"
import GraphBox from "@/components/GraphBox"
import scrollPosition from "@/utils/scrollPosition"
import axios from "axios"
import { API_HOST } from "@/consts"
import { getCookie } from "@/utils/authHelpers"

export default {
	name: "Reports",

	mixins: [scrollPosition("position")],

	components: {
		GraphBox
	},

	data () {
		return {
			statistics: [],
			reportsBoxTop: null,
			reportsTitleTop: null,
			selectedReport: null,
			activeReportButton: null
		}
	},

	computed: {
		...mapState(["statisticsData", "availableReports", "dateFrom", "toplistId", "isLoggedIn"]),
		fixedReportsTop () {
			if (this.reportsBoxTop && this.position[1] >= (this.reportsBoxTop + 120)) {
				return "top: 10px;position: fixed;"
			}

			return "top: 80px;"
		},
		fixedTitleTop () {
			if (this.reportsTitleTop && this.position[1] >= this.reportsBoxTop + 43) {
				return "top: 10px;position: fixed;"
			}

			return "top: 1px;"
		}
	},

	updated () {
		this.reportsBoxTop = document.querySelector(".reports-box").offsetTop
		this.reportsTitleTop = document.querySelector(".fixed-title").offsetTop
	},

	watch: {
		statisticsData (newValue) {
			this.statistics = newValue
		},
		availableReports (reports) {
			let reportToDisplay = reports[0]
			if (sessionStorage.getItem("toplistReportDateFrom")) {
				const reportFromStorage = reports.find(
					report => report.dateFrom === sessionStorage.getItem("toplistReportDateFrom")
				)

				if (reportFromStorage) {
					reportToDisplay = reportFromStorage
				}
			}

			this.getReport(reportToDisplay)
		},
		$route: function () {
			if (this.availableReports.length) {
				const report = this.availableReports.find(item => item.dateFrom === this.$route.query.d)
				if (report) {
					this.getReport(report)
				}
			}
		}
	},

	methods: {
		getReportButtonType (e) {
			if (this.activeReportButton === e) {
				return "is-light is-info"
			}

			return "is-light"
		},
		async getReport (report) {
			this.fixedReports = false
			this.selectedReport = report
			if (this.availableReports.length) {
				this.$router.push({
					name: "Home",
					query: { d: report.dateFrom, jwt: this.$route.query.jwt } })
					.catch(() => {})

				const loadingComponent = this.$buefy.loading.open()
				await axios({
					method: "get",
					url: `${API_HOST}/v1/profi/${this.toplistId}/report/${report.id}`,
					headers: {
						Authorization: getCookie("authToken")
					}
				}).then((response) => {
					this.$scrollTo("body", { offset: 70 })
					this.$store.commit("setStatisticsData", response.data)
					sessionStorage.setItem("toplistReportDateFrom", response.data.dateFrom)
				}).catch(error => {
					console.error(error)
				})

				loadingComponent.close()
			}
		},
		changeVisibleStatistic (statId) {
			this.activeReportButton = statId
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

select, option{
	text-align: center;
}
</style>
