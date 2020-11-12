
<template>
	<div class="box">
		<h2>UniqueIPs</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue"

export default {
	name: "UniqueIPs",

	components: {
		LineChart
	}
}
</script>
