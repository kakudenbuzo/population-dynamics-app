<template>
  <main class="max-w-5xl mx-auto pt-12 px-6 pb-8">
    <h1 class="text-2xl mb-6">人口構成グラフ</h1>
    <div class="flex gap-1 mb-4">
      <DropDownList
        :options="prefectureItems"
        :selected-value="selectedPrefecture"
        @change="handlePrefectureChange"
      />
      <DropDownList
        :options="populationTypes"
        :selected-value="selectedPopulationType"
      />
    </div>
    <BarChartCard
      :is-loading="isLoadingChartData"
      :chart-data="populationComposition?.chartData"
      :label="populationComposition?.label"
    ></BarChartCard>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import BarChartCard from '~/components/BarChartCard.vue';
import { PopulationCompotision } from '~/models/PopulationComposition';
import DropDownList from '~/components/DropDownList.vue';
import { PopulationType } from '~/models/PopulationType';
import PrefectureRepository from '~/repositories/PrefectureRepository';
import DropDownItem from '~/models/DropDownItem';
import PopulationCompositionRepository from '~/repositories/PopulationCompositionRepository';

@Component({
  components: {
    BarChartCard,
    DropDownList,
  },
})
export default class Index extends Vue {
  prefectureItems: DropDownItem[] = [];
  populationComposition: PopulationCompotision | undefined;

  populationTypes = [
    { value: PopulationType.Total, label: PopulationType.Total },
    { value: PopulationType.Youth, label: PopulationType.Youth },
    { value: PopulationType.WorkingAge, label: PopulationType.WorkingAge },
    { value: PopulationType.Elderly, label: PopulationType.Elderly },
  ];

  // 初期表示は「総人口」
  selectedPopulationType = PopulationType.Total;

  selectedPrefecture!: number;

  isLoadingChartData = true;

  async asyncData() {
    // 初期表示は東京都(13)
    const selectedPrefecture = 13;
    const prefectureRepository = new PrefectureRepository();
    const prefectures = await prefectureRepository.fetchAll();
    const prefectureItems: DropDownItem[] = [];
    for (const prefecture of prefectures) {
      prefectureItems.push(new DropDownItem(prefecture.code, prefecture.name));
    }
    return {
      prefectureItems,
      selectedPrefecture,
    };
  }

  async created() {
    await this.loadPopulationComposition();
  }

  handlePrefectureChange(value: number) {
    this.selectedPrefecture = value;
    this.loadPopulationComposition();
  }

  async loadPopulationComposition() {
    this.isLoadingChartData = true;
    const populationRepository = new PopulationCompositionRepository();
    const populationCompositionList =
      await populationRepository.fetchByPrefCode(this.selectedPrefecture);
    this.populationComposition = populationCompositionList[0];
    this.isLoadingChartData = false;
  }
}
</script>
