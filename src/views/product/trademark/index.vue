<!--数据大屏-->
<template>
  <el-card class="box-card">
    <el-button type="primary" @click="showAddTrademarkDialog"
      ><el-icon class="icon-btn" name="el-icon-plus"> <Plus></Plus> </el-icon
      >添加品牌</el-button
    >
    <el-table style="width: 100%" border :data="trademarkList">
      <el-table-column label="序号" width="180" prop="id" />
      <el-table-column label="品牌名字" width="180" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <!-- <h1>{{row.logoUrl}}</h1> -->
          <img
            :src="row.logoUrl"
            style="width: 200px; height: 100px; background-cover: center"
            alt="没有图片"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            @click="editTrademark(row.id, row.tmName, row.logoUrl)"
            >编辑</el-button
          >
          <el-button type="primary" @click="deleteTrademark(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 10]"
      :background="background"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="totalSize"
      @size-change="getHasTrademark"
      @current-change="getHasTrademark"
    />

    <!-- 添加品牌弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
      <el-form
        ref="formRef"
        :model="trademarkData"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="品牌名字" prop="tmName" label-width="120px">
          <el-input
            v-model="trademarkData.tmName"
            placeholder="请输入品牌名字"
            prop="tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="120px">
          <el-upload
            prop="logoUrl"
            class="logo-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkData.logoUrl"
              :src="trademarkData.logoUrl"
              class="avatar"
              style="width: 300px; height: 178px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="addTrademarkSubmit"> 确定 </el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="delDialogVisible" title="确认删除吗？" width="500px">
      <el-button type="primary" @click="deleteTrademarkSubmit"> 确定 </el-button>
      <el-button @click="delDialogVisible = false">取消</el-button>

    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  getTrademarkList,
  addOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/trademark";
import { Records, TrademarkItemData } from "@/api/trademark/types";
import { ElMessage } from "element-plus";
import { UploadProps } from "element-plus/es/components/upload";

let trademarkList = ref<Records>([]);

let pageNo = ref(1);
let pageSize = ref(3);
let totalSize = ref(0);
let dialogFormVisible = ref(false);
let dialogTitle = ref("");
let formRef = ref();
let delDialogVisible = ref(false);

let trademarkData = reactive<TrademarkItemData>({
  id: -1,
  tmName: "",
  logoUrl: "",
});

const showAddTrademarkDialog = () => {
  dialogTitle.value = "添加品牌";
  trademarkData.id = -1;
  trademarkData.logoUrl = "";
  trademarkData.tmName = "";
  dialogFormVisible.value = !dialogFormVisible.value;
  formRef.value?.resetFields();
};
const addTrademarkSubmit = async () => {
  // await 会等待表单校验结果，如果失败则不执行后面代码，成功才会执行后面代码
  await formRef.value.validate();
  let res = await addOrUpdateTrademark(trademarkData);
  if (res.code === 200) {
    ElMessage.success("添加品牌成功");
    dialogFormVisible.value = false;

    getHasTrademark();
  } else {
    ElMessage.error(res.data);
  }
};

const editTrademark = (id: string, tmName: string, logoUrl: string) => {
  dialogTitle.value = "编辑品牌";
  formRef.value?.resetFields();
  Object.assign(trademarkData, { id, tmName, logoUrl });
  dialogFormVisible.value = !dialogFormVisible.value;
};

const uploadSuccess = (res: any) => {
  if (res.code === 200) {
    trademarkData.logoUrl = res.data;
    //如果上传成功，清除掉from表单上的错误提示
    formRef.value.clearValidate("logoUrl");
  } else {
    ElMessage.error("上传失败");
  }
};
// 上传图片之前的钩子函数，用于限制图片格式和大小
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const deleteTrademark = (id: string) => {
  delDialogVisible.value = true;
  trademarkData.id = id;
};
const deleteTrademarkSubmit = async () => {
  let res = await reqDeleteTrademark(trademarkData.id);
  if (res.code === 200) {
    ElMessage.success("删除品牌成功");
    delDialogVisible.value = false;
    trademarkData.id = -1;
    getHasTrademark();
  } else {
    ElMessage.error(res.data);
  }
};

const getHasTrademark = async () => {
  let res = await getTrademarkList(pageNo.value, pageSize.value);
  totalSize.value = res.data.total;
  trademarkList.value = res.data.records;
};
let rules = reactive({
  tmName: [
    { required: true, message: "请输入品牌名字", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名长度在 2 到 20 个字符",
      trigger: "blur",
    },
  ],
  logoUrl: [
    { required: true, message: "请上传品牌LOGO", trigger: "blur" },

    {
      validator: (rule, value, callback) => {
        if (value == "") {
          callback(new Error("请上传品牌LOGO"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
});

onMounted(() => {
  getHasTrademark();
});
</script>
<style lang="less" scoped>
.logo-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.logo-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
