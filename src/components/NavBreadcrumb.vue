<!--模板代码示例-->
<template>
  <el-icon>
    <Expand></Expand>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts" name="Breadcrumb">
import { Expand } from "@element-plus/icons-vue";
// import { useRoute } from "vue-router";

// let $route = useRoute;
</script>
<style lang="less" scoped></style>
