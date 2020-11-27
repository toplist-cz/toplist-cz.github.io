<template>
	<div class="box box-login box-new-report" v-if="isSettingsBoxVisible">
		<b-button class="close-btn" @click="close" icon-left="times" type="is-light" />
		<i @click="close" class="icofont-close" />
		<h2 v-if="header" class="mb-3">{{ header }}</h2>
		<p class="mb-4"><strong>{{ message }}:</strong></p>
		<div class="block">
			<b-checkbox
				@input="changes"
				v-model="checkedStatistics"
				class="mb-3 mr-5"
				v-for="statistic of statisctics"
				:native-value="statistic.keyword"
				:key="statistic.keyword"
			>
				{{ statistic.title | capitalize}}
			</b-checkbox>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"

export default {
	name: "Settings",

	props: ["visible", "header", "message", "type"],

	computed: {
		alertType () {
			return `alert alert-${this.type}`
		},
		...mapState(["isSettingsBoxVisible", "statisticsData"])
	},

	data () {
		return {
			statisctics: null,
			checkedStatistics: []
		}
	},

	watch: {
		statisticsData (newValue) {
			this.statisctics = this.statisticsData
			this.checkedStatistics = []
			this.statisticsData.forEach(item => {
				if (item.visible) {
					this.checkedStatistics.push(item.keyword)
				}
			})
		}
	},

	methods: {
		close () {
			this.$store.commit("setSettingsBoxVisible", false)
		},

		changes () {
			this.$store.commit("setStatisticsVisibility", this.checkedStatistics)
		}
	}
}
</script>

<style lang="scss" scoped>
.alert {
	padding: 20px 10px;
	border-radius: 0.5rem;
	box-shadow: 5px 5px 3px gainsboro;
	margin-bottom: 20px;
	color: #212529;
	text-align: center;
	position: relative;

	h2 {
		text-align: center;
		margin: 8px 8px 12px 8px;
		font-weight: 300;
		font-size: 30px;
	}

	i {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 30px;
		cursor: pointer;
	}
}

.alert-success {
	background: #d5f5d0;
}
</style>
