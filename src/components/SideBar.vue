import { mapState } from 'vuex';
<template>
	<div class="sidebar-page">
		<section class="sidebar-layout">
			<b-sidebar
				position="fixed"
				mobile="reduced"
				expand-on-hover
				reduce
				type="is-light"
				open
			>
				<div class="p-1">
					<div class="block">
						<img
							src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
							alt="Lightweight UI components for Vue.js based on Bulma"
						>
					</div>
					<b-menu class="is-custom-mobile">
						<b-menu-list label="Menu">
							<b-menu-item icon="information-outline" label="Info" />
							<b-menu-item active expanded icon="settings" label="Administrator">
								<b-menu-item icon="account" label="Users" />
								<b-menu-item icon="cellphone-link" label="Devices" />
								<b-menu-item icon="cash-multiple" label="Payments" disabled />
							</b-menu-item>
							<b-menu-item icon="account" label="My Account">
								<b-menu-item icon="account-box" label="Account data" />
								<b-menu-item icon="home-account" label="Addresses" />
							</b-menu-item>
						</b-menu-list>
						<b-menu-list>
							<b-menu-item label="Expo" icon="link" />
						</b-menu-list>
						<b-menu-list label="Actions">
							<b-menu-item icon="logout" label="Logout" />
						</b-menu-list>
					</b-menu>
				</div>
			</b-sidebar>
		</section>
	</div>
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
	},

	methods: {
	},

	watch: {
	}
}
</script>
