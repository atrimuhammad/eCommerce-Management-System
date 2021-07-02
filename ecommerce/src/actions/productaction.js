import * as ActionTypes from '../constants/types';
import { baseUrl } from '../shared/baseUrl';


  export const productCreated = (products) => {
    return {
        type: ActionTypes.ADD_PRODUCTS,
        products
    }
  }

  export const productUpdated = (products) => {
    return {
        type: ActionTypes.UPDATE_PRODUCT,
        products
    }
  }
  
  export const getProduct = (products) => { //multiple products
    return {
        type: ActionTypes.GET_PRODUCTS,
        payload:products
    }
  }
  
  export const getsingleproduct = (product) => { //single products
    return {
        type: ActionTypes.GET_PRODUCT,
        payload:product
    }
  }
  

  export const getShopProduct = (products) => {
    return {
        type: ActionTypes.GET_SHOP_PRODUCTS,
        payload:products
    }
  }
  

  export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});


  export const fetchProducts = () =>async (dispatch) => {
    console.log("ok1");
    dispatch(productsLoading(true));

    return fetch(baseUrl + 'shop/products')
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
        .then(products => dispatch(getProduct(products)))
        .catch(error => dispatch(productsFailed(error.message)));
}



export const fetchproduct = (prodid) =>async (dispatch) => {
  console.log("ok1", prodid,typeof(prodid));
  dispatch(productsLoading(true));

  return fetch(baseUrl + 'shop/product/'+ prodid)
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
      .then(product => dispatch(getsingleproduct (product)))
      .catch(error => dispatch(productsFailed(error.message)));
}




export const fetchShopProducts = (shopid) =>async (dispatch) => {
  console.log("My Shop Products");
  dispatch(productsLoading(true));

  return fetch(baseUrl + 'shop/products/'+ shopid )
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
      .then(products => dispatch(getShopProduct(products)))
      .catch(error => dispatch(productsFailed(error.message)));
}

export const addproducts = (product) => async (dispatch) => {
  console.log("Adding Shop");
  const bearer = 'Bearer ' + localStorage.getItem('token');
  dispatch(productsLoading(true));
  const formData = new FormData();
  console.log(product);
  formData.append('title', product.name);
  formData.append('description', product.about);
  formData.append('imageUrl', product.image);
  formData.append('belongs', product.shopid);
  formData.append('category', product.category);
  formData.append('var', product.main_var);
  formData.append('subvar', product.sub_var);
  formData.append('price', product.price);
  formData.append('quantity', product.quantity);
  formData.append('available', product.available);
  console.log(formData['title']);
  return fetch(baseUrl + 'shop/product', {
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
      .then(() =>
       {dispatch(productCreated())
          alert("Product Created Successfully!")})
      .catch(error => dispatch(productsFailed(error.message)));
}

export const updateproducts = (product) => async (dispatch) => {
  console.log("Updating product");
  const bearer = 'Bearer ' + localStorage.getItem('token');
  dispatch(productsLoading(true));
  const formData = new FormData();
  console.log(product);
  formData.append('title', product.name);
  formData.append('description', product.about);
  formData.append('imageUrl', product.image);
  formData.append('belongs', product.shopid);
  console.log(formData['title']);
  return fetch(baseUrl + 'shop/products/'+ product.id, {
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
      .then(() =>
       {dispatch(productUpdated())
          alert("Product Updated Successfully!")})
      .catch(error => dispatch(productsFailed(error.message)));
}

