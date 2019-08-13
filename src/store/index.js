import Vue from 'vue'
import Vuex from 'vuex'

// import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules: { // vuex多模块编程
        msite: msite,  // 子状态： {}
        shop: shop,    // 子状态： {}
        user: user     // 子状态： {}
    } 
})

/* 
总的state的结构
{
    msite: {},
    user: {},
    shop: {}
}

*/