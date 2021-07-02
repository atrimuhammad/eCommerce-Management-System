import * as ActionTypes from '../constants/types';
import { baseUrl } from '../shared/baseUrl';
import { deleteCart } from './authaction';



export const OrdersFailed = (errmess) => ({
    type: ActionTypes.ORDER_FAILURE,
    payload: errmess
});
export const OrderCreated = (errmess) => ({
    type: ActionTypes.ADD_ORDER
    
});

export const getOrder = (orders) => { //multiple products
    return {
        type: ActionTypes.GET_ORDER,
        payload:orders
    }
  }
  

  export const fetchOrders = () =>async (dispatch) => {
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'orders/order-history',{
        headers: {
            'Authorization': bearer
        },
    })
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
        .then(orders => dispatch(getOrder(orders)))
        .catch(error => dispatch(OrdersFailed(error.message)));
}



export const addorders = (order) => async (dispatch) => {
  console.log("Adding Order");
  const bearer = 'Bearer ' + localStorage.getItem('token');
 
  return fetch(baseUrl + 'orders/create-order', {
      method: 'POST',
  headers: { 
      'Content-Type':'application/json' ,
      'Authorization': bearer 
  },
  body: JSON.stringify(order)
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
      .then((response) =>
       {dispatch(OrderCreated())
        console.log(response.json)
          alert("Order Created Successfully!")
          dispatch(deleteCart())}
          )
      .catch(error => dispatch(OrdersFailed(error.message)));
}

// export const updateproducts = (product) => async (dispatch) => {
//   console.log("Updating product");
//   const bearer = 'Bearer ' + localStorage.getItem('token');
//   dispatch(productsLoading(true));
//   const formData = new FormData();
//   console.log(product);
//   formData.append('title', product.name);
//   formData.append('description', product.about);
//   formData.append('imageUrl', product.image);
//   formData.append('belongs', product.shopid);
//   console.log(formData['title']);
//   return fetch(baseUrl + 'shop/products/'+ product.id, {
//       method: 'PUT',
//       headers: { 
//           'Authorization': bearer 
//       },   
//       body: formData
//   })
//   .then(response => {
//       if (response.ok) {
//           return response;
//       } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//       }
//       },
//       error => {
//           throw error;
//       })
//   .then(response => response.json())
//       .then(() =>
//        {dispatch(productUpdated())
//           alert("Product Updated Successfully!")})
//       .catch(error => dispatch(productsFailed(error.message)));
// }

