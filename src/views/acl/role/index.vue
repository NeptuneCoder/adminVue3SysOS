<!--数据大屏-->
<template>
  <el-card>
    <el-form
      :inline="true"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <el-form-item label="角色名">
        <el-input v-model="keyword" placeholder="请您输入角色名"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button type="primary" @click="showDialog(true, 0)">添加</el-button>
    <el-table style="width: 100%; margin-top: 20px" :data="roles" border>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
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
          <el-button type="primary" @click="showPermissionDrawer(row)"
            >分配权限</el-button
          >
          <el-button type="primary" icon="edit" @click="updateRole(row)"
            >编辑</el-button
          >
          <el-button type="primary" icon="delete" @click="delRole(row)"
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
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="totalSize"
      @current-change="getRoles"
      @size-change="getRoles"
    />
  </el-card>

  <el-dialog v-model="dialogRef" :title="dialogTile" width="500" center>
    <el-form ref="roleForm" label-width="100px">
      <el-form-item label="角色名称">
        <el-input v-model="roleRef.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog(false)">取消</el-button>
        <el-button type="primary" @click="addRole"> 添加 </el-button>
      </div>
    </template>
  </el-dialog>

  <el-drawer v-model="drawerRole">
    <template #title>分配权限</template>

    <template #default>
      <el-tree
        ref="tree"
        style="max-width: 600px"
        :data="permissions"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expendKeys"
        :default-checked-keys="selectedKeys"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <el-button type="primary" @click="submitPermission">提交</el-button>
      <el-button>取消</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import useRoleHooks from "@/views/acl/role/useRoleHooks";
let {
  roles,
  pageNo,
  pageSize,
  totalSize,
  keyword,
  search,
  reset,
  getRoles,
  delRole,
} = useRoleHooks();

import useAddRoleDialogHooks from "@/views/acl/role/useAddRoleDialogHooks";
let {
  dialogRef,
  dialogTile,
  roleRef,
  showDialog,
  addRole,
  updateRole,
  mitter,
} = useAddRoleDialogHooks();
mitter.on("addRoleSuccess", () => {
  getRoles();
});
import usePermissionHooks from "@/views/acl/role/usePermissionHooks";
let {
  tree,
  drawerRole,
  permissions,
  expendKeys,
  selectedKeys,
  showPermissionDrawer,
  submitPermission,
  mitter: mitter2,
} = usePermissionHooks();
const defaultProps = {
  children: "children",
  label: "name",
};
mitter2.on("resfreshPermission", () => {
  window.location.reload();
});
</script>
<style lang="less" scoped></style>
