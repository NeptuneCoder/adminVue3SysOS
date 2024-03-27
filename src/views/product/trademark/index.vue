<!--数据大屏-->
<template>
  <el-card class="box-card">
    <el-button type="primary" @click="addTrademark"
      ><el-icon class="icon-btn" name="el-icon-plus">
        <Plus></Plus> </el-icon
      >添加品牌</el-button
    >
    <el-table style="width: 100%" border>
      <el-table-column label="序号" width="180" />
      <el-table-column label="品牌名字" width="180" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,10]"
      :small="small"
      :background="background"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="totalSize"
    />
  </el-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
const addTrademark = () => {
  console.log("添加品牌");
};


let pageNo = ref(1);
let pageSize = ref(10);
let totalSize = ref(100);
</script>
<style lang="less" scoped></style>
