import { mapState } from 'vuex';
<template>
	<b-sidebar
		class="custom-sidebar"
		mobile="hidden"
		reduce
		expand-on-hover
		type="is-light"
		open
	>
		<div class="p-1">
			<b-menu class="is-custom-mobile">
				<b-menu-list>
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
					<b-menu-item icon="chart-line" label="Logout" />
				</b-menu-list>
			</b-menu>
		</div>
	</b-sidebar>
</template>

<script>
import { mapState } from "vuex"

export default {
	name: "SideBar",

	data () {
		return {}
	},

	computed: {
		...mapState(["availableReports", "toplistId", "isLoggedIn"])
	}
}
</script>
