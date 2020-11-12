<template>
	<div class="box box-login" v-if="!display">
		<h2 class="mb-3">Přihlášení</h2>
		<p class="mb-3">Pro zobrazení Vašich reportů je potřeba se přihlásit.</p>
		<button class="c-button button-yellow">
			<i class="icofont-login" />
			Přihlásit se
		</button>
	</div>
</template>

<script>
export default {
	name: "Login",

	props: ["display"]
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
