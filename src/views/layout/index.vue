<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          class="menu"
          :collapse="layoutSettingStore.fold ? true : false"
          background-color="#001529"
          text-color="#fff"
          :default-active="$route.path"
        >
          <NavMenu :menuList="userStore.routes"></NavMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_topbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main wrapper"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <MainContianer></MainContianer>
    </div>
  </div>
</template>

<script lang="ts" setup>
//获取用户数据的仓库
import MainContianer from "@/components/MainContianer.vue";
import { useUserStore } from "@/store/useUserStore";
import { useRoute } from "vue-router";
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";

let layoutSettingStore = useLayoutSettingStore();

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
  background-color: #fff;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg-color;
    transition: all 0.3s ease;
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
    &.fold {
      width: $base-menu-fold-width;
    }
  }
  .layout_topbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-menu-topbar-height;
    background-color: white;
    position: absolute;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s ease;
    &.fold {
      width: calc(100% - #{$base-menu-fold-width});
      left: $base-menu-fold-width;
    }
  }
  .layout_main {
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-menu-topbar-height} - 15px);
    background-color: yellow;
    position: absolute;
    top: $base-menu-topbar-height;
    left: $base-menu-width;
    overflow: auto;
    left: $base-menu-width;
    transition: all 0.3s ease;
    &.fold {
      width: calc(100% - #{$base-menu-fold-width});
      left: $base-menu-fold-width;
    }
  }
}
</style>
