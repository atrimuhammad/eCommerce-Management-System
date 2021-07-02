import * as ActionTypes from '../constants/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        iscreated:false,
        loggedas:null,
        cart:[],
        cartUpdated:false,
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.USER_TYPE:
                return {...state,
                    loggedas:action.payload
                };
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                loggedas:'Buyer',
                token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
            case ActionTypes.SIGNUP_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,
                    user: action.creds
                };
            case ActionTypes.SIGNUP_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    iscreated:true,
                    errMess: '',
                    token: action.token
                };
            case ActionTypes.SIGNUP_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    iscreated:false,
                    errMess: action.message
                };
            case ActionTypes.GET_CART:
                    return {...state,
                        isLoading: false,
                        cart: action.payload,
                        cartUpdated:false
                    };
            case ActionTypes.ADD_CART:
                        return {...state,
                            isLoading: false,
                            cartUpdated:true
                        };
            case ActionTypes.REMOVE_CART:
                        return {...state,
                            isLoading: false,
                            cartUpdated:true
                        };
            case ActionTypes.CART_FAILURE:
            return {...state,
                cartUpdated:false,
                errMess: action.message
            };
              
        default:
            return state
    }
}