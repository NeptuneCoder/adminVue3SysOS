import { ref } from "vue";
import { reqAddOrUpdateRole } from "@/api/acl/role";
import { ElMessage } from "element-plus";
import type { Role } from "@/api/acl/user/types";
import mitt from "mitt";
export default function () {
  const mitter = mitt();

  const dialogTile = ref("添加角色");
  const dialogRef = ref(false);
  const roleRef = ref<Role>({
    createTime: "",
    id: 0,
    roleName: "",
    updateTime: "",
  });

  const showDialog = (show: boolean) => {
    roleRef.value = {
      createTime: "",
      id: 0,
      roleName: "",
      updateTime: "",
      remark: "",
    };
    dialogRef.value = show;
  };

  const addRole = async () => {
    if (!roleRef.value) {
      ElMessage.error("请输入角色名称");
      return;
    }

    let result = await reqAddOrUpdateRole({
      roleName: roleRef.value.roleName,
      id: roleRef.value.id,
    });
    if (result.code === 200) {
      if (roleRef.value.id === 0) {
        ElMessage.success("添加角色成功");
      } else {
        ElMessage.success("编辑角色成功");
      }

      dialogRef.value = false;
      mitter.emit("addRoleSuccess");
    } else {
      if (roleRef.value.id === 0) {
        ElMessage.error("添加角色失败");
      } else {
        ElMessage.error("编辑角色失败");
      }
    }
  };

  const updateRole = async (role: Role) => {
    // TODO: implement update role logic
    roleRef.value.roleName = role.roleName;
    roleRef.value.id = role.id;
    dialogTile.value = "编辑角色";
    dialogRef.value = true;
  };
  return {
    dialogRef,
    dialogTile,
    roleRef,
    showDialog,
    addRole,
    updateRole,
    mitter,
  };
}
