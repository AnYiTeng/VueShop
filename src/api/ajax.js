/* 
能发送ajax请求的请求体参数,参数的返回值是promise
*/
import axios from 'axios'
import qs from 'qs'

// 添加请求拦截器
// 处理post请求的请求体参数：转换为urlencode格式(默认用的json格式)
axios.interceptors.request.use(config => {
    const {method, data} = config
    if (method.toUpperCase === 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
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
