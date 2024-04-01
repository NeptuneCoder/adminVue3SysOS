<template>
  <el-form ref="form" label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        v-model="spuParams.spuName"
        placeholder="请输入SPU名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select
        placeholder="请选择品牌"
        style="width: 200px; margin-right: 10px"
        v-model="spuParams.tmId"
      >
        <el-option
          v-for="item in allTrdemarkList"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imageList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemovePicture"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        placeholder="请选择品牌"
        style="width: 200px; margin-right: 10px"
      >
        <el-option> 测试数据1 </el-option>
      </el-select>
      <el-button type="primary">添加销售属性</el-button>
    </el-form-item>
    <el-form-item>
      <el-table border :data="spuParams.spuSaleAttrList">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="saleAttrName" label="属性名称"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row, $index }">
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="$index"
              closable
              :type="tag.type"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item style="margin-top: 20px">
      <el-button type="primary">保存</el-button>
      <el-button type="cancel" @click="showSpuView">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import type { SupRecord } from "@/api/spu/types";
import {
  reqAllSupTradmarkList,
  reqSpuSaleAttrList,
  reqSpuImageList,
  reqAllSaleAttrList,
} from "@/api/spu";
import { TrademarkItemData } from "@/api/trademark/types";

//接收父组件传递的回调函数
let $emit = defineEmits(["showSupView"]);
let spuParams = ref<SupRecord>({
  id: 0,
  spuName: "",
  description: "",
  category3Id: "",
  tmId: "",
  spuSaleAttrList: [],
  spuImageList: [],
  spuPosterList: [],
});

const handlePictureCardPreview = (file: any) => {
  console.log(file);
  //TODO 通过控制dialog显示图片，file为图片对象
};
//从集合和数组中移除图片
const handleRemovePicture = (file: any, fileList: any) => {
  console.log(file, fileList);
  fileList.forEach((item, index) => {
    if (item.url === file.url) {
      fileList.splice(index, 1);
    }
  });
  //TODO 调用接口删除图片
};

const showSpuView = () => {
  //调用父组件的回调函数
  $emit("showSupView", 1);
};

const initData = (row: SupRecord) => {
  console.log("我是在点击按钮是进行调用的：", row.id, row.spuName);
  // Object.assign(, JSON.parse(JSON.stringify(row)));
  spuParams.value = row;
  //获取所有品牌列表
  getAllTrdemarkList();
  //获取spu的图片列表
  getSpuImageList();
  //获取spu的销售属性列表
  getSpuSaleAttrList();
  getAllSaleAttrList();
};
defineExpose({
  initData,
});

let allTrdemarkList = ref<TrademarkItemData[]>([]);
const getAllTrdemarkList = async () => {
  let res = await reqAllSupTradmarkList();
  if (res.code == 200) {
    allTrdemarkList.value = res.data;
  }
};
const imageList = ref<any[]>([]);
const getSpuImageList = async () => {
  let res = await reqSpuImageList(spuParams.value.id);
  imageList.value = res.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
};

const getSpuSaleAttrList = async () => {
  let res = await reqSpuSaleAttrList(spuParams.value.id);
  spuParams.value.spuSaleAttrList = res.data;
};

const getAllSaleAttrList = async () => {
  //TODO: 获取所有销售属性列表
  let res = await reqAllSaleAttrList(spuParams.value.id);
  console.log("销售属性列表：", res.data);
};
</script>

<style lang="less" scoped>
.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}
</style>
p
