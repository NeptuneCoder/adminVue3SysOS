<template>
  <el-card>
    <div>
      <h1>我是home界面</h1>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="home"></script>

<style lang="scss" scoped>
h1 {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  margin-top: 20px;
  padding: 20px;
  background-color: pink;

  h1 {
    color: white;
  }
}
</style>
