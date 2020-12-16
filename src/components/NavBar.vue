<template>
	<div>
		<nav class="c-navbar">
			<div class="logo">
				<img src="@/assets/logo-toplist.png" alt="logo TOPList">
				TOPlist Profi
			</div>
			<div class="menu">
				<b-button
					class="is-hidden-mobile"
					@click="$store.commit('setSettingsBoxVisible', true)"
					icon-left="cog" v-if="isLoggedIn" type="is-success"
				>
					{{ $t('settings') }}
				</b-button>
				<b-button
					class="is-hidden-mobile"
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
					:href="getLoginUrl"
					icon-left="sign-in-alt" type="is-warning"
				>
					{{ $t('login') }}
				</b-button>
				<b-dropdown v-if="isLoggedIn" class="is-hidden-tablet">
					<button class="button is-success" type="button" slot="trigger">
						<template>
							<b-icon icon="list" />
						</template>
					</button>
					<b-dropdown-item @click="$store.commit('setSettingsBoxVisible', true)">
						<div class="media">
							<b-icon class="media-left" icon="cog" />
							<span>{{ $t('settings') }}</span>
						</div>
					</b-dropdown-item>
					<b-dropdown-item @click="logout">
						<div class="media">
							<b-icon class="media-left" icon="sign-out-alt" />
							<span>{{ $t('logout') }}</span>
						</div>
					</b-dropdown-item>
				</b-dropdown>
			</div>
		</nav>
	</div>
</template>

<script>
import { mapState } from "vuex"
import scrollPosition from "@/utils/scrollPosition"
import { LOGIN_URL } from "@/consts"

export default {
	name: "NavBar",

	mixins: [scrollPosition("position")],

	data () {
		return {
			fixedReports: false
		}
	},

	computed: {
		...mapState(["availableReports", "toplistId", "isLoggedIn"]),

		getLoginUrl () {
			return LOGIN_URL
		}
	},

	methods: {
		logout () {
			sessionStorage.removeItem("authToken")
			// document.cookie = "authToken=;samesite=strict;max-age=0"
			this.$router.push({ path: "/" })
			this.$router.go()
		}
	}
}
</script>
