<template>
	<div class="box box-login" v-if="!display">
		<h2 class="mb-3">Přihlášení</h2>
		<p class="mb-3">Pro zobrazení Vašich reportů je potřeba se přihlásit.</p>
		<a class="c-button button-yellow" href="https://profi.toplist.cz/auth/cf5ac64a-ec50-11ea-9d60-a3da01a0b5f8">
			<i class="icofont-login" />
			Přihlásit se
		</a>
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
