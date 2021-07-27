<script>
import { generateChart } from "vue-chartjs"
import Chart from "chart.js"
import chartTrendline from "chartjs-plugin-trendline"

const CustomLine = generateChart("custom-line", "LineWithLine")

Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
	draw: function (ease) {
		Chart.controllers.line.prototype.draw.call(this, ease)

		if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
			const activePoint = this.chart.tooltip._active[0]
			const ctx = this.chart.ctx
			const x = activePoint.tooltipPosition().x
			const topY = this.chart.scales["y-axis-0"].top
			const bottomY = this.chart.scales["y-axis-0"].bottom

			ctx.save()
			ctx.beginPath()
			ctx.moveTo(x, topY)
			ctx.lineTo(x, bottomY)
			ctx.lineWidth = 2
			ctx.strokeStyle = "#428bca"
			ctx.stroke()
			ctx.restore()
		}
	}
})

export default {
	name: "LineChart",

	extends: CustomLine,

	props: {
		data: Object
	},
	components: {
		chartTrendline
	},

	computed: {
		getLineChartOptions () {
			return {
				legend: {
					display: !((this.data.datasets.length < 2))
				},
				plugins: {
					datalabels: {
						display: false
					}
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
							// drawOnChartArea: false
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
					mode: "index",
					intersect: false,
					axis: "x"
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
