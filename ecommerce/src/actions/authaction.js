import * as ActionTypes from '../constants/types';
import { baseUrl } from '../shared/baseUrl';

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}
export const cartError = (message) => {
    return {
        type: ActionTypes.CART_FAILURE,
        message
    }
}

export const getcart = (cart) => {
    return {
        type: ActionTypes.GET_CART,
        payload: cart
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    console.log(creds);
    return fetch(baseUrl + 'auth/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        
        body: JSON.stringify({email:creds.email, password:creds.password})
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        if (response.success) {
            console.log("Success")
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
  
export const updateCart = (creds) => {
    return {
        type: ActionTypes.ADD_CART
    }
}

export const removeCart = (creds) => {
    return {
        type: ActionTypes.REMOVE_CART
    }
}
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
    }
}
  
export const SignupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (info) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup(info))
    console.log(info);
    return fetch(baseUrl + 'auth/signup', {
        method: 'PUT',
        headers: { 
            'Content-Type':'application/json' 
        },
        
        body: JSON.stringify(info)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log(response)
            console.log("Signup success")
            // Dispatch the success action
            dispatch(receiveSignup(response));
        
        
    })
    .catch(error => dispatch(SignupError(error.message)))
};

export const fetchCart = () => async (dispatch) => {
    console.log("Fetching Cart");

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'auth/cart/',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                console.log("Cart Found");
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(cart => dispatch(getcart(cart)))
        .catch(error => dispatch(cartError(error.message)));
}

export const addtoCart = (productId,type) =>async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    const bearer = 'Bearer ' + localStorage.getItem('token');

   console.log("ID of product: ",productId, "var :",type)
    return fetch(baseUrl + 'auth/addcart/'+productId, {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer 
        },
        body: JSON.stringify(type)
    })
    .then(response => {
        
        if (response.ok) {
            console.log("here1");
            return response;
        } else {
            console.log("here2");
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            console.log("here3");
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log(response)
            console.log("Product Added successfully")
            // Dispatch the success action
            dispatch(updateCart());
        
        
    })
    .catch(error => dispatch(cartError(error.message)))
};

export const removefromCart = (productId,type) =>async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    
    console.log("Removing From Cart");
    const bearer = 'Bearer ' + localStorage.getItem('token');

    console.log("ID of product Removing: ",productId)
    return fetch(baseUrl + 'auth/remcart/'+productId, {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' ,
            'Authorization': bearer
        },
        body: JSON.stringify(type)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log(response)
            console.log("Removing From Cart Success")
            // Dispatch the success action
        dispatch(removeCart())
        
    })
    .catch(error => dispatch(cartError(error.message)))
};

export const usertype = (userrtype) => {
    console.log(userrtype)
    return {
        type: ActionTypes.USER_TYPE,
        payload:userrtype
    }
}

export const changeTypeUser = (type) =>async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    let newtype=null
    if(type=='Buyer')
    newtype='Seller'
    else if (type=='Seller')
    newtype='Buyer'

    console.log("type :",type , "New : ",newtype)
    dispatch(usertype(newtype))

};





export const deleteCart = () =>async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    
    console.log("Removing Cart");
    const bearer = 'Bearer ' + localStorage.getItem('token');

    //console.log("ID of product Removing: ",productId)
    return fetch(baseUrl + 'auth/deletecart/', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' ,
            'Authorization': bearer
        }
        
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log(response)
            console.log("Removing From Cart Success")
            // Dispatch the success action
        dispatch(removeCart())
        
    })
    .catch(error => dispatch(cartError(error.message)))
};
