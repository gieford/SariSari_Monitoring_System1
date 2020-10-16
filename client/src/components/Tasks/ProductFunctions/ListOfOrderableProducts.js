import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

//const initLinks = require('.././initLinks')
import { getAllProductsWOLogin,getstoreproductlist2,getSearchProducts,getSearchStoreProducts } from './ProductOperation'
//import { getSearchStoreProducts } from './'
import { getAllEDStores } from '../Stores/StoreFunctions'

import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class ListOfOrderableProducts extends Component {

  constructor(){
    super();
    this.state={
      unread_msgs: false,
      productlists: [],
      storelists: [],
      searchprod: '',
      mystore: '',
      errors: {}
    }
  }

  //#######################################################################################
  componentDidMount() {
    this.getAllProducts()
    this.getAllStores()
  }

//#################################################################################
//#######################################################################################

onChangeSearchProduct = (e) => {
  this.setState({ [e.target.name]: e.target.value })

  if(e.target.value!==''){
    if(this.state.mystore!==''){
      const searchStoreProd = {
        searchProductName: e.target.value,
        storeId: this.state.mystore
      }
      this.getSearchStoreProducts(searchStoreProd)
    }else{
      const searchProd = {
        searchProductName: e.target.value
      }
      this.getSearchProducts(searchProd)
    }
  }else{
    if(this.state.mystore!==''){
      const store={
        storeId: this.state.mystore
      }
      this.getAllStoreProducts(store)
    }else{
      this.getAllProducts()
    }

  }

}

getSearchProducts = (searchProd) =>{

  getSearchProducts(searchProd).then(res => {
    if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==false && res!==null){
      this.setState({
        productlists: [...res]
      })
    }
  })
}


getSearchStoreProducts = (searchProd) =>{
  getSearchStoreProducts(searchProd).then(res => {
    if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==false && res!==null){
      this.setState({
        productlists: [...res]
      })
    }
  })

}


    //###########################################################################

  getAllProducts(){
    getAllProductsWOLogin().then(res => {
      if(res===null){
        alertMessage("No Products found",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
        this.setState({
          productlists: sortAlgorithm([...res],"name","asc")
        })
      }

    })
  }


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
    //################################################################

  addToCart = (e) =>{
    e.preventDefault();
    this.props.orderProductList(e.target.id)
  }
//################################################################
  getStoreProductsInfos = (e) =>{
    e.preventDefault();
    this.setState({
      searchprod: '',
      mystore: e.target.value
    })

    if(e.target.value!==-1){
      const store={
        storeId: e.target.value
      }
      this.getAllStoreProducts(store)
    }else{
      this.getAllProducts()
    }
  }
//################################################################  }
getAllStoreProducts(store){
  getstoreproductlist2(store).then(res => {
    this.setState({
      productlists: sortAlgorithm([...res],"name","asc")
    })
  })
}
///################################################################
  render() {
    const displayProducts = (num,data) =>{
        return(
          <div key={num} className="landing-display-products">
            <img src={"icons/products/"+(data.name).replace(/\s+/g, '')+".jpg"} alt='' className="landing-display-ind-products"></img>
            <div className="landing-display-ind-products-label">
              <b>{data.name}</b>
              <br/>
                P {(data.storeproduct)?(Math.round(data.storeproduct.price*100)/100).toFixed(2):'#.##'}
              <br />
              <button className="addtocart-btn-layout" id={data.id} onClick={this.addToCart}>Add to Cart</button>
            </div>
          </div>
        )
    }

    return (
      <div>
        <div>
          <label className="sort-label-font"> Store:</label>
          <select onChange={this.getStoreProductsInfos}>
              <option value={-1}></option>
            {this.state.storelists.map((data,i)=>{
              return (
                <option key={i} value={data.id}>{data.name}</option>
               )
            })}
          </select>
          <br />
          <label className="sort-label-font"> Product Name:</label>
          <input
            className="width-150px"
            type="text"
            onChange={this.onChangeSearchProduct}
            name="searchprod"
            placeholder="Search Product"
            value={this.state.searchprod}
          ></input>
        </div>
        {this.state.productlists.map((data,i)=>{
          return (
                displayProducts(i,data)
           )
        })}
      </div>
    )
  }
}

export default ListOfOrderableProducts
