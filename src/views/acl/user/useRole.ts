import { ref } from "vue";
import { User, Role, AssignRoleRequest } from "@/api/acl/user/types";

import { reqAllRoleUser, reqAssignRole } from "@/api/acl/user";
import { ElMessage } from "element-plus";
import mitt from "mitt";
export default function () {
  const drawerRole = ref(false);
  const mitter = mitt();
  const curUser = ref<User>({
    id: 0,
  });
  const handleOpenRole = (user: User) => {
    curUser.value = user;
    console.log("handleOpenRole  我被调用了嘛？");
    drawerRole.value = true;
    roleUsername.value = user.username;
    getAllRoleUser(user.id!);
  };

  const handleCloseRole = () => {
    drawerRole.value = false;
  };
  //点击提交
  const handleRoleSubmit = async () => {
    console.log("handleRoleSubmit  curUser.value.id!=", curUser.value.id!);
    const params: AssignRoleRequest = {
      userId: curUser.value.id!,
      roleIdList: [...checkedRole.value.map((role) => role.id)],
    };
    const res = await reqAssignRole(params);
    if (res.code === 200) {
      ElMessage.success("角色分配成功");
      drawerRole.value = false;
    } else {
      ElMessage.error("角色分配失败");
    }
    mitter.emit("refreshUserList");
  };
  const allRoleList = ref<Role[]>([]);
  const roleUsername = ref<string>("");

  const checkAll = ref(false);
  const isIndeterminate = ref(true);

  const checkedRole = ref<Role[]>([]);
  const handleCheckAllChange = (val: boolean) => {
    console.log("handleCheckAllChange  val = ", val);
    checkedRole.value = val ? allRoleList.value : [];
    console.log("checkedRole = ", checkedRole.value);
    isIndeterminate.value = false;
  };
  const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === allRoleList.value.length;
    isIndeterminate.value =
      checkedCount > 0 && checkedCount < allRoleList.value.length;
  };

  const getAllRoleUser = async (userId: number) => {
    const res = await reqAllRoleUser(userId);
    if (res.code !== 200) {
      console.log("获取角色失败");
      return;
    }
    checkedRole.value = res.data.assignRoles;
    allRoleList.value = res.data.allRolesList;
    isIndeterminate.value = false;
    checkAll.value = false;
  };

  return {
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
  };
}
