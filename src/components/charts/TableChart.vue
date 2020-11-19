<template>
	<div>
		<b-table
			aria-next-label="Next page"
			aria-previous-label="Previous page"
			aria-page-label="Page"
			aria-current-label="Current page"
			hoverable
			default-sort="value"
			:data="getData"
			:paginated="isPaginated"
			:per-page="perPage"
			:current-page.sync="currentPage"
			:pagination-simple="isPaginationSimple"
			:pagination-position="paginationPosition"
			:default-sort-direction="defaultSortDirection"
			:pagination-rounded="isPaginationRounded"
			:sort-icon="sortIcon"
			:sort-icon-size="sortIconSize"
		>
			<b-table-column
				field="description"
				:label="$t('description')"
				sortable
				v-slot="props"
				cellClass="has-text-left"
			>
				{{ props.row.description }}
			</b-table-column>
			<b-table-column
				field="value"
				:label="$t('value')"
				sortable
				numeric
				v-slot="props"
			>
				<span class="tag is-success">
					<strong>{{ props.row.value }}</strong>
				</span>
			</b-table-column>
		</b-table>
		<p class="mt-4 has-text-centered-mobile">{{ $t('numberOfResults', [getData.length]) }}</p>
	</div>
</template>

<script>
export default {
	name: "TableChart",

	props: {
		data: Array
	},

	computed: {
		getData () {
			return this.data.length ? this.data : []
		}
	},

	data () {
		return {
			isPaginated: true,
			isPaginationSimple: false,
			isPaginationRounded: false,
			paginationPosition: "bottom",
			defaultSortDirection: "desc",
			sortIcon: "arrow-up",
			sortIconSize: "is-small",
			currentPage: 1,
			perPage: 10
		}
	}
}
</script>

<style scoped>
strong {
	font-weight: 700 !important;
	color: #ffffff;
}
</style>
