<script lang="ts">
// eslint-disable-next-line import/named
import { Bar } from 'vue-chartjs'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ChartData } from 'chart.js'
@Component({
  components: {},
  extends: Bar,
  name: 'BarChart',
})
export default class BarChart extends Vue {
  @Prop({
    required: true,
    default: {},
  })
  chartData!: ChartData

  mounted() {
    this.renderLineChart()
  }

  renderLineChart() {
    // @ts-ignore
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1000,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    })
  }
}
</script>
