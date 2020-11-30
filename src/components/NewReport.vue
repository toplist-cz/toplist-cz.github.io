<template>
	<div class="box box-login box-new-report" v-if="displayNewReport">
		<h2 class="mb-3">{{ $t('newReport') }}</h2>
		<p class="mb-5 has-text-centered">
			{{ $t('newReport1') }} <strong>{{ nameOfLastMonth }}</strong> {{ $t('newReport2') }}
			<br>
			{{ $t('newReport3') }} <br>
			<countdown :time="newReportData.time">
				<template slot-scope="props">
					<strong>
						{{ props.days }} {{ getDayWord(props.days) }},
						{{ props.hours }} {{ getHourWord(props.hours) }},
						{{ props.minutes }} {{ getMinuteWord(props.minutes) }},
						{{ props.seconds }} {{ getSecondWord(props.seconds) }}
					</strong>
				</template>
			</countdown>
		</p>
		<b-button @click="crateReport" icon-left="plus" type="is-info">{{ $t('createReport') }}</b-button>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { getCookie } from "@/utils/authHelpers"
import { API_HOST } from "@/consts.js"
import axios from "axios"
import moment from "moment"

export default {
	name: "NewReport",

	computed: {
		...mapState(["displayNewReport", "newReportData", "toplistId"]),

		nameOfLastMonth () {
			return moment().subtract(1, "month").startOf("month").format("MMMM")
		}
	},

	methods: {
		getDayWord (val) {
			if (val === 1) {
				return this.$t("newReportDay")
			} else if (val > 1 && val < 5) {
				return this.$t("newReportDaysUnder5")
			} else {
				return this.$t("newReportDaysUp4")
			}
		},

		getHourWord (val) {
			if (val === 1) {
				return this.$t("newReportHour")
			} else if (val > 1 && val < 5) {
				return this.$t("newReportHoursUnder5")
			} else {
				return this.$t("newReportHoursUp4")
			}
		},

		getMinuteWord (val) {
			if (val === 1) {
				return this.$t("newReportMinute")
			} else if (val > 1 && val < 5) {
				return this.$t("newReportMinutesUnder5")
			} else {
				return this.$t("newReportMinutesUp4")
			}
		},

		getSecondWord (val) {
			if (val === 1) {
				return this.$t("newReportSecond")
			} else if (val > 1 && val < 5) {
				return this.$t("newReportSecondsUnder5")
			} else {
				return this.$t("newReportSecondsUp4")
			}
		},

		async crateReport () {
			await axios({
				method: "get",
				url: `${API_HOST}/v1/profi/${this.toplistId}/report/month`,
				headers: {
					Authorization: getCookie("authToken")
				}
			}).then((response) => {
				this.$store.commit("setDisplayNewReport", false)
				this.$buefy.notification.open({
					duration: 3000,
					message: this.$t("requestCreated"),
					position: "is-bottom-right",
					type: "is-success",
					hasIcon: true
				})
			}).catch(error => {
				this.$buefy.notification.open({
					duration: 3000,
					message: error.response.data.description,
					position: "is-bottom-right",
					type: "is-danger",
					hasIcon: true
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.box-login {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 40px;

	p {
		color: #428bca;
		font-weight: 300;
		font-size: 20px;

		strong {
			color: #428bca;
		}
	}
}
</style>
