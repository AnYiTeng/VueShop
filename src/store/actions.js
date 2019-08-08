import {
    reqAddress,
    reqCategorys,
    reqShops
} from '../api/index'

import {
    REQUER_ADRESS,
    REQUER_CATEGORYS,
    REQUER_SHOPS
} from './mutation-types'

export default {
    async getAdress ({commit, state}) {
        // 1.调用接口发送请求
        const {latitude, longitude} = state
        const result = await reqAddress(longitude,latitude)
        // 2.有了结果，提交mutation
        if (result.code === 0) {
            const address = result.data
            commit(REQUER_ADRESS, address)
        }
    },
    async getCategorys ({commit}) {
        // 1.调用接口发送请求
        const result = await reqCategorys()
        // 2.有了结果，提交mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(REQUER_CATEGORYS, categorys)
        }
    },
    async getShops ({commit, state}) {
        // 1.调用接口发送请求
        const {latitude, longitude} = state
        const result = await reqShops(latitude, longitude)
        // 2.有了结果，提交mutation
        if (result.code === 0) {
            const shops = result.data
            commit(REQUER_SHOPS, shops)
        }
    }
}