import {
    REQUER_ADRESS,
    REQUER_CATEGORYS,
    REQUER_SHOPS
} from './mutation-types'

export default {
    [REQUER_ADRESS] (state, address) {
        state.address = address
    },
    [REQUER_CATEGORYS] (state, categrous) {
        state.categorys = categrous
    },
    [REQUER_SHOPS] (state, shops) {
        state.shops = shops
    }
}