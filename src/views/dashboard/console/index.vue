<template>
  <Introduce />
  <Sales />
  <el-row :gutter="16" style="margin-top: 14px">
    <el-col :sm="24" :md="12" style="margin-bottom: 14px">
      <TopSearch />
    </el-col>
    <el-col :sm="24" :md="12" style="margin-bottom: 14px">
      <SalesProportion />
    </el-col>
  </el-row>
</template>

<script setup>
import { provide, ref, computed } from "vue";
import Introduce from "./components/introduce.vue";
import Sales from "./components/sales.vue";
import TopSearch from "./components/top-search.vue";
import SalesProportion from "./components/sales-proportion.vue";
import "@/utils/echarts";
import { useDark } from "@vueuse/core";
import { THEME_KEY } from "vue-echarts";

const isDark = useDark();
const echartTheme = computed(() => (isDark.value ? "dark" : ""));
provide(THEME_KEY, echartTheme);

defineOptions({
  name: "Console", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss"></style>
