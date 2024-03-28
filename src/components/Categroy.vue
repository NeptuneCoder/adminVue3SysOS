<!--模板代码示例-->
<template>
  <div>
    <el-card class="content">
      <el-button type="primary"><Plus></Plus>新增属性</el-button>
      <el-table :data="data" style="width: 100%; margin-top: 15px" border>
        <el-table-column
          prop="id"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="属性名称"></el-table-column>
        <el-table-column prop="value" label="属性值"></el-table-column>
        <el-table-column label="属性操作" label-width="150px">
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
  </div>
</template>
<script setup lang="ts" name="Categroy">
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="less" scoped></style>
