<!--模板代码示例-->
<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <NavBreadcrumb />
    </div>
    <div class="tabbar-right">
      <Settings />
    </div>
  </div>
</template>
<script setup lang="ts" name="Tabbar"></script>
<style lang="less" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  border-bottom: 1px solid #fff;
  background-color: #fff;
  .tabbar-left {
    width: 50%;
    display: flex;
    margin-left: 20px;
    align-items: center;
    height: 100%;
  }
  .tabbar-right {
    width: 50%;
    display: flex;

    justify-content: flex-end;
    align-items: center;
    height: 100%;
    line-height: 100%;
  }
}
</style>
