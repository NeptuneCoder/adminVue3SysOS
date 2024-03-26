<!--用于封装主体内容容器支持动画效果-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup lang="ts" name="MainContianer"></script>
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
