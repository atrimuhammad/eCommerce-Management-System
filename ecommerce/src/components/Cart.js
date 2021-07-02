import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading';
import { Link} from 'react-router-dom';
import {
    Button,Card, CardImg, CardText, CardBody,
    CardTitle,
    CardHeader,
    CardFooter,
    CardSubtitle} from 'reactstrap';
import { addtoCart, fetchCart, removefromCart } from '../actions/authaction';
import { baseUrl } from '../shared/baseUrl';

export const Cart = () => {
    
    const auth = useSelector(state => state.auth)
    const dispatch=useDispatch()

    const addCart=(id,type)=>{
        dispatch(addtoCart(id,{type:type}))
    }
    const removeCart=(id,type)=>{
        dispatch(removefromCart(id,{type:type}))
    }
    
    useEffect(()=>{
        dispatch(fetchCart());
        console.log("up")
    },[auth.cartUpdated])

    if(auth.cart.cart!=null)
    return (
        <div className="container">
            
            {auth.cart.cart.map((prod)=>{
                console.log("single",prod)
                return(
                    <div className="row">
                <div className="col-4 m-1">                
                <Card>
                    <CardImg  width="100%" object-fit="cover"
                 src={baseUrl + prod.productId.imageUrl} alt={prod.productId.title} />
                </Card>
                </div>
                <div className="col-4">
                
                <Card className="mt-2">
                <CardHeader>{prod.productId.title}</CardHeader>
                
                <CardBody>
                <CardTitle><b>Category : </b> {prod.variation.title}</CardTitle>
                <CardSubtitle tag="h6">Quantity:</CardSubtitle>
                <div className="row">
                    <div className="col-4">
                    <Button onClick={()=>addCart(prod.productId._id,prod.variation._id)}><span class="fa fa-plus" aria-hidden="true"/></Button>
                
                    </div>
                    <div className="col-4">
                    <CardText className="m-1">{prod.quantity}</CardText>
                
                    </div>
                    <div className="col-4">
                    <Button onClick={()=>removeCart(prod.productId._id,prod.variation._id)}><span class="fa fa-minus" aria-hidden="true"/></Button>
                
                    </div>
                </div>
                </CardBody>
                <CardFooter><b>Price :</b> {prod.productId._id,prod.variation.price}</CardFooter>
            </Card>    
                </div>
            </div>
                )
            })}
            <div className="row">
            <div className="col-3 m-4">
            {auth.cart.price == 0 ? 
            <h4>Cart is Empty</h4>
                
                    :
                    null}
            </div>
            {auth.cart.price>0?
            <div className='m-4 col-4'>
           
            <h2>Total Price :</h2>
            <h5>{auth.cart.price}</h5>
        </div>: null}
            
            <div className='m-4 col-3'>
                {auth.cart.price>0 ? 
                <Link to='orders/create-order'
                className="btn-primary room-link">
                    <Button className="btn-lg btn-primary">Proceed to payment</Button>
                    </Link>
                    :
                    null}
                
            </div>
            </div>
        </div>
    )
    else
    return(
        <div className="container">
        <div className="row">
                <div className="col d-flex justify-content-center">
                <Loading />
                </div>
            </div>
            </div>
    )
}
