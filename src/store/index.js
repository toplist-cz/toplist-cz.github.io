import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		toplistId: null,
		availableReports: [],
		statisticsData: null,
		isSettingsBoxVisible: false,
		displayNewReport: false,
		newReportData: null,
		dateFrom: "",
		stats: null,
		jwt: "",
		isReportWOP: false
	},

	// getters: {
	//	toplistId: (state) => state.toplistId
	// 	setAvailableReports: (state) => state.availableReports
	// },

	mutations: {
		setIsLoggedIn: (state, statisticsData) => {
			state.isLoggedIn = statisticsData
		},

		setToplistId: (state, toplistId) => {
			state.toplistId = toplistId
		},

		setJWT: (state, jwt) => {
			state.jwt = jwt
		},

		setStats: (state, stats) => {
			state.stats = stats
		},

		setAvailableReports: (state, reports) => {
			state.availableReports = reports
		},

		setStatisticsData: (state, statistics) => {
			const statisticsData = []
			const pieChartIsDefault = [4, 6, 7, 23]
			const bothCharts = [4, 6, 7, 23, 25]
			const showTrend = [1, 5, 17, 27]
			statistics.stats.forEach(statistic => {
				statisticsData.push({
					...statistic,
					renderer: state.stats[statistic.statId].renderer,
					keyword: state.stats[statistic.statId].keyword,
					titleShort: state.stats[statistic.statId].short,
					bothCharts: bothCharts.includes(statistic.statId),
					defaultChart: pieChartIsDefault.includes(statistic.statId) ? "pie" : "line",
					showTrend: showTrend.includes(statistic.statId),
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

		toggleSettingsBoxVisible: (state) => {
			state.isSettingsBoxVisible = !state.isSettingsBoxVisible
		},

		setDisplayNewReport: (state, displayNewReport) => {
			state.displayNewReport = displayNewReport
		},

		setNewReportData: (state, newReportData) => {
			state.newReportData = newReportData
		},

		setReportWOP: (state, reportWOP) => {
			state.isReportWOP = reportWOP
		}

	}
})
