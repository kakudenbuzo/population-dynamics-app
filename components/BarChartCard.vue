<template>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
  >
    <h2 class="text-xl mb-4">{{ label }}</h2>
    <BarChart :chart-data="chartData"></BarChart>
  </div>
</template>
<script lang="ts">
import { ChartData } from 'chart.js'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BarChart from '~/components/BarChart.vue'
@Component({
  components: { BarChart },
  name: 'BarChartCard',
})
export default class BarChartCard extends Vue {
  @Prop()
  chartData!: ChartData

  @Prop()
  label!: string
}
</script>
