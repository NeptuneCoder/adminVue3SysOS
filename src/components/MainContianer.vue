<!--用于封装主体内容容器支持动画效果-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flage" />
    </transition>
  </router-view>
</template>
<script setup lang="ts" name="MainContianer">
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
import { nextTick, watch, ref } from "vue";

let layoutSettingStore = useLayoutSettingStore();
let flage = ref(true);
watch(
  [() => layoutSettingStore.refresh],
  (val) => {
    flage.value = false;

    //nextTick ： 等待组件渲染完成后再执行
    nextTick(() => {
      flage.value = true;
    });
  },
  {
    deep: true,
  },
);
</script>
<style scoped>
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
