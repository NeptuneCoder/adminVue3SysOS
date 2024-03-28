<!--模板代码示例-->
<template>
  <el-card class="categroy">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- change:选中值发生变化时触发 -->
        <el-select v-model="categoryStore.c1v" style="width: 200px;">
          <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2v" style="width: 200px;">
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
          <el-option label="选项3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3v" style="width: 200px;">
          <el-option label="选项1" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup name="Category">
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/store/useCategoryStore";
let categoryStore = useCategoryStore();
let name = ref("你好的");
onMounted(() => {
  categoryStore.getC1();
  console.log("mounted 执行了嘛？");
});
</script>

<style lang="less" scoped></style>
