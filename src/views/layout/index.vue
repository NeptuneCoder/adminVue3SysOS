<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          class="menu"
          :collapse="false"
          background-color="#001529"
          text-color="#fff"
          :default-active="$route.path"
        >
          <NavMenu :menuList="userStore.routes"></NavMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_topbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main wrapper">
      <MainContianer></MainContianer>
    </div>
  </div>
</template>

<script lang="ts" setup>
//获取用户数据的仓库
import MainContianer from "@/components/MainContianer.vue";
import { useUserStore } from "@/store/useUserStore";
import { useRoute } from "vue-router";

const $route = useRoute();
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
    background-color: white;
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
