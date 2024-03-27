<!--数据大屏-->
<template>
  <el-card class="categroy">
    <span style="font-size: 20px;margin-left: 30px;">一级分类</span>
    <el-tree-select
      v-model="value"
      :data="data"
      check-strictly
      :render-after-expand="false"
      style="width: 240px"
    />

    <span style="font-size: 20px; margin-left: 30px;">二级分类</span>
    <el-tree-select
      v-model="value"
      :data="data"
      check-strictly
      :render-after-expand="false"
      show-checkbox
      style="width: 240px"
    />

    <span style="font-size: 20px;margin-left: 30px;">三级分类</span>
    <el-tree-select
      v-model="value"
      :data="data"
      check-strictly
      :render-after-expand="false"
      show-checkbox
      check-on-click-node
      style="width: 240px"
    />
  </el-card>

  <el-card class="content">
    <el-button type="primary" @click="handleAdd">新增属性</el-button>
    <el-table :data="tableData" style="width: 100%; margin-top: 15px" border>
      <el-table-column
        prop="id"
        label="序号"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="属性名称"></el-table-column>
      <el-table-column prop="value" label="属性值"></el-table-column>
      <el-table-column label="属性操作">
        <template #="{ row, $index }">
          <el-button type="primary">编辑</el-button>
          <el-popconfirm
            title="确认删除吗？"
            cancel-button-text="取消"
            confirm-button-text="确定"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
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
