import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

//import { addstoreuser,getstoreId } from '../Stores/StoreFunctions'
//import { register,getUserInfos } from '../../UserFunctions'
//import { addUserAuth } from '../../Auth/UserAuths/UserAuthOperations'
//import { getRoleAuth } from '../../Auth/RoleAuths/RoleAuthOperations'
//import { getAllStoreUsers } from './StoreFunctions'

import { getAllEDStores,updateStoreStatus } from '../Stores/StoreFunctions'



import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'

class Stores extends Component {

  constructor() {
    super()
    this.state = {
      userId: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      storeid: '',
      enabledstores: [],
      disabledstores: [],
      errors: {}
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }


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
      this.getAllStores()      
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  getAllStores(){
    const store = {
      isdisabled: 'false'
    }
    getAllEDStores(store).then(res=>{
      if(res!==undefined){
          this.setState({ enabledstores: [...res]})
      }else{}
    })

    const store2 = {
      isdisabled: 'true'
    }
    getAllEDStores(store2).then(res=>{
      if(res!==undefined){
          this.setState({ disabledstores: [...res]})
      }else{}
    })


  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  disabledStore = (e) =>{
    const store = {
      id: e.target.id,
      isdisabled: 'true'
    }
    this.updateStore(store,)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  enabledStore = (e) =>{
    const store = {
      id: e.target.id,
      isdisabled: 'false'
    }
    this.updateStore(store,)
  }
//#################################################################
  updateStore(store){
    const newAuth={
      token: localStorage.usertoken,
      authId: 22
    }
    updateStoreStatus(store,newAuth).then(res=>{
      if(res===false){
        alertMessage("You have no rights to update store",2000)
      }else if(res===null){
        alertMessage("stoe not found",2000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
        this.getAllStores()
      }
    })
  }

//###################################################################################

  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllStoreLink = (
      <div>
        <div className="user-authlist-pos-left">
          <br></br>
          <h3>Enabled Store</h3>
          <input
            className="search-textbox"
            type="text"
            name="searchUser"
            placeholder="Search"
            value={this.state.searchUser}
            onChange={this.onChangeSearchUser}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL}>
            <option value='id'>id</option>
            <option value='last_name'>Lastname</option>
          </select>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Store Name</th>
                <th>Location</th>
                <th>owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.enabledstores.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.location}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.owner}</td>
                    <td>
                      <button id={data.id} onClick={this.disabledStore}>Disable</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="user-authlist-pos-right">
          <br />
          <h3>Disabled Store</h3>
          <input
            className="search-textbox"
            type="text"
            name="searchUser"
            placeholder="Search"
            value={this.state.searchUser}
            onChange={this.onChangeSearchUser}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL}>
            <option value='id'>id</option>
            <option value='last_name'>Lastname</option>
          </select>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Store Name</th>
                <th>Location</th>
                <th>owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.disabledstores.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.location}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.owner}</td>
                    <td>
                      <button id={data.id} onClick={this.enabledStore}>Enable</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
    return (
      <div>
        { (myrole.role === 'superadmin') ? viewAllStoreLink : null }
      </div>
    )
  }

}

export default Stores
