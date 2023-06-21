<script lang="ts">
// eslint-disable-next-line import/named
import { Bar } from 'vue-chartjs';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { ChartData, ChartOptions } from 'chart.js';
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
  chartData!: ChartData;

  @Prop({
    required: true,
    default: {},
  })
  optionsData!: ChartOptions;

  mounted() {
    this.renderLineChart();
  }

  renderLineChart() {
    // @ts-ignore
    this.renderChart(this.chartData, this.optionsData);
  }
}
</script>
