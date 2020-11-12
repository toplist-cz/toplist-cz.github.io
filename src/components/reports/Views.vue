
<template>
	<div class="box">
		<h2>Views</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue"

export default {
	name: "Views",

	components: {
		LineChart
	}
}
</script>
