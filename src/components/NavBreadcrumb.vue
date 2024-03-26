<!--模板代码示例-->
<template>
  <el-icon @click="changeMenu">
    <component :is="useLayoutParams.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts" name="NavBreadcrumb">
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
let useLayoutParams = useLayoutSettingStore();

// import { useRoute } from "vue-router";

// let $route = useRoute;
let changeMenu = () => {
  useLayoutParams.fold = !useLayoutParams.fold;
};
</script>
<style lang="less" scoped></style>
