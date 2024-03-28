<!--模板代码示例-->
<template>
  <el-card class="categroy">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- change:选中值发生变化时触发 -->
        <el-select
          v-model="categoryStore.c1id"
          style="width: 200px"
          @change="selectC1Item"
          :disabled="scene === 1 ? false : true"
        >
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
        <el-select
          v-model="categoryStore.c2id"
          style="width: 200px"
          @change="selectC2Item"
          :disabled="scene === 1 ? false : true"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c2Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3id"
          style="width: 200px"
          :disabled="scene === 1 ? false : true"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c3Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup name="Category">
import { onMounted } from "vue";
import { useCategoryStore } from "@/store/useCategoryStore";
let categoryStore = useCategoryStore();

function selectC1Item(val: string) {
  console.log("选中一级分类", val);
  categoryStore.getC2(val);
  categoryStore.c2Arr = [];
  categoryStore.c3Arr = [];
  categoryStore.c2id = "";
  categoryStore.c3id = "";
  //根据一级分类id获取二级分类
}

function selectC2Item(val: string) {
  console.log("选中二级分类", val);
  categoryStore.c3Arr = [];
  categoryStore.c3id = "";
  categoryStore.getC3(val);
  //根据二级分类id获取三级分类
}
onMounted(() => {
  categoryStore.getC1();
  console.log("mounted 执行了嘛？");
});
let { scene } = defineProps(["scene"]);
console.log("scene==", scene);
</script>

<style lang="less" scoped></style>
