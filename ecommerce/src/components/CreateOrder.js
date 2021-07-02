import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Form,FormGroup, FormText,Button, Label,Input } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addorders } from '../actions/orderAction';




export const CreateOrder = () => {
    
    const auth = useSelector(state => state.auth)
    const [paymentMethod, setMethod] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [code, setCode] = useState("");
    const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
    const dispatch =useDispatch()
    
    const resetform=()=>{
        setMethod("");
        setAddress("");
        setCity("");
        setCode("");
    }
    const addnewOrder=(values)=>{
        console.log("here");
        console.log(values,paymentMethod)
        //console.log(name,image,about);
        dispatch(addorders({paymethod:paymentMethod , address:address ,city: city, code: code}))
        //dispatch(addproducts({name:name,about:about,image:image,shopid:props.location.state.shopId}));
        
        values.preventDefault();
        resetform();
    }
    const handleSelect=(e)=>{
        console.log(e);
        setMethod(e)
      }
    return (
        <div className="container">
            <div className="row row-content">
                    <div className="col-6">
                        <h3>Create Order</h3>
                    </div>
                    
                    <div className='col-6'>
                        <h2>Total Price :</h2>
                        <h5>{auth.cart.price}</h5>
                    </div>
                    
                    
                    <div className="col-12 col-md-6">

                        
        <Form onSubmit={addnewOrder}>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input type="name" name="address" id="address" autoComplete={'' + Math.random()}
        placeholder="Enter your address"
        value={address}
        onChange={(e)=>setAddress(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input type="city" name="city" id="city" 
        value={city}
        placeholder="Enter your City"
        onChange={(e)=>setCity(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="code">Zip Code</Label>
        <Input type="code" name="code" id="code" 
        value={code}
        placeholder="Enter your ZipCode"
        onChange={(e)=>setCode(e.target.value)} />
      </FormGroup>
      {/* <FormGroup>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} alignRight
     
      onSelect={handleSelect}>
      <DropdownToggle caret>
        Payment Method
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Methods</DropdownItem>
        <DropdownItem >Bank Transfer</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Cash On Delivery</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>

      </FormGroup> */}
      <FormGroup>
        <Label for="PaymentMethod">Payment method</Label>
        <Input type="select" name="PaymentMethod" id="PaymentMethod"
        onChange={(e)=>setMethod(e.target.value)}>
            <option>Select Method</option>
          <option>Bank Transfer</option>
          <option>Cash On Delivery</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="code"></Label>
       
      </FormGroup>
      <FormGroup></FormGroup>
      <Button>Submit</Button>
    </Form>
                    </div>
        
       
                </div>
                </div>
       
    )
}
