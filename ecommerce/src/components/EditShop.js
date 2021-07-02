import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Form,FormGroup, FormText,Button, Label,Input } from 'reactstrap';
import {fetchshop, updateshops } from '../actions/shopaction';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';
export const EditShop = () => {
    
    let slug=useParams();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("");
    
    const shop = useSelector((state)=> state.shop);
    const dispatch =useDispatch()
    
    useEffect(()=>{
        console.log("My Shop id ", slug.slug)
        dispatch(fetchshop(slug.slug));
        
        if (shop.shop!=null){
            console.log("inside Shop")
            setName(shop.shop.name);
            
            setAbout(shop.shop.about);
            setImage(shop.shop.banner);        
        }
        else{
            console.log("Shop Babe")
        }
       
    },[dispatch])

    const uploadImage = async (e) => {
        const file = e.files[0];
        console.log("File",file)
        //const base64 = await convertBase64(file);
        setImage(file);
      };
    
   

    const resetform=()=>{
        setName("");
        setAbout("");
        setImage("");

    }
    const UpdateShop=(values)=>{
        console.log("here");
     
        console.log(name,image,about);
        
        dispatch(updateshops({name:name,about:about,image:image,id:shop.shop._id}));
        values.preventDefault();
        resetform();
    }

    if (shop.shop!=null){
    return (
        <div className="container">
            <div className="row row-content">
                    <div className="col-12">
                        <h3>Update Shop</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        
        <Form onSubmit={UpdateShop}>
      <FormGroup>
        <Label for="shopname">Shop Name</Label>
        <Input type="name" name="email" id="shopname" autoComplete={'' + Math.random()}
        placeholder="Your Shop name"
        value={name}
        onChange={(e)=>setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Shop Banner</Label>
        <Input type="file" name="file" id="exampleFile" autoComplete="Off"
        //value={image}
        onChange={(e)=>uploadImage(e.target)} />
        {/* <img src={baseUrl + shop.shop.banner} width="100%" height='300 px'/> */}
      </FormGroup>
      <FormGroup>
        <Label for="about">About Shop</Label>
        <Input type="textarea" name="about" id="about" 
        value={about}
        onChange={(e)=>setAbout(e.target.value)} />
      </FormGroup>
      <FormGroup></FormGroup>
      <Button>Submit</Button>
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
