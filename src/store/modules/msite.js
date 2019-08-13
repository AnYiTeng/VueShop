/* 
管理msite功能模块相关状态数据的vuex模块
*/
import {
    reqAddress,
    reqCategorys,
    reqShops,
} from '../../api/index'

import {
    REQUER_ADRESS,
    REQUER_CATEGORYS,
    REQUER_SHOPS,
} from '../mutation-types'

const state = {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], // 商家数组
}

const mutations = {
    [REQUER_ADRESS] (state, address) {
        state.address = address
    },
    [REQUER_CATEGORYS] (state, categrous) {
        state.categorys = categrous
    },
    [REQUER_SHOPS] (state, shops) {
        state.shops = shops
    },
}

const actions = {
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
    },

}

const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}