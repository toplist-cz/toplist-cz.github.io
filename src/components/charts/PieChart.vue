<script>
import { Doughnut } from "vue-chartjs"
import Colors from "@/utils/colors"

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
