import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { fetchOrders } from '../actions/orderAction';

export const OrderHistory = () => {
    const dispatch = useDispatch()
    const order=useSelector(state => state.order)
  
    useEffect(()=>{
        dispatch(fetchOrders());
        console.log("up")
    },[order.orders])
    return (
        <div className='container'>
            <div className="col-12">
                    <Table>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Payment Method</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Total Items</th>
                    <th>City</th>
                    <th>Delivery Address</th>
                    
                    </tr>
                </thead>
                <tbody>
            
        {order.order.map((order,index)=>{
            
            return(
             <tr>
             <th scope="row">{index+1}</th>
             <td>{order.payment_method}</td>
             <td>{new Date(order.createdAt).toLocaleString()}</td>
             <td>{order.status}</td>
             <td>{order.price}</td>
             <td>{order.items.length}</td>
             <td>{order.city}</td>
             <td>{order.delivery_address}</td>
            
           </tr>
            )
        })}
      </tbody>
                    </Table>
                      </div>
        </div>
    )
}
