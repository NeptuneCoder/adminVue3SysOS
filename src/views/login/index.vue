<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"> </el-col>

      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="data"
          :rules="rules"
          ref="loginForm"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              :prefix-icon="User"
              v-model="data.username"
              prop="username"
            />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="data.pwd"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-col :span="12">
              <a>忘记密码?</a>
            </el-col>
            <el-col :span="12" justify="end">
              <a>注册</a>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="login">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage, ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getGreetingsMsg } from "@/utils/MsgUtils";
let userStore = useUserStore();
const $router = useRouter();
let loading = ref(false);
let loginForm = ref();

// set the rules for the form
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 4,
      max: 10,
      message: "用户名长度在 4 到 10 个字符",
      trigger: "blur",
    },
  ],
  pwd: [
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

// set the data for the form

const data = reactive({
  username: "",
  pwd: "",
});

async function login() {
  // validate the form   验证表单
  await loginForm.value.validate();
  // if (data.username === "" || data.pwd === "") {
  //   ElMessage.error("用户密码和账号不能为空");
  //   return;
  // }

  // if (data.username.length < 4 || data.pwd.length < 6) {
  //   ElMessage.error("用户账号或密码长度不对");
  //   return;
  // }
  console.log("这里是login vue中，我被调用了嘛？");

  loading.value = true;
  userStore
    .userLogin(data.username, data.pwd)
    .then(() => {
      console.log("succss");
      loading.value = false;
      ElNotification({
        type: "success",
        title: "登录成功",
        message: getGreetingsMsg(),
      });
      $router.push("/");
    })
    .catch((error) => {
      loading.value = false;
      console.log(error);
      console.log("error");
      ElNotification({
        type: "error",
        title: "登录失败",
        message: getGreetingsMsg(),
      });
    });
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    top: 30vh;
    width: 40vw;
    position: relative;
    background: url("@/assets/images/login_from.png");
    background-size: cover;
    h1 {
      font-size: 36px;
      color: white;
    }
    h2 {
      color: white;
      font-size: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    el-input {
      height: 50px;
    }

    .login_btn {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
