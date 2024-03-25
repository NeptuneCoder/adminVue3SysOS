<script setup lang="ts">
// import netInstance from "@/utils/request";
// import axios from "axios";
// import { onMounted } from "vue";

// onMounted(() => {
//   netInstance.post("/user/login", {
//     username: "admin",
//     password: "111111",
//   });
// });
// function rquestNet() {
//   netInstance({
//     url: "/user/login",
//     method: "post",
//     data: {
//       username: "admin",
//       password: "111111",
//     },
//   });
// }

// function requestByAxios() {
//   axios({
//     url: "/api/user/login",
//     method: "post",
//     data: {
//       username: "admin",
//       password: "111111",
//     },
//   });
// }
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: $color-primary;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: #0d0c0c;
}
</style>
