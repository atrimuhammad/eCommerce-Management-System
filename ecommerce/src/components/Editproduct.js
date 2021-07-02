import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { addproducts, fetchproduct, updateproducts } from '../actions/productaction';
import { useDispatch, useSelector } from 'react-redux';

import {Form,FormGroup, FormText,Button, Label,Input } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';
export const Editproduct = (props) => {

    let slug=useParams();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState(null);
    
    const product = useSelector((state)=> state.product);
    const dispatch =useDispatch()
    
    useEffect(()=>{
        console.log("My id ", slug.slug)
        dispatch(fetchproduct(slug.slug));

        if (product.prod!=null){
            console.log("inside")
            setName(product.prod.product.title);
            
            setAbout(product.prod.product.description);
            setImage(product.prod.product.imageUrl);        
        }
        else{
            console.log("Babbbbe")
        }
       // dispatch(getContact(id));
        
    },[dispatch])
    const uploadImage = async (e) => {
        const file = e.files[0];
        setImage(file);
      };
    
   

    const resetform=()=>{
        setName("");
        setAbout("");
        setImage("");

    }
    const UpdateProduct=(values)=>{
        console.log("here");
     
        console.log(name,image,about);
        
        dispatch(updateproducts({name:name,about:about,image:image,shopid:props.location.state.shopId,id:product.prod.product._id}));
        
        values.preventDefault();
        resetform();
    }
    if (product.prod!=null){
    return (
        <div className="container">
            <div className="row row-content">
                    <div className="col-12">
                        <h3>Update Product</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        
        <Form onSubmit={UpdateProduct}>
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
        {/* <img src={baseUrl + product.prod.product.imageUrl} width="100%" height='300 px'/> */}
      </FormGroup>
      <FormGroup>
        <Label for="about">Description</Label>
        <Input type="textarea" name="about" id="about" 
        value={about}
        onChange={(e)=>setAbout(e.target.value)} />
      </FormGroup>
      <FormGroup></FormGroup>
      <Button className="btn-danger">Update</Button>
    </Form>
                    </div>
                </div>
        </div>
    )
    }
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
