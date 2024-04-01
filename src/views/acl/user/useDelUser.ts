import { ref } from "vue";
import { reqDeleteBatchUser } from "@/api/acl/user";
import { User } from "@/api/acl/user/types";
import { ElMessage } from "element-plus";
export default function () {
  const checkedUserList = ref<User[]>([]);
  const delBatchUser = async () => {
    const ids = checkedUserList.value.map((item) => {
      return item.id;
    });
    const res = await reqDeleteBatchUser(ids);
    if (res.code === 200) {
      console.log("删除成功");
      checkedUserList.value = [];
      ElMessage.success("删除成功");
    } else {
      ElMessage.error("删除失败");
      console.log("删除失败");
    }
  };

  const handleSelectionChange = (value: User[]) => {
    console.log("handleSelectionChange", value);
    checkedUserList.value = value;
  };

  return {
    checkedUserList,
    delBatchUser,
    handleSelectionChange,
  };
}
