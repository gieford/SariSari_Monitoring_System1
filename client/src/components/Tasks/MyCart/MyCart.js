import React, { Component } from 'react'
//import { register,getAllProducts,getProductInfos,deleteProduct,updateProduct,getSearchProducts } from './ProductOperation'

import ReactDOM from 'react-dom'

import MyOrder from './MyOrder'


import jwt_decode from 'jwt-decode'

import { getStoreProductInfosAndDescription,getstoreproductlist2 } from '../ProductFunctions/ProductOperation'

import { getAllEDStores } from '../Stores/StoreFunctions'
import { orderCreate,orderProductsCreate,getAllOrderData,getAllOrderProductData,orderUpdateStat } from '../Order/OrderFunctions'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm,/*mergeSort*/ } from '../../Algorithms/sortAlgo'

import '../../../css/MyCart.css'


class MyCart extends Component {
  constructor() {
    super()
    this.state = {
      orderlist: [],
      orderedProductList: [],
      storelists: [],
      storeproductlists: [],
      orderDatalist: [],
      orderIndDatalist: [],
      orderedPcount: 0,
      orderedPTotprice: 0,
      ordertoStoreId: '',
      fullName: '',
      address: '',
      contactnum: '',
      errors: {}
    }

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  //#######################################################################################

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    localStorage.removeItem('orderedproducts')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }
  //#########################################################################################


  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
        this.logOut()
    }else{

      this.getAllProductsOrdered()
      var orderedProds= JSON.parse(localStorage.getItem('orderedproducts')) || [];

      if(orderedProds.length!==0){
        this.dispCartDiv()
        this.setState({ orderedPTotprice: 0})
        this.setState({ ordertoStoreId: -1})
      }else{
        this.hideCartDiv()
      }
    }
  }

//#############################################
  getAllStoreProducts(mystore){
    const store={
      storeId: mystore.storeId
    }
    getstoreproductlist2(store).then(res => {
      this.setState({
        storeproductlists: [...res]
      })
    })
  }
//########################################################
  getAllOrderData(){
    const user={
      userId: jwt_decode(localStorage.usertoken).id
    }
    getAllOrderData(user).then(res => {
      if(res.length!==0){
        this.setState({
          orderDatalist: sortAlgorithm([...res],"date","desc")
        })
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }

    })
  }
//#################################################################
  getAllStores(){
      const store = {
        isdisabled: 'false'
      }
      getAllEDStores(store).then(res => {
      if(res===null){
        alertMessage("No Stores found",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
        this.setState({
          storelists: sortAlgorithm([...res],"name","asc")
        })
      }

    })
  }
//############################################
getIndStoreProductPrice(b,myorderedProd,store,product){   //asynchronous function
  var myprice=0;
  return getStoreProductInfosAndDescription(store,product).then(res => {    //join
        if(res===null){
          myprice=0;
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else if(res!==undefined){
          myprice=res.storeproduct.price
        }else{myprice=0}

        myorderedProd[b].price=myprice
        this.setState({ orderedPTotprice: this.state.orderedPTotprice+(myorderedProd[b].price*myorderedProd[b].count) })

        localStorage.setItem('orderedproducts',JSON.stringify(myorderedProd));
        this.setState({ orderedProductList: [...myorderedProd] })


        return myprice;
      })
  }
//####################################################
  async loopListofPrice(store,myorderedProd){
    var a;
    for(a=0; a<myorderedProd.length; a++){   //remove items if count ==0
      const product = {
        productId: myorderedProd[a].productId
      }
      const b=a;
      this.getIndStoreProductPrice(b,myorderedProd,store,product).then((result) => {
        //  myorderedProd[b].price=result
      })

//    myorderedProd[b].price=(myorderedProd[b].productId)+store.storeId
    }
    return myorderedProd
  }

//##################################
  getStoreProductsPrice = (e) =>{
    e.preventDefault()
    this.setState({ orderedPTotprice: 0})

    var orderedProd1= JSON.parse(localStorage.getItem('orderedproducts')) || [];
    if(e.target.value!==-1){
      this.setState({ ordertoStoreId: e.target.value })
      const store={
        storeId: e.target.value
      }
      this.loopListofPrice(store,orderedProd1).then((result)=>{
//        console.log(result);
        //localStorage.setItem('orderedproducts',JSON.stringify(result));
        //this.setState({ orderedProductList: [...result] })
      })

    }else{}
  }

//#########################################################################################

  getAllProductsOrdered = () => {
    var orderedProds= JSON.parse(localStorage.getItem('orderedproducts')) || [];
    var a;
    for(a=0; a<orderedProds.length; a++){   //remove items if count ==0
      if(orderedProds[a].count===0){
        orderedProds.splice(a,1);
      }else{
        orderedProds[a].price=0;
      }

      localStorage.setItem('orderedproducts',JSON.stringify(orderedProds));
      this.setState({
        orderedProductList: [...orderedProds]
      })

    }


    this.getTotalProdCount(orderedProds)
    this.getTotalProdPrice(orderedProds)
  }

  //####################################
  getTotalProdCount(orderedProds){
    var a,prodCount=0;
    for(a=0; a<orderedProds.length; a++){
      prodCount=prodCount+orderedProds[a].count
    }
      this.setState({
        orderedPcount: prodCount
      })

  }
  //####################################
  getTotalProdPrice(orderedProds){
    var a,prodPrice=0;
    for(a=0; a<orderedProds.length; a++){
      prodPrice=prodPrice+(orderedProds[a].count*orderedProds[a].price)
    }
    this.setState({ orderedPTotprice: prodPrice})
  }

//####################################################################################
  reduceProductQ =(e)=>{
    e.preventDefault()
    const orderedProduct = {
      productId: e.target.id
    }

    var oldData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
    var a;
    for(a=0; a<oldData.length; a++){
      if(String(oldData[a].productId)===orderedProduct.productId && oldData[a].count>0){
        oldData[a].count=oldData[a].count-1
      }else{}
    }
    this.setState({ orderedProductList: [...oldData] })
    localStorage.setItem('orderedproducts',JSON.stringify(oldData));
    this.getAllProductsOrdered()
    this.getTotalProdCount(oldData)
    this.getTotalProdPrice(oldData)

  }
//####################################################################################
addProductQ =(e)=>{
  e.preventDefault()

  const orderedProduct = {
    productId: e.target.id
  }
  var oldData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
  var a;
  for(a=0; a<oldData.length; a++){
    if(String(oldData[a].productId)===orderedProduct.productId){
      oldData[a].count=oldData[a].count+1
    }else{}
  }
  this.setState({ orderedProductList: [...oldData] })
  localStorage.setItem('orderedproducts',JSON.stringify(oldData));
  this.getTotalProdCount(oldData)
  this.getTotalProdPrice(oldData)
}
//####################################################################################
removeProductQ =(e)=>{
  e.preventDefault()
  var oldData= JSON.parse(localStorage.getItem('orderedproducts')) || [];
  var a;
  for(a=0; a<oldData.length; a++){
    if(String(oldData[a].productId)===e.target.id){
      oldData[a].count=0
    }else{}
  }
  this.setState({ orderedProductList: [...oldData] })
  localStorage.setItem('orderedproducts',JSON.stringify(oldData));
  this.getAllProductsOrdered()
  this.getTotalProdCount(oldData)
  this.getTotalProdPrice(oldData)

}
//#############################################################################
//####################################################################################
removeAllProductQ =(e)=>{
  e.preventDefault()
  this.setState({ orderedProductList: [] })
  this.setState({ orderedPTotprice: 0})
  this.setState({ orderedPcount: 0 })

  localStorage.removeItem('orderedproducts')
//  this.getAllProductsOrdered()
}

orderProductQ = (e)=>{
  var orderedProds= JSON.parse(localStorage.getItem('orderedproducts')) || [];
  if(orderedProds.length===0){
    alertMessage("Please add some products to order",3000)
  }else if (this.state.ordertoStoreId===-1){
    alertMessage("Please specify Store",3000)
    var mydiv = document.getElementById('storeinput');
    ReactDOM.findDOMNode(mydiv).focus();
  }else{
    this.dispaddInfoDiv()
  }
/*
  localStorage.setItem('orderedproducts',JSON.stringify(orderedProds));
  this.setState({
    orderedProductList: [...orderedProds]
  })
*/
}

onCreateOrderFinal = (e) =>{
  e.preventDefault()
  const newOrder = {
    storeId: this.state.ordertoStoreId,
    userId: jwt_decode(localStorage.usertoken).id,
    fullName: this.state.fullName,
    address: this.state.address,
    contact: this.state.contactnum,
    status: 'pending',
    totalprice: this.state.orderedPTotprice
  }
  orderCreate(newOrder).then(resOrderId => {
    if(resOrderId!==undefined){
      var orderedProds= JSON.parse(localStorage.getItem('orderedproducts')) || [];

      var a;
      for(a=0; a<orderedProds.length; a++){
          const orderedP = {
            orderId: resOrderId,
            storeId: this.state.ordertoStoreId,
            productId: orderedProds[a].productId,
            price: orderedProds[a].price,
            count: orderedProds[a].count,
            isAvailable: (orderedProds[a].price===0)?'false':'true'
          }
        orderProductsCreate(orderedP).then(res=>{
        })
      }
      localStorage.removeItem('orderedproducts')
      this.setState({
        storeproductlists: [],
        orderedProductList: [],
        orderedPcount: 0,
        orderedPTotprice: 0
      })
      alertMessage("Successfully Ordered. Wait for your order",5000)
      this.hideaddInfoDiv()
      this.hideCartDiv()
    }
  })
}

onCancelMyOrder = (e) =>{
  e.preventDefault()
  const orderData={
    orderId: e.target.id,
    status: 'canceled',
    userId: jwt_decode(localStorage.usertoken).id,
    token: localStorage.usertoken,
    }
  orderUpdateStat(orderData).then(res=>{
    if(res===false){
      alertMessage("You have no rights to cancel orders",5000)
    }else if(res===null){
      alertMessage("Order not found. ",5000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.getAllOrderData()
    }else{}
//    console.log(res);
  })
}


//####################################################################################
dispaddInfoDiv = () => {
  var mydiv = document.getElementById('addInfoDiv');
  ReactDOM.findDOMNode(mydiv).style.display='block';
}

hideaddInfoDiv = () => {
  var mydiv = document.getElementById('addInfoDiv');
  ReactDOM.findDOMNode(mydiv).style.display='none';
//    this.props.dispLogin=false;
  this.setState({
    fullName: '',
    address: '',
    contactnum: ''
  })
}
//####################################################################################
displistOrderProductsDiv = () => {
  var mydiv = document.getElementById('listoOrderProductsDiv');
  ReactDOM.findDOMNode(mydiv).style.display='block';
}

hidelistOrderProductsDiv = () => {
  var mydiv = document.getElementById('listoOrderProductsDiv');
  ReactDOM.findDOMNode(mydiv).style.display='none';
}
//#################################################################################
  dispCartDiv = () => {
    var mydiv = document.getElementById('myCartDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
    var mydiv2 = document.getElementById('myOrderDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='none';
    this.getAllProductsOrdered()
    this.getAllStores()
  }
  //#########################################################################################

  hideCartDiv = () => {
    var mydiv = document.getElementById('myCartDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    var mydiv2 = document.getElementById('myOrderDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='block';
    this.getAllOrderData()
  }

//############################################################################
  listorderMouseDown = (e) =>{
    e.preventDefault()
//    console.log(e.target.id);
    const orderData={
      orderId: e.target.id
    }
    getAllOrderProductData(orderData).then(res=>{
      if(res.length!==0){
//        console.log(res);
        this.setState({
          orderIndDatalist: [...res]
        })
        this.displistOrderProductsDiv()
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        alertMessage("Order not found",3000)
      }
    })
  }


//####################################################################################

  render() {
    const mycartTable = (
      <div>
        <label className="sort-label-font"> Store:</label>
        <select id="storeinput" onChange={this.getStoreProductsPrice}>
            <option value={-1}></option>
          {this.state.storelists.map((data,i)=>{
            return (
              <option key={i} value={data.id}>{data.name}</option>
             )
          })}
        </select>
        <br/>
        <table className="responsiveTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product NAME</th>
              <th>Count pc(s)</th>
              <th>Price (each)</th>
              <th>Total Price</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            { this.state.orderedProductList.map((data,i)=>{
              return (
                <tr key={i} className="table-list">
                  <td>{data.productId}</td>
                  <td>{data.productName}</td>
                  <td>{data.count}</td>
                  <td>{(true)?(Math.round(data.price*100)/100).toFixed(2):'Unavailable'}</td>
                  <td>{(data.price!==0)?(Math.round(data.price*data.count*100)/100).toFixed(2):'Unavailable'}</td>
                  <td>
                    <button id={data.productId} onClick={this.reduceProductQ}>-</button>
                    <button id={data.productId} onClick={this.addProductQ} >+</button>
                    <button id={data.productId} onClick={this.removeProductQ}>Remove</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Total:</th>
              <th></th>
              <th>{this.state.orderedPcount}</th>
              <th></th>
              <th>P {(Math.round(this.state.orderedPTotprice*100)/100).toFixed(2)}</th>
            </tr>
          </tfoot>
        </table>
        <button onClick={this.orderProductQ}><b>Order</b></button>
        <button onClick={this.removeAllProductQ}>Remove All</button>

      </div>
    )


    return (
      <div>
        <div>
          <br/>
          <button onClick={this.dispCartDiv}>MyCart</button>
          <button onClick={this.hideCartDiv}>MyOrder</button>
        </div>

        <div  id="myCartDiv" className="mycart-table-layout" >
          <h1>My Cart</h1>
          <div>
            {(this.state.orderedProductList.length!==0) ? mycartTable :
              <h2>Empty Cart</h2>
            }
          </div>

          <div id="addInfoDiv" className="modal">
            <form className="modal-content animate" onSubmit={this.onCreateOrderFinal}>
              <div className="imgcontainer">
                <span onClick={this.hideaddInfoDiv} className="close"
                title="Close"> &times;
                </span>
                <img src="icons/login.png" alt="Avatar" className="avatar"/>
              </div>
              <div className="container">
                <label><b>Full Name</b></label>
                <input type="text" className="width-100" placeholder= "Enter Complete Name" name="fullName" value={this.state.fullName} onChange={this.onChange} required />
                <label><b>Address</b></label>
                <input type="text" className="width-100" placeholder= "Enter Address" name="address" value={this.state.address} onChange={this.onChange} required />
                <label><b>Contact</b></label>
                <input type="number" className="width-100" placeholder= "Enter Contact Number" name="contactnum" value={this.state.contactnum} onChange={this.onChange} required />
                <button className="loginbtn" type="submit">Order</button>

              </div>
              <div className="container">
                <button type="button" onClick={this.hideaddInfoDiv} className="cancelbtn"> Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <MyOrder
          orderDatalist={this.state.orderDatalist}
          orderIndDatalist ={this.state.orderIndDatalist}
          listorderMouseDown={this.listorderMouseDown}
          hidelistOrderProductsDiv={this.hidelistOrderProductsDiv}
          onCancelMyOrder={this.onCancelMyOrder}
        />


      </div>
    )
  }

}

export default MyCart
