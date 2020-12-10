<script>
import { Line } from "vue-chartjs"

export default {
	name: "LineChart",

	extends: Line,

	props: {
		data: Object
	},

	computed: {
		getLineChartOptions () {
			return {
				legend: {
					display: !((this.data.datasets.length < 2))
				},
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						gridLines: {
							drawOnChartArea: false
						}
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							drawOnChartArea: false
						}
					}]
				},
				animation: {
					duration: 0
				},
				hover: {
					animationDuration: 0
				},
				responsiveAnimationDuration: 0,
				tooltips: {
					mode: "index"
				}
			}
		}
	},

	mounted () {
		this.renderChart(this.data, this.getLineChartOptions)
	},

	watch: {
		data: function () {
			this.renderChart(this.data, this.getLineChartOptions)
		}
	}
}
</script>
