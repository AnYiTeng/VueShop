/* 
能发送ajax请求的请求体参数,参数的返回值是promise
1. 处理post请求的请求体参数：转换为urlencode格式(默认用json格式)：请求拦截器
2. 让成功的结果不是response,而是response.data:响应拦截器的成功回调
3. 统一处理请求错误：响应拦截器的失败回调
4. 如果需要携带token的请求，从state中取出token
    1). 没有，不发请求，直接进入失败的流程
    2). 有，添加到请求头中：Authorization=token
*/
import axios from 'axios'
import qs from 'qs'

import store from '../store'

// 添加请求拦截器
// 处理post请求的请求体参数：转换为urlencode格式(默认用的json格式)
axios.interceptors.request.use(config => {
    const {method, data} = config
    if (method.toUpperCase() === 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
    }
    // 如果需要携带token的请求，从state中取出token
    if(config.headers.needToken){
        const token = store.state.user.token
        // 1). 没有，不发请求，直接进入失败的流程
        if(!token){
            const error = new Error('没有token，不能发请求')
            throw error
        }else {
            // 2). 有，添加到请求头中：Authorization=token 
            config.headers['Authorization'] = token                     
        }
    }
    return config
})

axios.interceptors.response.use(response => {
    // 让成功的结果不是response而是response.data
    return response.data
},error => {
    // 统一处理请求错误
    alert(`请求异常:${error.message}`)
    return new Promise(() => {})
})
export default axios
