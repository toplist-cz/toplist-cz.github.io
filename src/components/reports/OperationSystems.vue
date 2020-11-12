
<template>
	<div class="box">
		<h2 class="mb-4">OperationSystems</h2>
		<div class="switcher">
			<button @click="showLine" :class="{'c-button': true, 'active': isLineVisible}"><i class="icofont-chart-histogram" /></button>
			<button @click="showPie" :class="{'c-button': true, 'active': !isLineVisible}"><i class="icofont-pie-chart" /></button>
		</div>
		<LineChart class="mt-5" v-if="isLineVisible" />
		<PieChart class="mt-0" v-if="!isLineVisible" />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue"
import PieChart from "@/components/charts/PieChart.vue"

export default {
	name: "OperationSystems",

	data () {
		return {
			isLineVisible: true
		}
	},

	components: {
		PieChart,
		LineChart
	},

	methods: {
		showLine () {
			this.isLineVisible = true
		},

		showPie () {
			this.isLineVisible = false
		}
	}
}
</script>
