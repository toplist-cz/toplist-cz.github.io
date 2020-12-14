<template>
	<div>
		<nav class="c-navbar">
			<div class="logo">
				<img src="@/assets/logo-toplist.png" alt="logo TOPList">
				TOPlist Profi
			</div>
			<div class="menu">
				<b-button
					@click="$store.commit('setSettingsBoxVisible', true)"
					icon-left="cog" v-if="isLoggedIn" type="is-success"
				>
					{{ $t('settings') }}
				</b-button>
				<b-button
					@click="logout"
					icon-left="sign-out-alt"
					v-if="isLoggedIn"
					type="is-warning"
				>
					{{ $t('logout') }}
				</b-button>
				<b-button
					tag="a"
					v-if="!isLoggedIn"
					href="https://profi.toplist.cz/auth/17a84514-308d-11eb-91f4-d381fc10f328"
					icon-left="sign-in-alt" type="is-warning"
				>
					{{ $t('login') }}
				</b-button>
			</div>
		</nav>
	</div>
</template>

<script>
import { mapState } from "vuex"
import scrollPosition from "@/utils/scrollPosition"

export default {
	name: "NavBar",

	mixins: [scrollPosition("position")],

	data () {
		return {
			fixedReports: false
		}
	},

	computed: {
		...mapState(["availableReports", "toplistId", "isLoggedIn"])
	},

	methods: {
		logout () {
			document.cookie = "authToken=;samesite=strict;max-age=0"
			this.$router.push({ path: "/" })
			this.$router.go()
		}
	}
}
</script>
