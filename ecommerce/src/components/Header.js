import React, { Component,useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { changeTypeUser, loginUser, logoutUser, signupUser } from '../actions/authaction';

const Header = () => {
    
    const dispatch = useDispatch();
    const[isNavOpen,setNav]=useState(false);
    const[isModalOpen,setModal]=useState(false);
    const[isSignOpen,setSignup]=useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setname] = useState("");
    const [remember, setRemember] = useState(false);    
    
    const auth = useSelector(state => state.auth)

    const toggleNav=()=> {
        setNav(!isNavOpen);
    }

    const toggleModal = ()=> {
        setModal(!isModalOpen);
    }
    const toggleSignup=()=>{
        setModal(!isModalOpen);
        setSignup(!isSignOpen);
    }
    const handleLogin=(event)=> {
        toggleModal();
        //loginUser();
        dispatch(loginUser({email:username, password:password}))
        event.preventDefault();

    }
    const handleSignUp=(e)=>{
        toggleSignup();
        dispatch(signupUser({email:email, password:password,name:name}))
        e.preventDefault();
    }

    const handleLogout=()=> {
        dispatch(logoutUser());
    }

    const changeType=()=> {
        dispatch(changeTypeUser(auth.loggedas))
    }
    
    return (
        <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={toggleNav} />
                        <NavbarBrand className="mr-auto" href="/products">
                            <img src="/logo192.png" height="30" width="41"
                                alt="One-for-All" />
                        </NavbarBrand>
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar>
                            
                                <NavItem>
                                    <NavLink className="nav-link" to="/products"  >
                                        <span className="fa fa-plus fa-lg"></span> Products
                                    </NavLink>
                                </NavItem>
                                
                            {auth.isAuthenticated ?
                            
                                    <NavItem>
                                    <NavLink className="nav-link" to="/shops">
                                        <span className="fa fa-shopping-basket fa-lg"></span> My Shops
                                    </NavLink>
                                </NavItem>
                                                : null
                                            }
                                
                                {auth.isAuthenticated ?
                                
                                    <NavItem>
                                        <NavLink className="nav-link" to="/cart">
                                            <span className="fa fa fa-shopping-cart fa-lg"></span> Cart
                                        </NavLink>
                                    </NavItem>
                                    
                                    
                                                : null
                                            }
                                {auth.isAuthenticated ?
                                <NavItem>
                                <NavLink className="nav-link" to="/orders/order-history">
                                    <span className="fa fa fa-shopping-cart fa-lg"></span> Order History
                                </NavLink>
                            </NavItem>
                                
                                
                                            : null
                                        }
                                
                                
                            </Nav>
                             <Nav className="ml-auto" navbar>
                             {auth.isAuthenticated ?
                                        <Button outline onClick={changeType}>
                                            <span className="fa fa-hand-pointer-o fa-lg"></span> Switch
                                        
                                   </Button>
                                                : null
                                            }
                             {auth.isAuthenticated ?
                             

                             <NavItem>
                                {auth.loggedas =='Buyer'?
                                    <NavItem>
                                        <NavLink className="nav-link" to="#">
                                            <span className="fa fa fa-user-o fa-lg"></span>Logged as Buyer
                                        </NavLink>
                                    </NavItem> :
                                    <NavItem>
                                    <NavLink className="nav-link" to="#">
                                        <span className="fa fa fa-user-o fa-lg"></span> Logged as Seller
                                    </NavLink>
                                    </NavItem>
                                }
                                </NavItem>       
                                                : null
                                                
                                           }
                                <NavItem>
                                    { !auth.isAuthenticated ?
                                        <Button outline onClick={toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{auth.user.name}</div>
                                        <Button outline onClick={handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-8">
                                <h1>Where Buyer's met Sellers</h1>
                                <p>A complete Shopping solution for both sellers and buyers</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    value={remember}
                                    onChange={(e)=>setRemember(e.target.value)}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                            <Button className="ml-4" outline onClick={toggleSignup} color="danger">Sign Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={isSignOpen} toggle={toggleSignup}>
                    <ModalHeader toggle={toggleSignup}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSignUp}>
                        <FormGroup>
                                <Label htmlFor="name">Full name</Label>
                                <Input type="text" id="name" name="name"
                                    value={name}
                                    onChange={(e)=>setname(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}  />
                            </FormGroup>
                    
                            <Button type="submit" value="submit" color="primary">Confirm Sign Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
    )
}

export default Header

