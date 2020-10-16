import React, { Component } from 'react'
import { register,getAllProducts,getProductInfos,deleteProduct,updateProduct,getSearchProducts } from './ProductOperation'
import jwt_decode from 'jwt-decode'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class Products extends Component {
  constructor() {
    super()
    this.state = {
      productId: '',
      name: '',
      description: '',
      productlists: [],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
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
      this.getAllProducts()

    }
  }

  //#######################################################################################

  getAllProducts(){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 7     // id
    }
    getAllProducts(adminAuth).then(res => {
      if(res===false){
        alertMessage("You have no rights to view products",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          productlists: [...res]
        })
      }

    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCreate = (e) => {
    e.preventDefault()
      if (this.state.name!==""){
        const newProduct = {
          name: this.state.name,
          description: this.state.description
        }
        const newAuth={
          token: localStorage.usertoken,
          authId: 6     // id
        }
        register(newProduct,newAuth).then(res => {
          if(res===false){
            alertMessage("You have no rights to add products",2000);
          }else if(res==null){
            alertMessage("Product is already exists",2000);
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
          }
          this.setState({
            productId: '',
            name: '',
            description: ''
          })
          this.getAllProducts()
        })//register then
       }else{
         alertMessage("Enter a corresponding data",2000)
      //  console.log('hi');
      }
  }

  //#######################################################################################
  onMouseDown = (e) =>{
//    alertMessage(e.target.id);
//    alertMessage(e.target.id);
    const existprod = {
      id: e.target.id
    }
    this.setState({
      productId: e.target.id
    })

    const adminAuth={
      token: localStorage.usertoken,
      authId: 7     // id
    }

    getProductInfos(existprod,adminAuth).then(res => {
      if(res===false){
        alertMessage("You have no rights to view products",2000);
      }else if(res==null){
        alertMessage("Product undefined",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          name: res.name,
          description: res.description
        })
      }
    })
  }

  //#######################################################################################

  onDelete = (e) => {
    e.preventDefault()
    if(this.state.productId!==''){

        const existprod = {
          id: this.state.productId
        }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 9     // id
        }
        deleteProduct(existprod,adminAuth).then(res => {
          if(res===true){
            alertMessage("deleted",2000)
          }
          else if(res===false){
            alertMessage("you have no rights to delete productss",2000)
          }
          else if(res===null){
            alertMessage("data is not found",2000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
            alertMessage(res,2000);
          }
          this.setState({
            productId: '',
            name: '',
            description: ''
          })
          this.getAllProducts()
        })//register then
      }else{
        alertMessage("Enter the corespoding parameters to DELETE",2000);
      }
  }

  onModify = (e) => {
    e.preventDefault()

    if (this.state.productId!==""){
      const newProduct = {
        id: this.state.productId,
        name: this.state.name,
        description: this.state.description,
      }
      const newAuth={
        token: localStorage.usertoken,
        authId: 8
      }

      updateProduct(newProduct,newAuth).then(res => {
        if(res===true){
          alertMessage("updated",2000)
        }
        else if(res===false){
          alertMessage("you have no rights to update productss",2000)
        }
        else if(res===null){
          alertMessage("data is not found",2000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else{
          alertMessage(res,2000);
        }
        this.setState({
          productId: '',
          name: '',
          description: ''
        })
        this.getAllProducts()
      })
    }else{
      alertMessage("Enter corresponding data",2000)
    //  console.log('hi');
    }
  }


  //#######################################################################################

  onChangeSearchProduct = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if(e.target.value!==''){
      const searchProd = {
        searchProductName: e.target.value
      }
      this.getSearchProducts(searchProd)
    }else{
      this.getAllProducts()
    }

  }

  getSearchProducts = (searchProd) =>{
    const adminAuth={
      token: localStorage.usertoken,
      authId: 2     // id
    }
    getSearchProducts(searchProd,adminAuth).then(res => {
      if(res!==false && res!==null){
        this.setState({
          productlists: [...res]
        })
      }
    })
  }
  //#######################################################################################

  sortOperationL = (e) =>{
    this.setState({
      productlists: sortAlgorithm(this.state.productlists,e.target.value,"asc")
    })
  }
  //#######################################################################################



  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewProductsLink = (
      <div>
        <div className="authlist-pos-left">
          <br></br>
          <h3>Products List</h3>
          <input
            className="width-100px"
            type="text"
            name="searchAuth"
            placeholder="Search"
            value={this.state.searchAuth}
            onChange={this.onChangeSearchProduct}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL}>
            <option value='id'>id</option>
            <option value='name'>name</option>
          </select>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Products NAME</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productlists.map((data,i)=>{
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

        <div className="authlist-button-pos-right">
          <div className="login-form">
            <form>
              <input
                className="width-100"
                type="text"
                name="productId"
                placeholder="Product Id"
                value={this.state.productId}
                onChange={this.onChange}
                disabled
              />
              <input
                className="width-100"
                type="text"
                name="name"
                placeholder="Product Name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
              <textarea
                className="width-100"
                type="text"
                name="description"
                placeholder="Product Description"
                value={this.state.description}
                onChange={this.onChange}
                rows="5"
                required
              />
            </form>
            <div>
              <input type="button" value="Add" onClick={this.onCreate}></input><em></em>
              <input type="button" value="Delete" onClick={this.onDelete}></input><em></em>
              <input type="button" value="Modify" onClick={this.onModify}></input><em></em>
            </div>
          </div>
        </div>

      </div>

    )
    return (
      <div>
        <div>
          { (myrole.role === 'superadmin' || myrole.role === 'admin' ) ? viewProductsLink : null }
        </div>
      </div>
    )
  }

}

export default Products
