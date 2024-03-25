//用于对axios进行封装，统一请求的配置，请求头，拦截器等
import axios from "axios";
import { ElMessage } from "element-plus";

const netInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: {},
});
netInstance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer ";
  return config;
});

netInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response.status;
    switch (status) {
      case 401:
        ElMessage.error("请先登录");
        break;
      case 403:
        ElMessage.error("没有权限");
        break;
      case 404:
        ElMessage.error("请求地址不存在");
        break;

      case 500:
        ElMessage.error("服务器内部错误");
        break;
      default:
        ElMessage.error("请求失败");
        break;
    }
    return Promise.reject(error);
  },
);
export default netInstance;
