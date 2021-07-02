import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import {
    Button,Card, CardImg, CardText, CardBody,
    CardTitle,Label,Input,Form,FormGroup} from 'reactstrap'
import { fetchproduct } from '../actions/productaction';
    import {baseUrl} from '../shared/baseUrl';
import { Loading } from './Loading';




const RenderProduct=({product})=> {
    return(
             <Card>
                <CardImg width="100%" height='300 px' object-fit="cover"
                 src={baseUrl + product.imageUrl} alt={product.title} />
                    <CardBody>
                        <CardTitle>
                            <h1 className="product_title">{product.title}</h1></CardTitle>
                        <CardText>
                            <p class="price"> $100</p>
                            <p>{product.description}</p>
                            <p><button className="btn btn-primary"><i class="fa fa-cart-arrow-down fa-2x" aria-hidden="true"></i></button></p>
                            </CardText>
              

                            
                    </CardBody>
                </Card>
    );

}


export const SingleProduct = () => {
    const product = useSelector((state)=> state.product);
    const [type, setType] = useState("");
    //const [password, setPassword] = useState("");
    let {slug}= useParams();
    const dispatch = useDispatch();
    const addtoCart=(event)=>{
        console.log("type :",type)
        dispatch(addtoCart(slug,{type:type}))
        event.preventDefault();
    }
   // const auth=useSelector((state)=>state.auth);
    
    //console.log(product.prod.product.belongs._id)
    //const sim_products=product.products.filter(p=>(p.belongs._id==product.prod.product.belongs._id)[0])

    useEffect(() => {
        console.log("Slug",slug)
        dispatch(fetchproduct(slug));
        // console.log("Name will be :",typeof( shop.shop.name),shop.shop.name);
    },[ product.prod]);

    if (product.prod!=null){
    return (
        
        <div className="container">
            <div className="row mt-20">
                <div className="col-5">
                    <Card>
                    <CardImg width="100%" height='300 px' object-fit="cover"
                 src={baseUrl + product.prod.product.imageUrl} alt={product.prod.product.title} />
                    <CardBody>
                        <CardTitle>
                            <h1 className="product_title">{product.prod.product.title}</h1></CardTitle>

                    </CardBody>
                    </Card>
                </div>
                <div className="col-5">
                    <Card>
                    <CardBody>
                    <CardText>
                            <b>Description:</b>
                            <p>{product.prod.product.description}</p>

                            {product.prod.product.variations.map((value, index) => {
                                return(
                                    <div className='center'>
                                   <div className='row'> <b>Category {index+1}:</b> <p key={index}>{value.title}</p>
                                    <b className='ml-5'>Price :</b> <p key={index}>{value.price}</p></div>
                                   <div className='row'> <b>Sub Category :</b> {value.sub_title.map((sub,ind)=>{
                                       return(<p key={ind} className='ml-2'>{sub}</p>)
                                   }
                                   )}
                                   </div>
                                        </div>
                                     )
                            })}
                        
                            </CardText>
                           
                            {/* <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)} />
                            </FormGroup> */}
                            <Form onSubmit={addtoCart}> 
                            {/* <FormGroup tag="fieldset">
                            {product.prod.product.variations.map((value, index) => {
                                return(
                            <FormGroup check key={index}>
                            <Label check>
                                <Input type="radio" name='radio1'
                                onChange={(e)=>setType(value._id)} />{' '}
                                {value.title}
                            </Label>
                            </FormGroup>
                                   )})}
                            </FormGroup> */}
                            <FormGroup check >
                            <Label check>
                                <Input type="radio" name='radio1'
                                onChange={(e)=>setType(product.prod.product.variations[0]._id)} />{' '}
                                {product.prod.product.variations[0].title}
                            </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Add to cart</Button>
                        </Form>
                    </CardBody>
                    </Card>
                </div>
            
            </div> 
         
            {/* <div className="row"> 
            <h1 className="d-flex justify-content-center my-auto">Other Products by same seller</h1> </div>
            <br></br>
            <div className="row">     
                  {
                  sim_products.map(single=>{
                    //console.log(featured)  
                    return(
                        <div className="col-6 col-md-3 m-1">
                        <RenderProduct key={single._id} product={single}/>
                        </div>
)                  })}
          </div> */}
        
        </div>
        
    )
    }
    else
    return(
        <div className="row">
                <Loading />
            </div>
    )

}
