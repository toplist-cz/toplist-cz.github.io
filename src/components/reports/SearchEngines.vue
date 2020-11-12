<template>
	<div class="box">
		<h2>SearchEngines</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue"

export default {
	name: "SearchEngines",

	components: {
		LineChart
	}
}
</script>
