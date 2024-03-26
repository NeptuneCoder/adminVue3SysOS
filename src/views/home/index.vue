<template>
  <div>
    <h1>我是home界面</h1>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted } from "vue";
import { useUserStore } from "@/store/useUserStore";
let userStore = useUserStore();
// 页面mounted时执行的函数
onMounted(() => {
  console.log("home页面mounted");
  userStore.getUserInfo();
});
</script>
<style lang="scss" scoped>
h1 {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
