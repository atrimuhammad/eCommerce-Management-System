import * as ActionTypes from '../constants/types';

export const Order = (state = {
        isLoading: false,
        iscreated:false,
        errMess: null,
        orders:[]
    }, action) => {
    switch (action.type) {
            case ActionTypes.GET_ORDER:
                    return {...state,
                        isLoading: false,
                        order: action.payload,
                        cartUpdated:false
                    };
            case ActionTypes.ADD_ORDER:
                        return {...state,
                            isLoading: false,
                            cartUpdated:true
                        };
          
            case ActionTypes.ORDER_FAILURE:
            return {...state,
                cartUpdated:false,
                errMess: action.message
            };
              
        default:
            return state
    }
}