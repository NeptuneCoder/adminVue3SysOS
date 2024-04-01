<!--数据大屏-->
<template>
  <Category class="categroy" :scene="scene"></Category>
  <el-card class="content" v-show="scene == 1">
    <div>
      <el-button
        type="primary"
        wrap-content
        icon="plus"
        @click="showAddSpuView"
        :disabled="!categoryStore.c3id"
      >
        添加SPU</el-button
      >
      <el-table style="width: 100%; margin-top: 15px" border :data="tableData">
        <el-table-column
          prop="id"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="spuName" label="SPU名称"></el-table-column>
        <el-table-column prop="description" label="SPU描述"> </el-table-column>
        <el-table-column label="操作" label-width="150px">
          <template #="{ row, $index }">
            <el-button type="plus" title="增加sku">增加sku</el-button>
            <el-button
              type="primary"
              title="编辑"
              @click="showUpdateSkuView(row)"
              >编辑</el-button
            >
            <el-button type="primary" title="查看sku" icon="View"
              >查看</el-button
            >
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
    </div>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 10]"
      :background="background"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="totalSize"
      @size-change="getSpuList"
      @current-change="getSpuList"
    />
  </el-card>
  <el-card class="content" v-show="scene == 2">
    <AddSpuForm @showSupView="showSupView" ref="addSpuForm"></AddSpuForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/useCategoryStore";
import { SupRecord, SupRecords } from "@/api/spu/types";
import { reqSpuList } from "@/api/spu";
import AddSpuForm from "@/views/product/spu/AddSpuForm.vue";
let addSpuForm = ref();
let scene = ref(1);
let background = true;
let pageNo = ref(1);
let pageSize = ref(10);
let totalSize = ref(0);
//数据
const tableData = ref<SupRecords>([]);

let categoryStore = useCategoryStore();
watch(
  () => categoryStore.c3id,
  (newVal) => {
    if (newVal) {
      getSpuList();
    }
  },
);

const getSpuList = async () => {
  let res = await reqSpuList(pageNo.value, pageSize.value, categoryStore.c3id);
  tableData.value = res.data.records;
  totalSize.value = res.data.total;
};
//显示添加SPU视图
const showAddSpuView = () => {
  scene.value = 2;
};
//显示更新SKU数据的视图，需要携带数据
const showUpdateSkuView = (row: SupRecord) => {
  scene.value = 2;
  addSpuForm.value.initData(row);
};
//显示SPU列表视图
const showSupView = (num: number) => {
  scene.value = num;
};
</script>
<style lang="less" scoped>
.content {
  margin-top: 15px;
}
</style>
