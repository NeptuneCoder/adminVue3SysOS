<script setup lang="ts">
import { Edit, Search } from "@element-plus/icons-vue";
</script>

<template>
  <h1>我是App</h1>
  <el-button type="primary" size="default" :icon="Edit">我是按钮</el-button>
  <el-button :icon="Search" circle />
</template>

<style scoped></style>
