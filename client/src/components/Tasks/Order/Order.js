import React, { Component } from 'react'
//import { register,getAllProducts,getProductInfos,deleteProduct,updateProduct,getSearchProducts } from './ProductOperation'
import ReactDOM from 'react-dom'

import OrderPending from './OrderPending'
import OrderCanceled from './OrderCanceled'
import OrderDone from './OrderDone'
import OrderProcessed from './OrderProcessed'

import jwt_decode from 'jwt-decode'

import { getAllOrderProductData,orderUpdateStatAndProcess,orderUpdateStatAndDeliver } from './OrderFunctions'

import { getAllStoreOrders } from './OrderFunctions'
import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class Order extends Component {
  constructor() {
    super()
    this.state = {
      orderPendingDatalist: [],
      orderDoneDatalist: [],
      orderProcessedDatalist: [],
      orderCanceledDatalist: [],
      orderIndDatalist: [],
      orderIdClicked: '',
      errors: {}
    }

  }

  //#######################################################################################

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }


  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }else{
      this.dispOrderPendingDiv()

    }
  }
//#########################################################
  getAllStoreOrders(stat){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 31     // id
    }
    const storeData ={
      storeId: jwt_decode(localStorage.usertoken).storeId,
      status: stat
    }
    getAllStoreOrders(storeData,adminAuth).then(res=>{
//      console.log(res);
      if(res===false){
        alertMessage("you have no rights to get store orders",3000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
          if(stat==='pending'){
            this.setState({ orderPendingDatalist: sortAlgorithm([...res],'date',"desc") })
          }else if(stat==='done'){
            this.setState({ orderDoneDatalist: sortAlgorithm([...res],'date',"desc") })
          }else if(stat==='canceled'){
            this.setState({ orderCanceledDatalist: sortAlgorithm([...res],'date',"desc") })
          }else if(stat==='processed'){
            this.setState({ orderProcessedDatalist: sortAlgorithm([...res],'date',"desc") })
          }else{}
      }else{}
    })
  }
//#########################################################
 getAllPendingOrders(ordersList){

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
//############################################################################

getAllOrderProductData(orderId){
//  console.log(orderId);
  const orderData={
    orderId: orderId
  }
  getAllOrderProductData(orderData).then(res=>{
    if(res.length!==0){
//        console.log(res);
      this.setState({
        orderIndDatalist: [...res]
      })
      this.setState({ orderIdClicked: orderId})
      this.displistOrderProductsDiv()
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      alertMessage("Order not found",3000)
    }
  })
}
//##############################################################

listorderMouseDown = (e) =>{
  e.preventDefault()
//    console.log(e.target.id);
  this.getAllOrderProductData(e.target.id)
}
//#######################################################################
onAcceptOrder = (e) =>{
  const orderData={
    orderId: e.target.id,
    status: 'processed',
    storeuserIdProcess: jwt_decode(localStorage.usertoken).id
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 33     // id
  }
  orderUpdateStatAndProcess(orderData,adminAuth).then(res=>{
    if(res===false){
      alertMessage("You have no rights to take orders",5000)
    }else if(res===null){
      alertMessage("Order ntot found",5000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.dispOrderProcessedDiv()
      this.getAllOrderProductData(orderData.orderId)
    }else{}
//    console.log(res);
  })
}
//#########################################################
//#######################################################################
onRejectOrder = (e) =>{
  const orderData={
    orderId: e.target.id,
    status: 'canceled',
    storeuserIdProcess: jwt_decode(localStorage.usertoken).id
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 33     // id
  }
  orderUpdateStatAndProcess(orderData,adminAuth).then(res=>{
    if(res===false){
      alertMessage("You have no rights to cancel orders",5000)
    }else if(res===null){
      alertMessage("Order not found",5000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.dispOrderPendingDiv()
    }else{}
//    console.log(res);
  })
}
//#######################################################################
onDeliveredOrder = (e) =>{
  const orderData={
    orderId: e.target.id,
    status: 'done',
    storeuserIdDeliver: jwt_decode(localStorage.usertoken).id
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 33     // id
  }
  orderUpdateStatAndDeliver(orderData,adminAuth).then(res=>{
    if(res===false){
      alertMessage("You have no rights to update deliver orders",5000)
    }else if(res===null){
      alertMessage("Order not found",5000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.dispOrderDoneDiv()
    }else{}
//    console.log(res);
  })
}
//#################################################################################
  dispOrderPendingDiv = () => {
    this.getAllStoreOrders('pending')
    this.hideAllDiv()
    var mydiv = document.getElementById('orderPendingDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
  //#################################################################################
  dispOrderCanceledDiv = () => {
    this.getAllStoreOrders('canceled')
    this.hideAllDiv()
    var mydiv = document.getElementById('orderCanceledDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
  //#########################################################################################
  dispOrderDoneDiv = () => {
    this.getAllStoreOrders('done')
    this.hideAllDiv()
    var mydiv = document.getElementById('orderDoneDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
 //#################################################################################
    dispOrderProcessedDiv = () => {
      this.getAllStoreOrders('processed')
      this.hideAllDiv()
      var mydiv = document.getElementById('orderProcessedDiv');
      ReactDOM.findDOMNode(mydiv).style.display='block';
    }

//#############################################################################
  hideAllDiv = () => {
    var mydiv = document.getElementById('orderPendingDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    var mydiv2 = document.getElementById('orderCanceledDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='none';
    var mydiv3 = document.getElementById('orderProcessedDiv');
    ReactDOM.findDOMNode(mydiv3).style.display='none';
    var mydiv4 = document.getElementById('orderDoneDiv');
    ReactDOM.findDOMNode(mydiv4).style.display='none';
  }
//#########################################################

//#########################################################
  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const ordersLink = (
      <div>
        <h1>Store Orders' List</h1>
        <div>
          <button onClick={this.dispOrderPendingDiv}>Pending</button>
          <button onClick={this.dispOrderProcessedDiv}>Processed</button>
          <button onClick={this.dispOrderDoneDiv}>Delivered</button>
          <button onClick={this.dispOrderCanceledDiv}>Canceled</button>
          <br/>
          <br/>
        </div>

        <OrderPending
          orderPendingDatalist={this.state.orderPendingDatalist}
          listorderMouseDown={this.listorderMouseDown}
          onAcceptOrder={this.onAcceptOrder}
          onRejectOrder={this.onRejectOrder}
        />

        <OrderCanceled
          orderCanceledDatalist={this.state.orderCanceledDatalist}
          listorderMouseDown={this.listorderMouseDown}
          onAcceptOrder={this.onAcceptOrder}
          onRejectOrder={this.onRejectOrder}
        />


        <OrderDone
          orderDoneDatalist={this.state.orderDoneDatalist}
          listorderMouseDown={this.listorderMouseDown}
          onAcceptOrder={this.onAcceptOrder}
          onRejectOrder={this.onRejectOrder}
        />

        <OrderProcessed
          orderProcessedDatalist={this.state.orderProcessedDatalist}
          listorderMouseDown={this.listorderMouseDown}
          onDeliveredOrder={this.onDeliveredOrder}
        />


        <div id="listoOrderProductsDiv" className="modal">
          <form className="modal-content animate  myorder-modal-background">
            <div className="imgcontainer">
              <span onClick={this.hidelistOrderProductsDiv} className="close"
              title="Close"> &times;
              </span>
                <label>Order ID <b>{this.state.orderIdClicked}</b></label>
              <h5>ORDER LIST</h5>
            </div>
            <div className="container">

              {this.state.orderIndDatalist.map((data,i)=>{
                return (
                  <tr key={i}>
                    <div key={i}>
                      <div className="myorder-image-pos-left">
                        <img src={"icons/products/"+data.product_name+".jpg"} alt='' className="landing-display-ind-products"></img>
                      </div>
                      <div className="myorder-label-pos-right">
                        <b>{data.product_name}</b>
                        <br />
                          {data.count}pc(s)
                        <br/>
                          P {(Math.round(data.price*100)/100).toFixed(2)}
                        <br />
                          P {(Math.round(data.price*data.count*100)/100).toFixed(2)}
                        <br />
                          {(data.isAvailable==="true")?'Available':'Unavailable'}

                      </div>
                    </div>
                  </tr>
                )
              })}
            </div>
            <div className="container">
              <button type="button" onClick={this.hidelistOrderProductsDiv} className="cancelbtn"> Close</button>
            </div>
          </form>
        </div>

      </div>

    )
    return (
        <div>
                { (myrole.role === 'storeowner' || myrole.role === 'storeuser' ) ? ordersLink : null }
        </div>
    )
  }

}

export default Order
