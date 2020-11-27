import { mapState } from 'vuex';
<template>
	<nav class="c-navbar">
		<div class="logo">
			<img src="@/assets/logo-toplist.png" alt="logo TOPList">
			TOPlist Profi
		</div>
		<div class="menu">
			<b-dropdown v-if="isLoggedIn && availableReports" aria-role="list">
				<button class="button is-info" type="button" slot="trigger">
					<template>
						<b-icon icon="list" />
						<span>{{ $t('reports') }}</span>
					</template>
					<b-icon icon="angle-down" />
				</button>
				<b-dropdown-item
					v-for="report of availableReports"
					:key="report.id"
					aria-role="listitem"
					@click="getReport(report)"
				>
					{{ report.dateFrom | moment('MMMM YYYY') | capitalize }}
				</b-dropdown-item>
			</b-dropdown>
			<b-button @click="$store.commit('setSettingsBoxVisible', true)" icon-left="cog" v-if="isLoggedIn" type="is-success">
				{{ $t('settings') }}
			</b-button>
			<b-button @click="logout" icon-left="sign-out-alt" v-if="isLoggedIn" type="is-warning">
				{{ $t('logout') }}
			</b-button>
			<b-button tag="a" v-if="!isLoggedIn" href="https://profi.toplist.cz/auth/17a84514-308d-11eb-91f4-d381fc10f328" icon-left="sign-in-alt" type="is-warning">
				{{ $t('login') }}
			</b-button>
		</div>
	</nav>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
import { API_HOST } from "@/consts"
import { getCookie } from "@/utils/authHelpers"

export default {
	name: "NavBar",

	data () {
		return {}
	},

	computed: {
		...mapState(["availableReports", "toplistId", "isLoggedIn"])
	},

	methods: {
		async getReport (report) {
			if (this.availableReports.length) {
				this.$router.push({
					name: "Home",
					query: { d: report.dateFrom, jwt: this.$route.query.jwt } })
					.catch(() => {})

				const loadingComponent = this.$buefy.loading.open()
				await axios({
					method: "get",
					url: `${API_HOST}/v1/profi/${this.toplistId}/report/${report.id}`,
					headers: {
						Authorization: getCookie("authToken")
					}
				}).then((response) => {
					this.$store.commit("setStatisticsData", response.data)
				}).catch(error => {
					console.error(error)
				})
				loadingComponent.close()
			}
		},
		logout () {
			document.cookie = "authToken=;samesite=strict;max-age=0"
			this.$router.push({ path: "/" })
			this.$router.go()
		}
	},

	watch: {
		availableReports (reports) {
			this.getReport(reports[0])
		},
		$route: function () {
			if (this.availableReports.length) {
				const report = this.availableReports.find(item => item.dateFrom === this.$route.query.d)
				if (report) {
					this.getReport(report)
				}
			}
		}
	}
}
</script>
