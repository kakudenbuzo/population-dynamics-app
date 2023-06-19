<template>
  <div class="relative w-48">
    <select
      class="block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
      :value="selectedValue"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 12l-6-6 1.5-1.5L10 9.792l4.5-4.5L16 6l-6 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DropDownItem from '~/models/DropDownItem'

@Component({
  name: 'DropDownList',
})
export default class DropDownList extends Vue {
  @Prop({ required: true })
  options: [DropDownItem] | undefined

  @Prop()
  selectedValue: number | undefined

  onChange(event: Event) {
    // @ts-ignore
    this.$emit('change', event.target!.value)
  }
}
</script>

<style scoped>
select {
  /* デフォルトの矢印アイコンを無効化*/
  appearance: none;
}
</style>
