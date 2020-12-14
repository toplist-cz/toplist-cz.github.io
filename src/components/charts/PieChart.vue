<script>
import { Doughnut } from "vue-chartjs"
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes"
import { SetOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer"

export default {
	name: "PieChart",

	extends: Doughnut,

	props: {
		data: Object
	},

	data () {
		return {
			options: {
				legend: {
					display: true
				},
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: true
				},
				plugins: {
					colorschemes: {
						scheme: SetOne9
					}
				}
			}
		}
	},

	mounted () {
		this.renderChart(this.data, this.options)
	},

	watch: {
		data: function () {
			this.renderChart(this.data, this.options)
		}
	}
}
</script>
