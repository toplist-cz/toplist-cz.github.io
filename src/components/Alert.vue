<template>
	<div :class="alertType">
		<i @click="close" class="icofont-close" />
		<h2 v-if="header" class="mb-3">{{ header }}</h2>
		{{ message }}
	</div>
</template>

<script>
export default {
	name: "Alert",

	props: ["visible", "header", "message", "type"],

	computed: {
		alertType () {
			return `alert alert-${this.type}`
		}
	},

	methods: {
		close () {
			this.visible = false
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
