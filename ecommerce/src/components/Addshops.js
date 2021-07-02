import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {Form,FormGroup, FormText,Button, Label,Input } from 'reactstrap';
import { addshops } from '../actions/shopaction';

export const Addshops = () => {
   
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("");
    
    const dispatch =useDispatch()
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
    const addnewShop=(values)=>{
        console.log("here");
     
        console.log(name,image,about);
        
        dispatch(addshops({name:name,about:about,image:image}));
        
        values.preventDefault();
        resetform();
    }

    return (
        <div className="container">
            <div className="row row-content">
                    <div className="col-12">
                        <h3>Add New Shop</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        
        <Form onSubmit={addnewShop}>
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

 //   const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const fileReader = new FileReader();
    //       fileReader.readAsDataURL(file);
    
    //       fileReader.onload = () => {
    //         resolve(fileReader.result);
    //       };
    
    //       fileReader.onerror = (error) => {
    //         reject(error);
    //       };
    //     });
    //   };
