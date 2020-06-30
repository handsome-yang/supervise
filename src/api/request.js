import QS from 'qs';
import { Service } from './config'
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        Service.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data || res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} config [请求配置] 
 */
export function post(url, params, config) {
    return new Promise((resolve, reject) => {
        Service.post(url, params, config)
            .then(res => {
                resolve(res.data || res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * delete方法，对应delete请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function deletes(url, params) {
    return new Promise((resolve, reject) => {
        Service.delete(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}