import React, { useState } from 'react';
import { addproducts } from '../actions/productaction';
import { useDispatch } from 'react-redux';

import {Form,FormGroup,Button, Label,Input } from 'reactstrap';

export const AddProducts = (props) => {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [variation, setVariation] = useState("");
    const [sub_car, setsub_car] = useState("");
    const [price, setprice] = useState("");
    const [quantity, setquantity] = useState("");

    const dispatch =useDispatch()
    const uploadImage = async (e) => {
        const file = e.files[0];
        setImage(file);
      };
    
   

    const resetform=()=>{
        setName("");
        setAbout("");
        setImage("");
        setCategory("");
        setsub_car("");
        setprice("");
        setquantity("");

    }
    const addnewProduct=(values)=>{
        console.log("here");
        let a=sub_car.split(" ")
        console.log(name,image,about,a);
        
        dispatch(addproducts({name:name,about:about,image:image,shopid:props.location.state.shopId,category:category,price:price,quantity:quantity,main_var:variation,sub_var:a,available:true,}));
        
        values.preventDefault();
        resetform();
    }

    return (
        <div className="container">
            <div className="row row-content">
                    <div className="col-12">
                        <h3>Add New Product</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        
        <Form onSubmit={addnewProduct}>
      <FormGroup>
        <Label for="shopname">Product Name</Label>
        <Input type="name" name="email" id="shopname" autoComplete={'' + Math.random()}
        placeholder="New Product name"
        value={name}
        onChange={(e)=>setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Product Image</Label>
        <Input type="file" name="file" id="exampleFile" autoComplete="Off"
        //value={image}
        onChange={(e)=>uploadImage(e.target)} />
      </FormGroup>
      <FormGroup>
        <Label for="about">Description</Label>
        <Input type="textarea" name="about" id="about" 
        value={about}
        onChange={(e)=>setAbout(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="about">Category</Label>
        <Input type="name" name="category" id="category" 
        placeholder="Enter Product Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="variation">Variation</Label>
        <Input type="name" name="variation" id="variation" 
        placeholder="Enter Product variation"
        value={variation}
        onChange={(e)=>setVariation(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="sub_car">Sub Categories</Label>
        <Input type="name" name="sub_car" id="sub_car" 
        placeholder="Enter Product Sub Categories"
        value={sub_car}
        onChange={(e)=>setsub_car(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input type="price" name="price" id="price" 
        placeholder="Enter Product Price"
        value={price}
        onChange={(e)=>setprice(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="quantity" name="quantity" id="quantity" 
        placeholder="Enter Product quantity"
        value={quantity}
        onChange={(e)=>setquantity(e.target.value)} />
      </FormGroup>
      <FormGroup></FormGroup>
      <Button>Submit</Button>
    </Form>
                    </div>
                </div>
        </div>
    )
}
