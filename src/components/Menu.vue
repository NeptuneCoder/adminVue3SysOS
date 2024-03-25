<template>
  <el-menu class="menu" :collapse="false" background-color="#001529" text-color="#fff">
    <template v-for="(item, index) in menuList" :key="item.path">
      <el-menu-item v-if="!item.children" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="{{ index }}"
        v-if="item.children && item.children.length === 1"
      >
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu
        index="{{ index }}"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["menuList"]);
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.menu {
  padding: 10px;

  p {
    color: #fff;
  }
}
</style>
