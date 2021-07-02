import React,{ useState,useEffect} from 'react'
import {fetchProducts} from '../actions/productaction'
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,Card, CardImg, CardText, CardBody,
    CardTitle} from 'reactstrap';
    import { useHistory } from 'react-router-dom';
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

export const Products = () => {

    let history=useHistory();
    const dispatch=useDispatch();

    const [searchValue, setvalue] = useState("");
    const product = useSelector((state)=> state.product);
    
    
    let featured=product.products;
        useEffect(()=>{
            if(product.featured[0]!=null){
//                console.log("inside",product.featured)

                featured=product.featured;
  //              console.log("H",featured);
            }
        },[product.featured])

//    const getproducts=()=>{
//         dispatch(fetchProducts());
//         console.log("haseeb",product.products.products)
//         history.push("/");
//     }
    
    if (product.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                    
            
                </div>
            </div>
        );
    }
    else if (product.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{product.errMess}</h4>
                </div>
            </div>
        );
    }
    else{
        
        const onChangeField=(e)=>{
            setvalue(e)
            console.log("Change Field : ",e,e.toLowerCase(),e.toUpperCase())
            // const countries = ['Norway', 'Sweden',  'Denmark', 'New Zealand'];
            product.featured=product.products;
            product.featured = featured.filter((prod) => prod.title.startsWith(e)||prod.title.startsWith(e.toLowerCase())
                ||prod.title.startsWith(e.toUpperCase()));
            console.log(product.featured);
            featured=product.featured;
        }
    return (
        <div className="container">
            <div className="row">
            <div className="main">
  
  <div className="form-group has-search">
    <span className="fa fa-search form-control-feedback"></span>
    <input type="text" className="form-control" placeholder="Search"
    value={searchValue}
    onChange={(e)=>{onChangeField(e.target.value);}}/>
  </div>
  
  

</div>
            </div>

            <div className="row"> 
            <h1 className="d-flex justify-content-center my-auto">Featured Products</h1> </div>
            <br></br>
            <div className="row">     
                  {
                  product.featured.map(single=>{
                    //console.log(featured)  
                    return(
                        <div className="col-12 col-md-5 m-1">
                        <RenderProduct key={single._id} product={single}/>
                        </div>
)                  })}
          </div>
        </div>
        
    )}
    
}


