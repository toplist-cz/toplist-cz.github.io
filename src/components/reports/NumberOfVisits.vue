import PieChart from '@/components/charts/PieChart.vue';

<template>
	<div class="box">
		<h2>NumberOfVisits</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart"

export default {
	name: "NumberOfVisits",

	components: {
		LineChart
	}
}
</script>
