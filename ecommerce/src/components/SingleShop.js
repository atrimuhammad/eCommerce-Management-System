import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { fetchshop } from '../actions/shopaction';
import {
    Button,Card, CardImg, CardText, CardBody,
    CardTitle, CardImgOverlay} from 'reactstrap'
    import {baseUrl} from '../shared/baseUrl';
import { Loading } from './Loading';
import { fetchShopProducts } from '../actions/productaction';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';


const SingleShop = () => {
    
    const shop = useSelector((state)=> state.shop);
    const product = useSelector((state)=> state.product);

    const auth=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    let {slug}= useParams();

    useEffect(() => {
        console.log("Slug",slug)
        dispatch(fetchshop(slug));
        dispatch(fetchShopProducts(slug));
        // console.log("Name will be :",typeof( shop.shop.name),shop.shop.name);
    }, [dispatch]);

    if (shop.shop!=null){
    return (
        
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <Card>
                    <CardImg width="100%" height='300 px' object-fit="cover"
                 src={baseUrl + shop.shop.banner} alt={shop.shop.name} />
                 
                 <Link className="h-100 d-flex flex-column justify-content-end"
             to={{
                pathname: `/shops/edit/${slug}`,
                }}><span class="fa fa-pencil-square-o fa-3x" aria-hidden="true"/></Link>
                 
                    <CardBody>
                        <CardTitle>
                            <h1 className="product_title">{shop.shop.name}</h1></CardTitle>
                        <CardText>
                            <p>Created By:</p>
                            <p className="price">{shop.shop.owner.name}</p>
                            <p>{shop.shop.about}</p>
                            
                            </CardText>
              
              
                    </CardBody>
                    </Card>
                </div>
                
                <div className="col-6">
                    <Table>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Created On</th>
                    <th>Price</th>
                    <th><Link to={{
                        pathname: '/addproducts',
                        state: {
                            shopId:shop.shop._id
                        }
                        }}  >
                <h2>
                    <span className="fa fa-plus-circle ml-auto"></span>
                    </h2>
                </Link></th>
                    </tr>
                </thead>
                <tbody>
            
        {product.shopProd.map((prod,index)=>{
            const slug = prod._id;
            console.log("Babe :",slug)
            return(
             <tr>
             <th scope="row">{index+1}</th>
             <td>{prod.title}</td>
             <td>{new Date(prod.createdAt).toLocaleString()}</td>
             <td>$100</td>
             
             <td><Link to={`/product/${slug}`}>view</Link></td>
             <td><Link
             to={{
                pathname: `/product/edit/${slug}`,
                state: {
                    shopId:shop.shop._id
                }
                }}><span class="fa fa-pencil-square-o" aria-hidden="true"/></Link></td>
           </tr>
            )
        })}
      </tbody>
                    </Table>
                      </div>
            </div> 
         
        
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

export default SingleShop
