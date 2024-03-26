<template>
  <div class="logo">
    <img v-if="!setting.isHideLogo" :src="setting.logo" alt="logo" />
    <h2>{{ setting.title }}</h2>
  </div>
</template>

<script setup lang="ts" name="Logo">
import setting from "@/setting";
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-left-logo-height;
  align-items: center;
  img {
    height: $base-left-logo-height;
  }
  h2 {
    height: $base-left-logo-height;
    line-height: $base-left-logo-height;
    color: #fff;
    margin-left: 10px;
    font-size: $base-left-font-size;
  }
}
</style>
