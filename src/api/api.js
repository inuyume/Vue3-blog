/* jshint esversion: 11 */
/* jshint strict: false */
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type' : "application/json"
    }
});
// 请求拦截器 - 添加JWT到Authorization头
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // 从localStorage获取JWT
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},error => {
    return Promise.reject(error);
});

export default apiClient;