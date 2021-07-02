import * as ActionTypes from '../constants/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Shop = (state = {

        iscreated: false,
        errMess: null,
        shops:[],
        shop:null,
        isupdated:false,
        isloading:true
    }, action) => {

    switch (action.type) {
        case ActionTypes.SHOPS_FAILED:
            return {...state,
                isloading:false,
                iscreated: false,
                errMess:action.message
            };
        case ActionTypes.SHOPS_LOADING:
            return {...state,
                isloading:true,
                errMess: '',
                //appointments: action.payload
            };
        case ActionTypes.GET_SHOPS:
            return {
                ...state,
                isloading:false,
                shops:action.payload,
                errMess: ''
            };
        case ActionTypes.GET_SHOP:
                return {
                    ...state,
                    isloading:false,
                    shop:action.payload,
                    errMess: ''
                };
            case ActionTypes.ADD_SHOPS:
                return {
                    ...state,
                iscreated:true,
                    errMess: '',
                }
                case ActionTypes.UPDATE_SHOP:
                    return {
                        ...state,
                    isupdated:true,
                        errMess: '',
                    }
        default:
            return state
    }
}