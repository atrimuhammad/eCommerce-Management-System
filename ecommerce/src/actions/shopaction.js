import * as ActionTypes from '../constants/types';
import { baseUrl } from '../shared/baseUrl';


  export const shopCreated = () => {
    return {
        type: ActionTypes.ADD_SHOPS
        
    }
  }
  export const shopUpdated = () => {
    return {
        type: ActionTypes.UPDATE_SHOP
        
    }
  }

  export const getshops = (shops) => {
    return {
        type: ActionTypes.GET_SHOPS,
        payload:shops
    }
  }

  export const getshop = (shop) => {
    return {
        type: ActionTypes.GET_SHOP,
        payload:shop
    }
  }
  
  export const shopsLoading = () => ({
    type: ActionTypes.SHOPS_LOADING
});

export const shopsFailed = (errmess) => ({
    type: ActionTypes.SHOPS_FAILED,
    payload: errmess
});

export const addshops = (shop) => async (dispatch) => {
    console.log("ok2");
    const bearer = 'Bearer ' + localStorage.getItem('token');
    dispatch(shopsLoading(true));
    const formData = new FormData();
    console.log(shop);
    formData.append('name', shop.name);
    formData.append('about', shop.about);
    formData.append('banner', shop.image);
    console.log(formData['name']);
    return fetch(baseUrl + 'sellers/shop', {
        method: 'POST',
        headers: { 
            'Authorization': bearer 
        },   
        body: formData
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
        .then(response => response.json())
        .then((response) =>
         {dispatch(shopCreated())
            alert("Shop Created Successfully!")})
        .catch(error => dispatch(shopsFailed(error.message)));
}

export const fetchshops = () => async (dispatch) => {
    console.log("ok1");
    dispatch(shopsLoading(true));

    return fetch(baseUrl + 'sellers/shops')
        .then(response => {
            if (response.ok) {
                console.log("ok");
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
        .then(shops => dispatch(getshops(shops)))
        .catch(error => dispatch(shopsFailed(error.message)));
}

export const fetchshop = (shopid) => async (dispatch) => {
    console.log("ok single shop");
    dispatch(shopsLoading(true));

    return fetch(baseUrl + 'sellers/shops/'+ shopid)
        .then(response => {
            if (response.ok) {
                console.log("okkk Sing");
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
        .then(shop => dispatch(getshop(shop)))
        .catch(error => dispatch(shopsFailed(error.message)));
}

export const updateshops = (shop) => async (dispatch) => {
    console.log("Updating !");
    const bearer = 'Bearer ' + localStorage.getItem('token');
    dispatch(shopsLoading(true));
    const formData = new FormData();
    console.log(shop);
    formData.append('name', shop.name);
    formData.append('about', shop.about);
    formData.append('banner', shop.image);
    console.log(formData['name']);
    return fetch(baseUrl + 'sellers/shops/' + shop.id, {
        method: 'PUT',
        headers: { 
            'Authorization': bearer 
        },   
        body: formData
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
        .then((response) =>
         {dispatch(shopUpdated())
            alert("Shop Updated Successfully!")})
        .catch(error => dispatch(shopsFailed(error.message)));
}