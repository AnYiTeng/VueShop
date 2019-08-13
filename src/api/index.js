/* 
包含多个接口请求函数的模块
*/

import ajax from './ajax'
import axios from './ajax';
const BASE = '/api'

/* 
1、根据经纬度获取位置详情 
*/
/* export const reqAddress = (latitude, longitude) => ajax({
    method: 'GET',
    url: BASE+`/position/${longitude},${latitude}`
}) */
export const reqAddress = (latitude,longitude) => ajax.get(BASE+`/position/${longitude},${latitude}`)

/* 
2、获取食品分类列表
*/
export const reqCategorys = () => ajax.get(BASE+'/index_category', {
    headers: {
        needToken: true
    }
})

/* 
3、根据经纬度获取商铺列表
*/
/* export const reqShops = ({latitude,longitude}) => ajax({
    method: 'GET',
    url: BASE+'/shops',
    params: {
        latitude,
        longitude
    }
}) */
export const reqShops = (latitude,longitude) => ajax.get(BASE+'/shops',{
    params: {
        latitude,
        longitude
    },
    
    headers: {
            needToken: true
    }
})

/* 
4、发送短信验证码
*/
export const reqMsg = (phone) => ajax.get(BASE+'/sendcode',{
    params: {
        phone
    }
})

/* 
5、手机号验证码登录
*/
export const reqPhoneLogin = ({
    phone, code
}) => ajax.post(BASE+'/login_sms',{
    phone,
    code
})


/* 
6、用户名密码登陆
*/
export const reqUserLogin = ({name, pwd, captcha}) => axios.post(BASE+'/login_pwd', {name, pwd, captcha})

/**
 * 获取商家信息
 */
export const reqInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqGoods = () => ajax('/goods')

