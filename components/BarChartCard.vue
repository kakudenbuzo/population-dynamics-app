<template>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
  >
    <h2 class="text-xl mb-4">{{ title }}</h2>
    <BarChart v-if="!isLoading" :chart-data="chartData"></BarChart>
    <div v-else class="height-bar-chart flex justify-center items-center">
      <ProgressSpinner></ProgressSpinner>
    </div>
  </div>
</template>
<script lang="ts">
import { ChartData } from 'chart.js';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import ProgressSpinner from './ProgressSpinner.vue';
import BarChart from '~/components/BarChart.vue';
@Component({
  components: { BarChart, ProgressSpinner },
  name: 'BarChartCard',
})
export default class BarChartCard extends Vue {
  @Prop()
  chartData: ChartData | undefined;

  @Prop()
  title: string | undefined;

  @Prop({ required: true, default: true })
  isLoading!: boolean;
}
</script>
<style scoped>
.height-bar-chart {
  /* BarChartと同じ高さ */
  height: 400px;
}
</style>
