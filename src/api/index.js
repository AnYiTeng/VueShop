/* 
包含多个接口请求函数的模块
*/

import ajax from './ajax'
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
export const reqCategorys = () => ajax.get(BASE+'/index_category')

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
export const reqShops = (latitude,longitude) => ajax.get(BASE+'/shops',{latitude,longitude})

/* reqShops(31.38098, 121.50146).then((result)=>{
    console.log('result',result)
}) */

