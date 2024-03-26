<!--模板代码示例-->
<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="handleClick"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt="logo"
    style="width: 30px; height: 30px; margin-left: 20px; border-radius: 50%"
  />
  <el-dropdown style="margin-left: 10px; margin-right: 20px">
    <el-button> {{ userStore.username }} </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="Settings">
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
import { useUserStore } from "@/store/useUserStore";
let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let handleClick = () => {
  console.log("refresh");
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
let fullScreen = () => {
  console.log("fullScreen");
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};
</script>
<style lang="less" scoped></style>
