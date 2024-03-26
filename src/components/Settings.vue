<!--模板代码示例-->
<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="handleClick"
  ></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="setting" circle></el-button>
  <img
    src="../../public/logo.png"
    alt="logo"
    style="width: 30px; height: 30px; margin-left: 20px"
  />
  <el-dropdown style="margin-left: 10px; margin-right: 20px">
    <el-button> Admin </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="Settings">
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
let layoutSettingStore = useLayoutSettingStore();
let handleClick = () => {
  console.log("refresh");
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
</script>
<style lang="less" scoped></style>
