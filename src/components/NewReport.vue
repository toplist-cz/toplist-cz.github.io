<template>
	<div class="box box-login box-new-report" v-if="displayNewReport && isLoggedIn">
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
		<b-button
			tag="a"
			:href="getCreateUrl"
			icon-left="plus"
			type="is-info"
		>
			{{ $t('createReport') }}
		</b-button>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { PROFI_URL, APP_ID } from "@/consts.js"
import moment from "moment"

export default {
	name: "NewReport",

	computed: {
		...mapState(["displayNewReport", "newReportData", "toplistId", "isLoggedIn", "jwt"]),

		nameOfLastMonth () {
			return moment().subtract(1, "month").startOf("month").format("MMMM")
		},

		getCreateUrl () {
			return `${PROFI_URL}/report/month/${APP_ID}/${this.toplistId}?jwt=${this.jwt}`
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
