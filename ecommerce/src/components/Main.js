import React, { useEffect } from 'react'
import {Products} from './Products'
import {BrowserRouter as Router, Switch,Route, Redirect  } from "react-router-dom";
import Header from './Header';
import  {Home}   from './Home'
import { Shops } from './Shops';
import { Addshops } from './Addshops';
import { fetchshops } from '../actions/shopaction';
import { fetchProducts } from '../actions/productaction';
import { useDispatch } from 'react-redux';
import SingleShop from './SingleShop';
import { AddProducts } from './AddProducts';
import { SingleProduct } from './SingleProduct';
import { Editproduct } from './Editproduct';
import { EditShop } from './EditShop';
import { Cart } from './Cart';
import {CreateOrder} from './CreateOrder'
import { fetchCart } from '../actions/authaction';
import { OrderHistory } from './OrderHistory';
export const Main = () => {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());
        dispatch(fetchshops());
        dispatch(fetchCart())
    })
    return (
        <div>
            <Header/>
            <Switch>
        <Route exact path="/home" component={Home}/>
         <Route exact path="/products" component={Products}/>
         <Route exact path="/shops" component={Shops}/>
         <Route exact path="/addshops" component={Addshops}/>
         <Route exact path="/cart" component={Cart}/>
         <Route exact path="/addproducts" component={AddProducts}/>
         <Route exact path="/shops/:slug" component={SingleShop} />
         <Route exact path="/shops/edit/:slug" component={EditShop} />
         <Route exact path="/product/:slug" component={SingleProduct} />
         <Route exact path="/product/edit/:slug" component={Editproduct} />
         <Route exact path="/orders/create-order" component={CreateOrder} />
         <Route exact path="/orders/order-history" component={OrderHistory} />
         {/* <Route exact path="/contacts/add" component={AddContact}/>
         <Route exact path="/contacts/edit/:id" component={Editcontact}/>
          */}
     <Redirect to="/home" />
         </Switch> 
        </div>
    )
}
