<script>
import { Line } from "vue-chartjs"
// import Colors from "@/utils/colors"

export default {
	name: "LineChart",

	extends: Line,

	data () {
		return {
			data: {
				labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
				datasets: [
					{
						label: "Mac OS",
						data: [100, 120, 130, 80, 110, 120, 110, 115, 160, 162, 170, 100, 130, 170, 220, 550, 570, 546, 500, 500, 490, 310, 300, 280, 270, 300, 310, 305, 330, 340],
						fill: false,
						borderColor: "#2196f3"
					}
				]
			},

			options: {
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
				plugins: {
					colorschemes: {
						scheme: "brewer.SetOne9"
					}
				},
				tooltips: {
					mode: "index"
				}
			}
		}
	},

	mounted () {
		this.renderChart(this.data, this.options)
	}
}
</script>
