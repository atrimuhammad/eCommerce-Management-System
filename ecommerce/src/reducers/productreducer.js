import * as ActionTypes from '../constants/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Product = (state = {

        iscreated: false,
        errMess: null,
        products:[],
        featured:[],
        shopProd:[],
        prod:null,
        isupdated:false,
        isloading:true
    }, action) => {

    switch (action.type) {
        case ActionTypes.PRODUCTS_FAILED:
            return {...state,
                isloading:false,
                iscreated: false,
                errMess:action.message
            };
        case ActionTypes.PRODUCTS_LOADING:
            return {...state,
                isloading:true,
                errMess: '',
                //appointments: action.payload
            };
        case ActionTypes.GET_PRODUCTS:
            return {
                ...state,
                isloading:false,
                products:action.payload,
                errMess: ''
            };
            case ActionTypes.ADD_PRODUCTS:
                return {
                    ...state,
                iscreated:true,
                    errMess: '',
                }
                case ActionTypes.UPDATE_PRODUCT:
                    return {
                        ...state,
                    isupdated:true,
                        errMess: '',
                    }
            case ActionTypes.GET_SHOP_PRODUCTS:
                    return {
                        ...state,
                        isloading:false,
                        shopProd:action.payload,
                        errMess: ''
                    }
                    case ActionTypes.GET_PRODUCT:
                        return {
                            ...state,
                            isloading:false,
                            prod:action.payload,
                            errMess: ''
                        };
        default:
            return state
    }
}