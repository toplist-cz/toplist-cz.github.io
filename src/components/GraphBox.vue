<template>
	<div class="box">
		<h2>{{ name }}</h2>
		<p>Type: {{ type }}</p>
		<p>Has both chart: {{ hasBothCharts }}</p>
		<p>Default chart: {{ defaultChart }}</p>
		<div id="chart-types">
			<div
				id="graph-type"
				v-if="type === 'graph'"
			>
				<div v-if="hasBothCharts" class="switcher">
					<button @click="showLine" :class="{'c-button': true, 'active': defaultChartToShow === 'line'}"><i class="icofont-chart-histogram" /></button>
					<button @click="showPie" :class="{'c-button': true, 'active': defaultChartToShow === 'pie'}"><i class="icofont-pie-chart" /></button>
				</div>
				<LineChart class="mt-5" v-if="defaultChartToShow === 'line'" />
				<PieChart class="mt-0" v-if="defaultChartToShow === 'pie'" />
			</div>
			<div
				v-else
				id="table-type"
			>
				<TableChart />
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart"
import PieChart from "@/components/charts/PieChart"
import TableChart from "@/components/charts/TableChart.vue"

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
		defaultChart: String
	},

	data () {
		return {
			defaultChartToShow: ""
		}
	},

	mounted () {
		this.defaultChartToShow = this.defaultChart
	},

	methods: {
		showLine () {
			this.defaultChartToShow = "line"
		},

		showPie () {
			this.defaultChartToShow = "pie"
		}
	}
}
</script>
