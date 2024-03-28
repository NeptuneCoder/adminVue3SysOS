<!--数据大屏-->
<template>
  <Category class="categroy" :scene="scene"></Category>
  <el-card class="content">
    <div v-show="scene == 1 ? true : false">
      <el-button
        type="primary"
        :disabled="categoryStore.c3id === '' ? true : false"
        @click="showAddAttrView"
      >
        <Plus></Plus>新增属性
      </el-button>
      <el-table :data="tableData" style="width: 100%; margin-top: 15px" border>
        <el-table-column
          prop="id"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="attrName" label="属性名称"></el-table-column>
        <el-table-column prop="value" label="属性值">
          <template #="{ row, $index }">
            <el-tag
              style="margin-left: 10px"
              type="success"
              v-for="(value, index) in row.attrValueList"
              :key="index"
              >{{ value.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="属性操作" label-width="150px">
          <template #="{ row, $index }">
            <el-button type="primary" @click="showModifyAttrView(row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确认删除吗？"
              cancel-button-text="取消"
              confirm-button-text="确定"
            >
              <template #reference>
                <el-button type="danger" @click="deleteAttr(row.id)"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 2 ? true : false">
      <el-form ref="attrForm" label-width="100px">
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            :disabled="attrParams.attrName === '' ? true : false"
            @click="addAttrValue"
            >新增属性</el-button
          >
          <el-button type="primary" @click="scene = 1">取消</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="attrParams.attrValueList"
        style="width: 100%; margin-top: 15px"
        border
      >
        <el-table-column
          label="序号"
          type="index"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="value" label="属性值">
          <template #="{ row, $index }">
            <!---将输入的值绑定到行对象的valueName上-->
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性值"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" label-width="150px">
          <template #="{ row, $index }">
            <el-button type="primary">编辑</el-button>
            <el-popconfirm
              title="确认删除吗？"
              cancel-button-text="取消"
              confirm-button-text="确定"
            >
              <template #reference>
                <el-button type="danger" @click="deleteAttr(row.id)"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-form label-width="100px">
        <el-form-item label="">
          <el-button type="primary" @click="saveAttr">保存</el-button>
          <el-button type="primary" @click="scene = 1">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reqCategoryList, reqDelAttr, reqModifyAttr } from "@/api/attr";
import { useCategoryStore } from "@/store/useCategoryStore";
import { ref, watch, reactive } from "vue";
import { AttrValue } from "@/api/attr/types";
import { ElMessage } from "element-plus";
//控制显示哪个场景
let scene = ref(1);
//引入Plus组件
let categoryStore = useCategoryStore();
console.log("categoryStore:", categoryStore);
//用于表格显示数据列表
const tableData = ref<AttrValue[]>([]);

//用于添加数据时的数据对象
let attrParams = reactive({
  attrName: "",
  attrValueList: [],
  categoryLevel: 3,
  categoryId: "",
});

watch(
  () => categoryStore.c3id,
  (val) => {
    if (val !== "") {
      getAttrList();
    }
  },
);

const getAttrList = async () => {
  let { c1id, c2id, c3id } = categoryStore;
  const res = await reqCategoryList(c1id, c2id, c3id);
  tableData.value = res.data;
  console.log("tableData:", tableData);
};

const deleteAttr = async (id: number) => {
  let resData = await reqDelAttr(id);
  console.log("resData:", resData);
  let { c1id, c2id, c3id } = categoryStore;
  const res = await reqCategoryList(c1id, c2id, c3id);
  tableData.value = res.data;
  console.log("tableData:", tableData);
};
const showAddAttrView = async () => {
  scene.value = 2;
  //清空数据
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryLevel: 3,
    categoryId: "",
  });
};
//显示修改属性界面
const showModifyAttrView = async () => {
  scene.value = 2;
};
const modifyAttr = (data: AttrValue) => {
  console.log("modifyAttr" + data.attrValueList);
};
//点击新增属性按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({});
};

const saveAttr = async () => {
  //需要手机categoryId，attrName，attrValueList
  attrParams.categoryId = categoryStore.c3id;
  reqModifyAttr(attrParams)
    .then((res) => {
      console.log("res:", res);
      if (res.code === 200) {
        scene.value = 1;
        getAttrList();
        ElMessage.success("保存成功");
      } else {
        ElMessage.error("保存失败");
      }
    })
    .then(() => {
      scene.value = 1;
      getAttrList();
    });
};
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
