import React, { Component } from 'react';
//import {Text, View } from 'react-native';
import ReactDOM from 'react-dom'

import MyCartBar from './MyCartBar'
import ListOfOrderableProducts from './Tasks/ProductFunctions/ListOfOrderableProducts'

import { login,register } from './UserFunctions'
import {alertMessage} from './alertMessage'
import { getproductInfoOnly } from './Tasks/ProductFunctions/ProductOperation'


//import Login from "./Login"
import '../css/Landing.css'

const initLinks = require('.././initLinks')


class Landing extends Component {

  constructor(){
    super();
    this.state={
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      vpassword: '',
      orderedPcount: 0,
      dispLogin: false,
      errors: {}
    }
  }

  //#######################################################################################
  componentDidMount() {
    this.getOrderedProductcCount()
  }

//#######################################################################################
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  loginResponseMessage(res){
    if(res===null){
      alertMessage("User Doesnt exist, Pease register if you have no account yet.",5000)
    }else if (res===false){
      alertMessage("Incorrect Credentials",2000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      localStorage.setItem('usertoken', res)
      this.props.history.push(initLinks.home)
    }else{}
  }

  onLogin = (e) =>{
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      this.setState({
        isLogIn: true
      })
      this.loginResponseMessage(res)
    })
  }

  checkIfPasswordIsTheSame(pass1,pass2){
    return pass1 === pass2
  }

  initNewUser () {
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      role: 'user'
    }
    return newUser
  }

  registerResponseMessage(res){
    if (res===null) {
      alertMessage("Username already exixst",3000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      alertMessage("Registered",3000)
      this.hideRegister()
    }
  }

  register(){
    const newUser = this.initNewUser()
    register(newUser).then(res => {
      this.registerResponseMessage(res)
      this.setUserInfoNull()
    })
  }

  setUserInfoNull () {
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      vpassword: ''
    })
  }

  onRegister = (e) => {
    e.preventDefault()

    if (this.checkIfPasswordIsTheSame(this.state.password, this.state.vpassword)){
      this.register()
    }else{
    alertMessage("Password does not match",2000)
    }
  }
//########################################################################
  dispLogin = () => {
    var mydiv = document.getElementById('myLoginDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  dispRegister = () => {
    var mydiv = document.getElementById('myRegisterDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  hideLogin = () => {
    var mydiv = document.getElementById('myLoginDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.setUserInfoNull()
  }

  hideRegister = () => {
    var mydiv = document.getElementById('myRegisterDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.setUserInfoNull()
  }
//###########################################################################
setNewOrderedProduct(product){
  const orderedProduct = {
    productId: product.id,
    productName: product.name,
    count: 1,
    price: 0
  }
  return orderedProduct
}
//#######################################################################
storeProductToLocalStorage(product){
  //console.log(res);
  const orderedProduct = this.setNewOrderedProduct(product)
  //console.log(orderedProduct);
  var oldProductData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
  var a,isFound=false;
  for(a=0; a<oldProductData.length; a++){
    if(oldProductData[a].productId===orderedProduct.productId){
      oldProductData[a].count=oldProductData[a].count+1
      isFound=true;
    }else{}
  }
  if(!isFound){
    oldProductData.push(orderedProduct);
  }
  localStorage.setItem('orderedproducts',JSON.stringify(oldProductData));
  this.getOrderedProductcCount()
}

//###########################################################################
  getproductInfoOnlyResponseMessage(res){
    if(res===null){
      alertMessage("Product not found",2000);
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.storeProductToLocalStorage(res)
    }else{}
  }
//########################################################################
handleOrderProducts = (orderedProduct) =>{
  const product = {
    productId: orderedProduct
  }
    getproductInfoOnly(product).then(res => {
        this.getproductInfoOnlyResponseMessage(res)

    })
  }
//#########################################################################
  getOrderedProductcCount = () =>{
    var oldProductData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
    var a,prodCount=0;
    for(a=0; a<oldProductData.length; a++){
      prodCount=prodCount+oldProductData[a].count
    }
      this.setState({
        orderedPcount: prodCount
      })
  }
//###################################################################
handleCartPressed = (e) =>{
  alertMessage("Please log in to view my cart",3000)
  this.dispLogin()
}
//###############################################################
  render() {
    // handle browser back press
    window.addEventListener('popstate',function(event){
      //window.history.forward();
      //window.history.pushState("home","/")
      window.history.pushState(null,null,'/')
    });

    return (
      <div>
        <img src="icons/snake_river2.jpg" alt='' className="home-background"></img>
        <button onClick={this.dispLogin}>Login </button>
        <button onClick={this.dispRegister}>Register </button>
        <br></br>

        <MyCartBar isLogin="false" orderedPcount={this.state.orderedPcount} history={this.props.history} mycartbuttonPressed={this.handleCartPressed}/>
        <ListOfOrderableProducts orderProductList={this.handleOrderProducts}/>


        <div id="myLoginDiv" className="modal">
          <form className="modal-content animate" onSubmit={this.onLogin}>
            <div className="imgcontainer">
              <span onClick={this.hideLogin} className="close"
              title="Close"> &times;
              </span>
              <img src="icons/login.png" alt="Avatar" className="avatar"/>
            </div>
            <div className="container">
              <label>
                <b>Username</b>
              </label>
              <input type="text" className="width-100" placeholder= "Enter Username" name="email" value={this.state.email} onChange={this.onChange} required />
              <label><b>Password</b></label>
              <input type="password" className="width-100" placeholder= "Enter Password" name="password" value={this.state.password} onChange={this.onChange} required />
              <button className="loginbtn" type="submit">Login</button>

            </div>
            <div className="container">
              <button type="button" onClick={this.hideLogin} className="cancelbtn"> Cancel</button>
            </div>
          </form>
        </div>

        <div id="myRegisterDiv" className="modal">
          <form className="modal-content animate" onSubmit={this.onRegister}>
            <div className="imgcontainer">
              <span onClick={this.hideRegister} className="close"
              title="Close"> &times;
              </span>
              <img src="icons/login.png" alt="Avatar" className="avatar"/>
            </div>
            <div className="container">
              <label><b>Firstname</b></label>
              <input className="width-100" type="text" placeholder= "Enter Firstname" name="first_name" value={this.state.first_name} onChange={this.onChange} required/>
              <label><b>Lastname</b></label>
              <input className="width-100" type="text" placeholder= "Enter lastname" name="last_name" value={this.state.last_name} onChange={this.onChange} required/>
              <label><b>Username</b></label>
              <input className="width-100" type="text" placeholder= "Enter Username" name="email" value={this.state.email} onChange={this.onChange} required/>
              <label><b>Password</b></label>
              <input className="width-100" type="password" placeholder= "Enter Password" name="password" value={this.state.password} onChange={this.onChange} required/>
              <label><b>Verify Password</b></label>
              <input className="width-100" type="password" placeholder= "Enter Password Again" name="vpassword" value={this.state.vpassword} onChange={this.onChange} required/>
              <button className="loginbtn" type="submit">Register</button>
            </div>
            <div className="container">
              <button type="button" onClick={this.hideRegister} className="cancelbtn"> Cancel</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export default Landing
