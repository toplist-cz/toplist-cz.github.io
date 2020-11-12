<template>
	<div class="box">
		<h2>Color Depth</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart"

export default {
	name: "ColorDepth",

	components: {
		LineChart
	}
}
</script>
