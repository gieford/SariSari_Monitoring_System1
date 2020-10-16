import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

import "../css/Home.css"
import NavbarUser from './NavbarUser'
import NavbarAdmin from './NavbarAdmin'
import NavbarSuperAdmin from './NavbarSuperAdmin'
import NavbarStoreOwner from './NavbarStoreOwner'
import NavbarStoreUser from './NavbarStoreUser'

import MyCartBar from './MyCartBar'
import ListOfOrderableProducts from './Tasks/ProductFunctions/ListOfOrderableProducts'
import MessageBar from './MessageBar'

import { getproductInfoOnly } from './Tasks/ProductFunctions/ProductOperation'

import {alertMessage} from './alertMessage'
import { isJWTExpires } from './Auth/checkJwt'


class Home extends Component {

  constructor() {
    super()
    this.state = {
      orderedPcount: 0,
      errors: {}
    }
  }

  //#######################################################################################
  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
//    localStorage.removeItem('usertoken')
  }
  //#######################################################################################
  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }else{
      this.getOrderedProductcCount()
    }
  }
  //#######################################################################################
  /////#####################################################################################
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
      var oldData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
      var a,prodCount=0;
      for(a=0; a<oldData.length; a++){
        prodCount=prodCount+oldData[a].count
      }
        this.setState({
          orderedPcount: prodCount
        })
    }

  //#######################################################################################

  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }

    const regUserLink = () =>{
      switch(myrole.role){
        case 'user': return ( <NavbarUser /> )
        case 'storeuser': return ( <NavbarStoreUser /> )
        case 'storeowner': return ( <NavbarStoreOwner /> )
        case 'admin': return ( <NavbarAdmin /> )
        case 'superadmin': return ( <NavbarSuperAdmin /> )
        default: return('Your account is disabled')
      }
    }

    return (
          <div>
            <img src="icons/iguana3.jpg" alt='' className="home-background"></img>
            <br/>
            <br/>
            <br/>
            <br/>

            <MyCartBar isLogin="true" orderedPcount={this.state.orderedPcount} history={this.props.history}/>
            <ListOfOrderableProducts orderProductList={this.handleOrderProducts}/>
            <MessageBar />

            {(!isJWTExpires(localStorage.usertoken)) ? regUserLink() : ''}
        </div>
    )
  }
}

export default Home
