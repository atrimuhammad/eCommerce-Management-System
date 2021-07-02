import {combineReducers} from 'redux';
import { Auth } from './authreducer';
import {Product} from './productreducer';
import { Shop } from './shopreducer';
import {Order} from './orderReducer'
export default combineReducers({
    product:Product,
    auth:Auth,
    shop:Shop,
    order:Order
})