import axios from "axios";
import { Message } from 'element-ui';
// import Vue from 'vue'
// Vue.prototype.$Message = Message
import router from '../router/index'
import store from '../store/index'


let API_ROOT = '';
if (process.env.NODE_ENV == 'development') {
  API_ROOT = `http://map.guojutech.net`
} else {
  API_ROOT = `http://map.guojutech.net`
}
window.API_ROOT = API_ROOT
export const Service = axios.create({
  timeout: 7 * 1000, // 请求超时时间
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // withCredentials:true
})
Service.interceptors.request.use(config => {

  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, error => {
  Message.error('请求出错了o(╥﹏╥)o')
  console.log('response-error:', error)
  return Promise.reject(error);
});

Service.interceptors.response.use(response => {
  if (response.status == 200) {
    // console.log(response);
    return response
    // switch (Number(response.data.code)) {
    //   case 100:
    //     return response
    //     break;
    //   case 200:
    //     return response
    //     break;
    //   case 101:
    //     Message.error('用户名或密码错误')
    //     break;
    //   case 400:
    //     Message.error('请求处理异常，请稍后再试')
    //     break;
    //   case 500:
    //     Message.error('请求方式有误')
    //     break;
    //   case 501:
    //     Message.error('请求路径不存在')
    //     break;
    //   case 502:
    //     Message.error('权限不足')
    //     break;
    //   case 10008:
    //     Message.error('角色删除失败,尚有用户属于此角色')
    //     break;
    //   case 10009:
    //     Message.error('账户已存在')
    //     break;
    //   case 20011:
    //     Message.error('登陆已过期,请重新登陆');
    //     store.commit('RM_USER')
    //     store.commit('RM_TOKEN')
    //     router.push('/login')
    //     break;
    //   case 90003:
    //     Message.error('缺少必填参数')
    //   default:
    //     break;
    // }
  }
}, error => {
  Message.error('请求出错了o(╥﹏╥)o')
  console.log('response-error:', error)
  return Promise.reject(error);
});
