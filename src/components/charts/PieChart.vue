<script>
import { Doughnut } from "vue-chartjs"
import Colors from "@/utils/colors"

export default {
	name: "PieChart",

	extends: Doughnut,

	data () {
		return {
			data: {
				datasets: [{
					data: [300, 400, 60, 330, 50, 20]
				}],

				labels: [
					"Mac Os",
					"Windows",
					"Windows phone",
					"Android",
					"Linux",
					"Ubuntu"
				]
			},

			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: true
				},
				elements: {
					arc: {
						backgroundColor: Colors
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
