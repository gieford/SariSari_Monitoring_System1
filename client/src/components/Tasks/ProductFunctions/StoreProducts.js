import React, { Component } from 'react'

import ReactDOM from 'react-dom'

import  jwt_decode  from 'jwt-decode'

import { registermodifiedstoreproduct,deleteStoreProduct,getAllProductsnotInStoreProducts,getStoreProductInfosAndDescription,getproductInfoOnly,getAllStoreProducts } from './ProductOperation'

import { /*getstoreId*/ } from '../Stores/StoreFunctions'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'

import '../../../css/StoreProducts.css'


class StoreProducts extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      count: '',
      storeid: '',
      productId: '',
      productlist: [],
      storeproductlist: [],
      sortprodiden: '',
      isAdd: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onAddModify = this.onAddModify.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
  }

  //#######################################################################################

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }else{
      this.setState({
        sortprodiden:"name"
      })
  //    this.getAllProducts()
      this.getStoreId()
      this.hidemodifyStoreProdDiv()

    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  getStoreId(){
    var storeId = jwt_decode(localStorage.usertoken).storeId

    this.getAllProducts(storeId)
    this.getAllStoreProducts(storeId)

    this.setState({
      storeid: storeId
    })
  }


//  getProducts = () =>{
  getAllProducts(storeId){

    const storeData={
      storeId: storeId
    }

    getAllProductsnotInStoreProducts(storeData).then(res => {
      //console.log(res);
      //const token1 = JSON.parse(localStorage.getItem('storeownersapplicationlists'))
      //localStorage.removeItem('storeownersapplicationlists')
      this.setState({
        productlist: sortAlgorithm([...res],this.state.sortprodiden,"asc")
      })
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  //  getProducts = () =>{
    getAllStoreProducts(storeId){
      const storeData={
        storeId: storeId
      }

      getAllStoreProducts(storeData).then(res => {
        this.setState({
          storeproductlist: sortAlgorithm([...res],this.state.sortprodiden,"asc")
        })
      })
    }
  /////#####################################################################################
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  /////#####################################################################################
  onAddModify(e) {
    e.preventDefault()
      if (this.state.name!=="" && this.state.description!=="" && this.state.price!=="" && this.state.count!==""){
        const newstoreProduct = {
          productId: this.state.productId,
          storeId: this.state.storeid,
          price: this.state.price,
          count: this.state.count
        }
        const newAuth={
          token: localStorage.usertoken,
          authId: 27     // id
        }
        registermodifiedstoreproduct(newstoreProduct,newAuth).then(res => {
          if(res===true){
            alertMessage("Store Product Rigestered/Modified",3000)
          }else if(res===false){
            alertMessage("You have no rights to create or update Store Product",3000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{

          }
          this.getAllProducts(this.state.storeid)
          this.getAllStoreProducts(this.state.storeid)
          this.hidemodifyStoreProdDiv()

          this.setState({
            name: '',
            description: '',
            price: '',
            count: ''
          })

        })//register then
       }else{
         alertMessage("Please provide the missing credentials",3000)
      //  console.log('hi');
      }
  }

  //#######################################################################################

  onDelete = (e) => {
    e.preventDefault()
    if(e.target.id){

        const existprod = {
          productId: e.target.id,
          storeId: this.state.storeid,
        }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 30     // id
        }
        deleteStoreProduct(existprod,adminAuth).then(res => {
          if(res===true){
            alertMessage("deleted",2000)
          }
          else if(res===false){
            alertMessage("you have no rights to delete store productss",2000)
          }
          else if(res===null){
            alertMessage("data is not found",2000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
            alertMessage(res,2000);
          }
          this.getAllProducts(this.state.storeid)
          this.getAllStoreProducts(this.state.storeid)

        })//register then
      }else{
        alertMessage("Store product is unknown",2000);
      }

  }
/*
  onAddModify = (e) => {
    e.preventDefault()

    if (this.state.productId!==""){
      const existProduct = {
        productId: this.state.productId,
        storeId: this.state.storeid,
        price: this.state.price,
        count: this.state.count
      }
      const newAuth={
        token: localStorage.usertoken,
        authId: 29
      }

      updateStoreProduct(existProduct,newAuth).then(res => {
        if(res===true){
          alertMessage("updated",2000)
        }
        else if(res===false){
          alertMessage("you have no rights to update pstore roductss",2000)
        }
        else if(res===null){
          alertMessage("data is not found",2000)
        }else{
          alertMessage(res,2000);
        }
        this.setState({
          name: '',
          description: '',
          price: '',
          count: ''
        })
      })
    }else{
      alertMessage("Enter corresponding data",2000)
    //  console.log('hi');
    }
  }
*/
/////#####################################################################################
  getproductinfos(storeId,product){
    const store = {
      storeId: storeId
    }

    getStoreProductInfosAndDescription(store,product).then(res => {    //join
  //    console.log(res);
      if(res!==null){
        this.setState({
          name: res.name,
          description: res.description,
          price: res.storeproduct.price,
          count: res.storeproduct.count,
          isAdd: false
        })
      }else{
//        console.log(product);
        getproductInfoOnly(product).then(product => {
  //        console.log(product);
      //    console.log(res.name);
    //      console.log(res.description);
    //      console.log(res.storeproduct.price);
            this.setState({
              name: product.name,
              description: product.description,
              price: '',
              count: '',
              isAdd: true
            })
        })
      }

    })
  }
  /////#####################################################################################

//############################################
  onMouseDown(e){
//    console.log(e.target.id);
//    alert(e.target.id);
    const product = {
      productId: e.target.id
    }
    this.setState({
      productId: e.target.id
    })

    this.getproductinfos(this.state.storeid,product)
    this.dispmodifyStoreProdDiv()
  }
  //#######################################################################################
  sortOperationL = (e) =>{
    this.setState({
      productlist: sortAlgorithm(this.state.productlist,e.target.value,"asc")
    })
  }
  /////#####################################################################################
  sortOperationR = (e) =>{
    this.setState({
      storeproductlist: sortAlgorithm(this.state.storeproductlist,e.target.value,"asc")
    })
  }  //####################################################################################
  dispmodifyStoreProdDiv = () => {
    var mydiv = document.getElementById('modifyStoreProdDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  hidemodifyStoreProdDiv = () => {
    var mydiv = document.getElementById('modifyStoreProdDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.setState({
      name: '',
      description: '',
      price: '',
      count: '',
      isAdd: false
    })
  }

//################################################################
  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewStoreOwnerLink = (
      <div>
        <div className="user-authlist-pos-left">
          <br></br>
          <br></br>
          <h3>All Product List</h3>
          <input
            className="width-100px"
            type="text"
            name="searchAuth"
            placeholder="Search"
            value={this.state.searchAuth}
            onChange={this.onChangeSearchAuth}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL} className="width-100px">
            <option value='name'>name</option>
            <option value='id'>id</option>
          </select>
          <table className="responsiveTable">
            <thead>
              <tr>
               <th>ID</th>
               <th>Product NAME</th>
               <th>Description</th>
             </tr>
            </thead>
            <tbody>
              {this.state.productlist.map((data,i)=>{
                return (
                  <tr key={i} className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="user-authlist-pos-right">
          <br></br>
          <br></br>
          <h3>All Store Product List</h3>
          <input
            className="width-100px"
            type="text"
            name="searchAuth"
            placeholder="Search"
            value={this.state.searchAuth}
            onChange={this.onChangeSearchAuth}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationR}>
            <option value='name'>name</option>
            <option value='id'>id</option>
          </select>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Product NAME</th>
                <th>Product Price</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
              {this.state.storeproductlist.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td className="td-del-btn" >
                      <button id={data.id} onMouseDown={this.onDelete}>{'<'}Del</button>
                    </td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {(Math.round(data.price*100)/100).toFixed(2)}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>


        <div id="modifyStoreProdDiv" className="modal">
          <form className="modal-content animate" onSubmit={this.onAddModify}>
            <div className="imgcontainer">
              <span onClick={this.hidemodifyStoreProdDiv} className="close"
              title="Close"> &times;
              </span>
              <img src="icons/login.png" alt="Avatar" className="avatar"/>
            </div>
            <div className="container">
              <label><b>Product Name</b></label>
              <input type="text" className="width-100" placeholder= "Enter Product Name" name="name" value={this.state.name} readOnly required />
              <label><b>Product Description</b></label>
              <textarea type="text" className="width-100" placeholder= "Enter Description" name="description" value={this.state.description} rows="5" readOnly required />
              <label><b>Product Price</b></label>
              <input type="number" className="width-100" placeholder= "Enter Price" name="price" value={this.state.price} onChange={this.onChange} required />
              <label><b>Product Count</b></label>
              <input type="number" className="width-100" placeholder= "Enter Number of Products" name="count" value={this.state.count} onChange={this.onChange} required />
              <button className="loginbtn" type="submit">{(this.state.isAdd?'Add':'Modify')}</button>

            </div>
            <div className="container">
              <button type="button" onClick={this.hidemodifyStoreProdDiv} className="cancelbtn"> Cancel</button>
            </div>
          </form>
        </div>

      </div>

    )
    return (
        <div>
          { (myrole.role === 'storeowner' ||myrole.role === 'storeuser') ? viewStoreOwnerLink : null }
        </div>
    )
  }
}

export default StoreProducts
