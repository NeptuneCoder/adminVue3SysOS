<!--模板代码示例-->
<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <el-icon type="menu"> </el-icon>
      <el-breadcrumb separator-icon="arrow-right">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">我是内容</div>
  </div>
</template>
<script setup lang="ts" name="Tabbar"></script>
<style lang="less" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .tabbar-left {
    width: 50%;
    background-color: pink;
    el-breadcrumb {
      margin-left: 10px;
    }
  }
  .tabbar-right {
    width: 50%;
    background-color: pink;
  }
}
</style>
