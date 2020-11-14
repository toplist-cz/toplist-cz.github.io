<template>
	<div>
		<p>{{ statisticsData }}</p>
		<NumberOfVisits />
		<DailyVisits />
		<UniqueIPs />
		<Views />
		<OperationSystems />
		<DisplayResolution />
		<ColorDepth />
		<DeviceType />
		<Domains />
		<SearchEngines />
	</div>
</template>

<script lang="ts">
import NumberOfVisits from "./reports/NumberOfVisits.vue"
import DailyVisits from "./reports/DailyVisits.vue"
import UniqueIPs from "./reports/UniqueIPs.vue"
import Views from "./reports/Views.vue"
import OperationSystems from "./reports/OperationSystems.vue"
import DisplayResolution from "./reports/DisplayResolution.vue"
import ColorDepth from "./reports/ColorDepth.vue"
import DeviceType from "./reports/DeviceType.vue"
import Domains from "./reports/Domains.vue"
import SearchEngines from "./reports/SearchEngines.vue"
import { mapState } from "vuex"

export default {
	name: "Reports",

	components: {
		NumberOfVisits,
		DailyVisits,
		UniqueIPs,
		Views,
		OperationSystems,
		DisplayResolution,
		ColorDepth,
		DeviceType,
		Domains,
		SearchEngines
	},

	computed: {
		...mapState(["statisticsData"])
	},

	watch: {
		statisticsData (newValue) {
			// console.log(newValue)
			if (newValue) {
				// Download sth
			}
		}
	}
}
</script>
