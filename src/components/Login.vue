<template>
	<div class="box box-login" v-if="!isLoggedIn">
		<h2 class="mb-3">{{ $t('loginTitle') }}</h2>
		<p class="mb-3">{{ $t('showReportsAfterLogin') }}</p>
		<b-button
			tag="a"
			:href="getLoginUrl"
			icon-left="sign-in-alt"
			v-if="!isLoggedIn"
			type="is-warning"
		>
			{{ $t('login') }}
		</b-button>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { PROFI_URL, APP_ID } from "@/consts.js"

export default {
	name: "Login",

	computed: {
		...mapState(["isLoggedIn"]),

		getLoginUrl () {
			return `${PROFI_URL}/auth/${APP_ID}`
		}
	}
}
</script>
