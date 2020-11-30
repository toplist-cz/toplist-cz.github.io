<script>
import { Doughnut } from "vue-chartjs"
// import Colors from "@/utils/colors"

// import the plugin core
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes"

// import a particular color scheme
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
				/*
				elements: {
					arc: {
						backgroundColor: Colors
					}
				},
				*/
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
	}
}
</script>
