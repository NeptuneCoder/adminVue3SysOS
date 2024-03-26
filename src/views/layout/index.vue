<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <NavMenu :menuList="userStore.routes"></NavMenu>
      </el-scrollbar>
    </div>
    <div class="layout_topbar"></div>
    <div class="layout_main wrapper">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
//获取用户数据的仓库
import { useUserStore } from "@/store/useUserStore";
let userStore = useUserStore();
console.log("测试这里获取数据是否被执行？");
console.log(userStore.routes);
</script>

<style scoped lang="scss">
.layout_container {
  height: 100vh;
  position: relative;
  width: 100%;
  background-color: red;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg-color;
    .scrollbar {
      height: calc(100vh - #{$base-menu-topbar-height});
      overflow-y: auto;
      width: 100%;
    }
    .scrollbar-demo-item {
      color: white;
      font-size: 30px;
      height: 40px;
      line-height: 40px;
    }
  }
  .layout_topbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-menu-topbar-height;
    background-color: green;
    position: absolute;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-menu-topbar-height} - 15px);
    background-color: yellow;
    position: absolute;
    top: $base-menu-topbar-height;
    left: $base-menu-width;
    overflow: auto;
  }
}
</style>
