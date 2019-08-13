/* 
管理shop功能模块相关状态数据的vuex模块
*/
import Vue from 'vue'
import {
    reqGoods,
    reqInfo,
    reqRatings
} from '../../api/index'

import {
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CRAT
} from '../mutation-types'

const state = {
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods: [] // 购物车数组
}

const mutations = {
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [ADD_FOOD_COUNT](state, {food}) {
        if(food.count){
            food.count++
        }else{
            // food.count = 1
            // 为响应式对象添加一个属性，改属性不是响应式，不会更新界面，为确保新属性也是响应式的，并且能够触发视图更新
            Vue.set(food, 'count', 1)
            // 添加到购物车
            state.cartFoods.push(food)
        }
    },
    [REDUCE_FOOD_COUNT](state, {food}) {
        if(food.count>0){
            food.count--
            // 一旦数量减为0，从购物车中移出food
            if(food.count === 0){
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_CRAT](state) {
        // 先清空购物车选中商品的数量
        state.cartFoods.forEach(food => {
            food.count = 0
        })
        // 清空购物车数组
        state.cartFoods = []
    }
}

const actions = {
    // 异步获取商家信息
    async getInfo({commit}, cb) {
        const result = await reqInfo()
        if(result.code===0) {
        const info = result.data
        info.score = 3.5
        commit(RECEIVE_INFO, {info})
        
        typeof cb === 'function' && cb()
        }
    },
    
    // 异步获取商家评价列表
    async getRatings({commit}, cb) {
        const result = await reqRatings()
        if(result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
    
        typeof cb === 'function' && cb()
        }
    },
    
    // 异步获取商家商品列表
    async getGoods({commit}, cb) {
        const result = await reqGoods()
        if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
        typeof cb === 'function' && cb()
        }
    },
    updataFoodCount({commit}, {isAdd, food}){
        if(isAdd){
            commit(ADD_FOOD_COUNT,{food})
        } else {
            commit(REDUCE_FOOD_COUNT,{food})
        }
    },
    // 清空购物车
    clearCrat({commit}){
        commit(CLEAR_CRAT)
    }
}

const getters = {
    /* cartFoods (state) {
        const {goods} = state
        const arr = []
        goods.forEach(good => {
            good.foods.forEach(food => {
                if (food.count>0) {
                    arr.push(food)
                }
            })
        })
        return arr
    } */
    
    /* 总数量 */
    totalCount(state){
        return state.cartFoods.reduce((pre,food) => pre + food.count,0)
    },

    /* 总价格 */
    totalPrice(state){
        return state.cartFoods.reduce((pre,food) => pre + food.count * food.price,0)
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}