<!--数据大屏-->
<template>
  <el-card>
    <el-form
      :inline="true"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请您输入用户名"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button type="primary" @click="showAddUserDrawer">添加</el-button>
    <el-button type="error">批量删除</el-button>
    <el-table style="width: 100%; margin-top: 20px" :data="users" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名字"
        width="200px"
      ></el-table-column>
      <el-table-column prop="name" label="用户名称" width="200px">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        width="200px"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200px"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="200px"
      ></el-table-column>
      <el-table-column label="操作" width="400px">
        <template #="{ row, $index }">
          <el-button type="primary" @click="handleOpenRole(row)"
            >分配角色</el-button
          >
          <el-button type="primary" icon="edit" @click="updateUserDrawer(row)"
            >编辑</el-button
          >
          <el-button type="primary" icon="delete" @click="deleteUser(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 10]"
      style="margin-top: 20px"
      :background="background"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="totalSize"
      @current-change="getUsersInfo"
      @size-change="getUsersInfo"
    />
  </el-card>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :before-close="handleClose"
  >
    <template #title>添加用户</template>

    <template #default>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input
            placeholder="请输入用户姓名"
            v-model="formData.name"
            prop="name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input
            placeholder="请输入用户昵称"
            v-model="formData.username"
            prop="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            placeholder="请输入用户密码"
            v-model="formData.password"
            prop="password"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>

  <el-drawer v-model="drawerRole" :before-close="handleCloseRole">
    <template #title>分配角色</template>

    <template #default>
      <el-form ref="form" label-position="left" label-width="100px">
        <el-form-item label="用户姓名" prop="name">
          <el-input
            placeholder="请输入用户姓名"
            v-model="roleUsername"
            disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkedRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="city in allRoleList"
              :key="city.id"
              :label="city"
              :value="city"
              >{{ city.roleName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleRoleSubmit">提交</el-button>
      <el-button @click="handleCloseRole">取消</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import {
  reqAllUserInfo,
  reqAddOrUpdateUser,
  reqDeleteUser,
} from "@/api/acl/user";
import { ref, onMounted, reactive, watch } from "vue";
import { User } from "@/api/acl/user/types";
import { ElMessage } from "element-plus";
let form = ref();
//drawer表单验证规则
let rules = reactive({
  username: [
    { required: true, message: "请输入用户昵称", trigger: "blur" },
    {
      min: 5,
      max: 10,
      message: "用户昵称长度在 5 到 10 个字符",
      trigger: "blur",
    },
  ],
  name: [
    { required: true, message: "请输入用户姓名", trigger: "blur" },
    {
      min: 5,
      max: 10,
      message: "用户名长度在 5 到 10 个字符",
      trigger: "blur",
    },
  ],

  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度在 6 到 16 个字符", trigger: "blur" },
    {
      validator: checkPwd,
      trigger: "change",
    },
  ],
});
//自定义验证器 callback   回调函数, 验证通过返回true, 否则返回false;value 验证的值 rule 规则
//rule 规则对象, 包含required, min, max, message, trigger等属性
//value 验证的值
function checkPwd(rule, value, callback) {
  if (value === "123456") {
    callback(new Error("密码不能为123456"));
  } else {
    callback();
  }
}
let username = ref();
let pageNo = ref(1);
let pageSize = ref(10);
//分页总数
let totalSize = ref(0);
let background = true;
let users = ref<User[]>([]);
//控制添加用户和修改用户的抽屉显示和隐藏
let drawer = ref(false);

//用于收集drawer表单数据
let formData = ref<User>({
  name: "",
  username: "",
  password: "",
});
//显示添加用户的抽屉
const showAddUserDrawer = () => {
  drawer.value = true;
};

const updateUserDrawer = (user: User) => {
  drawer.value = true;
  formData.value = JSON.parse(JSON.stringify(user));
};
const handleClose = () => {
  drawer.value = false;
  formData.value = {
    name: "",
    username: "",
    password: "",
  };
};
const handleSubmit = async () => {
  //TODO: 表单验证
  await form.value.validate();
  let res = await reqAddOrUpdateUser(formData.value);
  if (res.code === 200) {
    drawer.value = false;
    ElMessage.success("操作成功");
    getUsersInfo();
  } else {
    ElMessage.error("操作失败:" + `${res.message}`);
  }
  drawer.value = false;
  formData.value = {
    name: "",
    username: "",
    password: "",
  };
};

//TODO: 获取所有用户信息
const getUsersInfo = async () => {
  let res = await reqAllUserInfo(pageNo.value, pageSize.value);
  users.value = res.data.records;
  totalSize.value = res.data.total;
};

const deleteUser = async (row: User) => {
  let res = await reqDeleteUser(row.id?.toString());
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getUsersInfo();
  } else {
    ElMessage.error("删除失败:" + `${res.message}`);
  }
};
onMounted(() => {
  getUsersInfo();
});

import useRole from "@/views/acl/user/useRole";
const {
  checkAll,
  isIndeterminate,
  checkedRole,
  drawerRole,
  roleUsername,
  allRoleList,
  handleOpenRole,
  handleCloseRole,
  handleRoleSubmit,
  handleCheckAllChange,
  handleCheckedCitiesChange,
  mitter,
} = useRole();
mitter.on("refreshUserList", () => {
  console.log("refreshUserList");
  getUsersInfo();
});
</script>
<style lang="less" scoped></style>
