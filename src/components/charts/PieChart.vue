<script>
import { Doughnut } from "vue-chartjs"
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes"
import { SetOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer"
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels"

export default {
	name: "PieChart",

	extends: Doughnut,

	props: {
		data: Object
	},

	components: {
		ChartJsPluginDataLabels
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
					},
					datalabels: {
						formatter: (value, ctx) => {
							let sum = 0
							const dataArr = ctx.chart.data.datasets[0].data
							dataArr.map(data => {
								sum += data
							})
							return ((value * 100 / sum) > 10) ? (value * 100 / sum).toFixed(2) + "%" : ""
						},
						color: "#fff"
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
