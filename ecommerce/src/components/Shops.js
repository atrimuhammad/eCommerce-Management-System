import React from 'react'
import { fetchshops } from '../actions/shopaction';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,Card, CardImg, CardText, CardBody,
    CardTitle} from 'reactstrap';
    import { Link, useHistory } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import { Loading } from './Loading';



const RenderShop=({shop})=> {
    const slug = shop._id;
    return(
             <Card>
                <CardImg width="100%" height='300 px' object-fit="cover"
                 src={baseUrl + shop.banner} alt={shop.name} />
                    <CardBody>
                        <CardTitle>
                            <h1 className="product_title">{shop.name}</h1></CardTitle>
                        <CardText>
                            <p>Created By:</p>
                            <p className="price">{shop.owner.name}</p>
                            <p>{shop.about}</p>
                            <p><button>Visit Shop</button></p>
                            <Link to={`shops/${slug}`}
                            className="btn-primary room-link">
                                Features
                                </Link>
                            </CardText>
              
              
                    </CardBody>
                </Card>
    );

}

export const Shops = () => {
    
    const shop = useSelector((state)=> state.shop);
    const auth=useSelector((state)=>state.auth);

    if(auth.isAuthenticated){
     if (shop.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{shop.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (shop.shops[0]){
    return (
        <div className="container">
            <div className="row align-items-center"> 
            <div className="col-3">
            <h1 className="d-flex">Active Shops</h1>
            </div>
            <div className="col-3"> 
            <Link to="/addshops" >
                <h2>
                    <span className="fa fa-plus-circle ml-auto"></span>
                    </h2>
                </Link>
                </div>
                </div>
            <div className="row">     
                  {shop.shops.map(single=>{
                      return(
                        <div className="col-12 col-md-5 m-1">
                        <RenderShop key={single._id} shop={single}/>
                        </div>
)                  })}
          </div>
        </div>
        
    )}
    else 
    return(
        <div className="container">
            <div className="row align-items-center"> 
            <div className="col-3">
            <h1 className="d-flex">Active Shops</h1>
            </div>
            <div className="col-3"> 
            <Link to="/addshops" >
                <h2>
                    <span className="fa fa-plus-circle ml-auto"></span>
                    </h2>
                </Link>
                </div>
                </div>
            <div className="row">
                <Loading />
                
        
            </div>

        </div>
    );
    }
    else 
    return(
        <div className="container">
            <h1>
            No Shops Available
            </h1>
        </div>
    )
}
