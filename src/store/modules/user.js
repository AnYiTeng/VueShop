/* 
管理user功能模块相关状态数据的vuex模块
*/

import {
    REQUER_USER,
    RESET_USER,
    RECEIVE_TOKEN,
    RESET_TOKEN,
} from '../mutation-types'


const state = {
    user: {}, // 用户信息
    token: localStorage.getItem('token_key'), // 当前登录用户对应的token
}

const mutations = {
    [REQUER_USER] (state, {user}) {
        state.user = user
    },
    [RECEIVE_TOKEN] (state, {token}) {  
        state.token = token
    },
    [RESET_USER] (state) {
        state.user = {}
    },
    [RESET_TOKEN] (state) {
        state.token = ''
    },
}

const actions = {
    // 保存user的同步action
    saveUser({commit},user){
        const token = user.token
        // 将token保存到local
        localStorage.setItem('token_key', token)

        // 将token保存到state
        commit(RECEIVE_TOKEN, { token })

        // 删除user中的token
        delete user.token
        commit(REQUER_USER, {user})
    },

    // 退出登录
    logout({commit}){
        commit(RESET_USER)
        commit(RESET_TOKEN)
        localStorage.removeItem('token_key')
    },
}

const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}