import { mapState } from 'vuex';
<template>
	<div>
		<nav class="c-navbar">
			<div class="logo">
				<img src="@/assets/logo-toplist.png" alt="logo TOPList">
				TOPlist Profi
			</div>
			<div class="menu">
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
		<div class="fixed-reports" :style="fixedReportsTop">
			<b-collapse v-if="isLoggedIn && availableReports" :open.sync="fixedReports" class="card " animation="slide" aria-id="contentIdForA11y3">
				<div
					slot="trigger"
					slot-scope="props"
					class="card-header"
					role="button"
					aria-controls="contentIdForA11y3"
				>
					<p class="card-header-title">
						<b-icon
							class="mr-3"
							icon="list"
							size="is-small"
						/>
						{{ $t('reports') }}
					</p>
					<a class="card-header-icon">
						<b-icon
							:icon="props.open ? 'arrow-down' : 'arrow-down'"
						/>
					</a>
				</div>
				<div class="card-content">
					<div class="content">
						<b-button
							v-scroll-to="'body'"
							v-for="report of availableReports"
							:key="report.id"
							type="is-light"
							expanded
							class="mb-1"
							@click="getReport(report)"
						>
							{{ report.dateFrom | moment('MMMM YYYY') | capitalize }}
						</b-button>
					</div>
				</div>
			</b-collapse>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
import { API_HOST } from "@/consts"
import { getCookie } from "@/utils/authHelpers"
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
		...mapState(["availableReports", "toplistId", "isLoggedIn"]),
		fixedReportsTop () {
			if (this.position[1] >= 40) {
				return "top: 10px;"
			}
			return "top: 80px;"
		}
	},

	methods: {
		async getReport (report) {
			this.fixedReports = false

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
