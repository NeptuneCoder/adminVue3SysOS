<!--模板代码示例-->
<template>
  <el-icon @click="changeMenu">
    <component :is="useLayoutParams.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      @click="$router.push(item.path)"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts" name="NavBreadcrumb">
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
let useLayoutParams = useLayoutSettingStore();
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

let $route = useRoute();
let $router = useRouter();
let changeMenu = () => {
  useLayoutParams.fold = !useLayoutParams.fold;
};
</script>
<style lang="less" scoped></style>
