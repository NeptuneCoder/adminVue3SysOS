<template>
  <span>{{menuList}}</span>
  <el-menu
    class="menu"
    :collapse="false"
    background-color="#001529"
    text-color="#fff"
  >
    

    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path">
          <template #title>
            <!-- <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon> -->
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- <template v-if="item.children && item.children.length === 1">
        <el-menu-item index="{{ index }}" v-if="!item.meta.hidden">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template> -->
      <!-- <el-sub-menu
        index="{{ index }}"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu> -->
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
