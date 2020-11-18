<template>
	<div class="box box-login" v-if="!isLoggedIn">
		<h2 class="mb-3">{{ $t('loginTitle') }}</h2>
		<p class="mb-3">{{ $t('showReportsAfterLogin') }}</p>
		<b-button tag="a" href="https://profi.toplist.cz/auth/cf5ac64a-ec50-11ea-9d60-a3da01a0b5f8" icon-left="sign-in-alt"  v-if="!isLoggedIn" type="is-warning">
			{{ $t('login') }}
		</b-button>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	name: "Login",

	computed: {
		...mapState(["isLoggedIn"])
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
	}
}
</style>
