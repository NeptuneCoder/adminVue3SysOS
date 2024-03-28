<!--数据大屏-->
<template>
  <el-card class="categroy">
    <el-form label-width="80px" :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="select1">
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
          <el-option label="选项3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="select1">
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
          <el-option label="选项3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="select1">
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
          <el-option label="选项3" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>

  <Categroy :data="tableData" class="content"></Categroy>
</template>
<script setup lang="ts">
import { reactive } from "vue";

let tableData = reactive([
  {
    id: 1,
    name: "颜色",
    value: "红色,蓝色,绿色",
  },
  {
    id: 2,
    name: "尺寸",
    value: "S,M,L",
  },
]);
</script>
<style lang="less" scoped>
.categroy {
  height: 80px;
  display: flex;
}

.content {
  margin-top: 15px;
}
</style>
