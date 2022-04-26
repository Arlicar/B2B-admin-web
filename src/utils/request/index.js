import axios from "axios";
// import {
//     ElMessage
// } from "element-plus";
// import {
//     getToken
// } from '@/utils/auth'

const service = axios.create({
    // baseURL: "http://localhost:8080",
    // baseURL: "http://localhost:8081",
    baseURL: "https://www.fastmock.site/mock/76216c9487ff8ff706db0c754fe95f1c/lx-b2b",
    timeout: 8000,
    // headers: {}
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config.headers['LX-B2B-Token'] = getToken() || ''
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service
