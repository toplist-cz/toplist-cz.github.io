<template>
	<div class="box">
		<h2>Daily Visits</h2>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/charts/LineChart"

export default {
	name: "DailyVisits",

	components: {
		LineChart
	}
}
</script>
