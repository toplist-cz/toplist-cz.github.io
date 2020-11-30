import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		API_URL: "https://profi.toplist.cz",
		isLoggedIn: false,
		toplistId: null,
		availableReports: null,
		statisticsData: null,
		isSettingsBoxVisible: false,
		displayNewReport: false,
		newReportData: null,
		dateFrom: "",
		stats: null
	},
	getters: {
		toplistId: (state) => state.toplistId,
		setAvailableReports: (state) => state.availableReports
	},
	mutations: {
		setIsLoggedIn: (state, statisticsData) => {
			state.isLoggedIn = statisticsData
		},
		setToplistId: (state, toplistId) => {
			state.toplistId = toplistId
		},
		setStats: (state, stats) => {
			state.stats = stats
		},
		setAvailableReports: (state, reports) => {
			state.availableReports = reports
		},
		setStatisticsData: (state, statistics) => {
			const statisticsData = []
			statistics.stats.forEach(statistic => {
				const hasBothCharts = [4, 6, 7, 25]
				const pieChartIsDefault = [4, 6, 7]
				statisticsData.push({
					...statistic,
					renderer: state.stats[statistic.statId].renderer,
					keyword: state.stats[statistic.statId].keyword,
					bothCharts: hasBothCharts.includes(statistic.statId),
					defaultChart: pieChartIsDefault.includes(statistic.statId) ? "pie" : "line",
					visible: true
				})
			})

			state.dateFrom = statistics.dateFrom
			state.statisticsData = statisticsData
		},
		setStatisticsVisibility: (state, visibleStatistics) => {
			const statisticsDataCopy = [...state.statisticsData]
			statisticsDataCopy.forEach((stat, i) => {
				if (visibleStatistics.includes(stat.keyword)) {
					stat.visible = true
					statisticsDataCopy[i] = stat
				} else {
					stat.visible = false
					statisticsDataCopy[i] = stat
				}
			})

			state.statisticsData = statisticsDataCopy
		},
		setStatisticHidden: (state, keyword) => {
			const statisticsDataCopy = [...state.statisticsData]
			statisticsDataCopy.forEach((stat, i) => {
				if (keyword === stat.keyword) {
					stat.visible = false
				}
			})
			state.statisticsData = statisticsDataCopy
		},
		setSettingsBoxVisible: (state, settingsBoxVisible) => {
			state.isSettingsBoxVisible = settingsBoxVisible
		},
		setDisplayNewReport: (state, displayNewReport) => {
			state.displayNewReport = displayNewReport
		},
		setNewReportData: (state, newReportData) => {
			state.newReportData = newReportData
		}
	}
})
