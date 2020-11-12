<template>
	<div class="box box-login" v-if="!display">
		<h2 class="mb-3">Nový report</h2>
		<p class="mb-3">
			Report za měsíc {0} ještě není vytvořen.').format(''|datetime('LLLL'))}}
			<br>
			Čas, kdy jej bude možné vytvořit, je ještě: 20d 2h 7m 12s
		</p>
		<button class="c-button button-blue">
			<i class="icofont-plus" />
			Vytvořit report
		</button>
	</div>
</template>

<script>
export default {
	name: "NewReport",

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
