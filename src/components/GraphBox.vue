<template>
	<div
		:class="graphBoxClass"
		:style="isVisible"
		v-view="viewHandler"
	>
		<b-button
			class="close-btn"
			@click="setStatisticVisibility"
			icon-left="times"
			type="is-light"
		/>
		<h2>{{ name }}</h2>
		<div v-if="result.message">
			<h3 class="is-warning">{{ result.message }}</h3>
		</div>
		<div v-else>
			<div v-if="type === 'graph'">
				<div v-if="hasBothCharts" class="switcher mt-5">
					<button
						@click="showLine"
						:class="{'c-button': true, 'active': defaultChartToShow === 'line'}"
					>
						<b-icon
							icon="chart-line"
							size="is-small"
						/>
					</button>
					<button
						@click="showPie"
						:class="{'c-button': true, 'active': defaultChartToShow === 'pie'}"
					>
						<b-icon
							icon="chart-pie"
							size="is-small"
						/>
					</button>
				</div>
				<LineChart
					:data="getLineChartData"
					class="mt-5"
					v-if="defaultChartToShow === 'line'"
				/>
				<PieChart
					:data="getPieChartData"
					class="mt-0 mb-3"
					v-if="defaultChartToShow === 'pie'"
				/>
			</div>
			<div v-else>
				<TableChart :data="getTableData" />
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart"
import PieChart from "@/components/charts/PieChart"
import TableChart from "@/components/charts/TableChart.vue"
import moment from "moment"
import Colors from "@/utils/colors"

export default {
	name: "GraphBox",

	components: {
		LineChart,
		PieChart,
		TableChart
	},

	props: {
		name: String,
		type: String,
		result: Object || Array,
		hasBothCharts: Boolean,
		defaultChart: String,
		showTrend: Boolean,
		statId: Number,
		visible: Boolean,
		keyword: String
	},

	data () {
		return {
			defaultChartToShow: "",
			sumValue: 0
		}
	},

	mounted () {
		this.defaultChartToShow = this.defaultChart
		this.pieChartParser()
	},

	computed: {
		getLineChartData () {
			return this.lineChartParser()
		},

		getPieChartData () {
			return this.pieChartParser()
		},

		getTableData () {
			return this.tableDataParser()
		},

		isVisible () {
			return this.visible ? "" : "display: none"
		},

		graphBoxClass () {
			return `box stat${this.statId}`
		}
	},

	methods: {
		viewHandler (e) {
			if (e.percentInView === 1) {
				this.$emit("visibleStatistic", this.statId)
			}
		},

		setStatisticVisibility () {
			this.$store.commit("setStatisticHidden", this.keyword)
		},

		showLine () {
			this.defaultChartToShow = "line"
		},

		showPie () {
			this.defaultChartToShow = "pie"
		},

		lineChartParser () {
			const chartParams = {
				data: {
					labels: [],
					datasets: []
				}
			}

			if (this.result.x) {
				chartParams.data.labels = this.result.x
			} else {
				for (let i = 0; i < this.result.timeline.length; i++) {
					chartParams.data.labels.push(moment(this.result.timeline[i]).format("D.M."))
				}
			};

			let maxValue = 0
			let sumValue
			let colorIndex = 0

			for (let i = 0; i < Math.min(this.result.dataSeries.length, 10); i++) {
				const dataKeyword = this.result.dataSeries[i].keyword
				maxValue = Math.max.apply(null, this.result.data[dataKeyword])
				sumValue = this.result.data[dataKeyword].reduce(function (a, b) { return a + b }, 0)
				const data = []
				const backgroundColor = []
				let dataId
				for (dataId = 0; dataId < this.result.data[dataKeyword].length; dataId++) {
					let color = "#229bdb"
					if (maxValue === this.result.data[dataKeyword][dataId]) {
						color = "#4caf50"
					} else if (this.result.timeline && (moment(this.result.timeline[dataId]).day() === 0 || moment(this.result.timeline[dataId]).day() === 6)) {
						color = "#006bab"
					}
					data.push(this.result.data[dataKeyword][dataId])
					if (this.result.dataSeries.length < 2) {
						backgroundColor.push(color)
					};
				}

				if (i === 8) {
					colorIndex = 0
				} else {
					colorIndex += 1
				}

				const dataset = {
					label: this.result.dataSeries[i].title || dataKeyword,
					data: data,
					fill: false,
					borderColor: Colors[colorIndex],
					backgroundColor: Colors[colorIndex],
					pointRadius: 4,
					pointHoverRadius: 6
				}
				if (this.result.dataSeries.length < 2) {
					dataset.backgroundColor = backgroundColor
				}
				if (this.showTrend) {
					dataset.trendlineLinear = {
						style: Colors[colorIndex],
						lineStyle: "dotted",
						width: 1
					}
				}

				chartParams.data.datasets.push(dataset)
			};

			this.sumValue = sumValue

			return chartParams.data
		},

		pieChartParser () {
			if (this.type === "graph" && this.result.dataSeries) { // hack because this is ran even when data.message is defined !?
				const chartParams = {
					data: {
						labels: [],
						datasets: []
					}
				}

				const dataset = {
					data: []
				}
				let otherSum = 0
				let sumValue

				for (let i = 0; i < this.result.dataSeries.length; i++) {
					const dataKeyword = this.result.dataSeries[i].keyword
					if (i < 10) {
						chartParams.data.labels.push(this.result.dataSeries[i].title || dataKeyword)
						sumValue = Math.floor(this.result.data[dataKeyword].reduce(function (a, b) { return a + b }, 0))
						dataset.data.push(sumValue)
					} else {
						otherSum += Math.floor(this.result.data[dataKeyword].reduce(function (a, b) { return a + b }, 0))
					}
				};

				if (otherSum > 0) {
					chartParams.data.labels.push("-")
					dataset.data.push(otherSum)
				}

				chartParams.data.datasets.push(dataset)

				this.sumValue = sumValue

				return chartParams.data
			}
		},

		tableDataParser () {
			this.sumValue = this.result.data.length
			return this.result.data
		}
	}
}
</script>

<style scoped>
.fa-chart-line{
	font-size: 22px !important;
}
.fa-chart-pie{
	font-size: 17px !important;
}
</style>
