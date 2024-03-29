<!--数据大屏-->
<template>
  <Category class="categroy" :scene="scene"></Category>
  <el-card class="content">
    <div>
      <el-button type="primary" wrap-content icon="plus"> 添加SPU</el-button>
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
            <el-button type="plus">增加</el-button>
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/useCategoryStore";
import { reqSpuList } from "@/api/spu";
import { SupRecords } from "@/api/spu";
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
</script>
<style lang="less" scoped>
.content {
  margin-top: 15px;
}
</style>
