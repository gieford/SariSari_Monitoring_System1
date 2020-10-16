import React, { Component } from 'react'

import jwt_decode from 'jwt-decode'
import { addRoleAuth,deleteRoleAuth,getAuthsNotInRAuths,getAllRoleAuths,getSearchRoleAuths } from './RoleAuthOperations'

import { sortAlgorithm } from '../../Algorithms/sortAlgo'
import { isJWTExpires } from '.././checkJwt'
import {alertMessage} from '../../alertMessage'

import "../../../css/UserAuths.css"

class RoleAuths extends Component {
  constructor() {
    super()
    this.state = {
      role: '',
      userauthId: '',
      searchRoleAuth: '',
      authlists: [],
      roleauthlists: [],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onMouseDownLeft = this.onMouseDownLeft.bind(this)
    this.onMouseDownRight = this.onMouseDownRight.bind(this)
    this.sortOperationL = this.sortOperationL.bind(this)
    this.sortOperationR = this.sortOperationR.bind(this)
    this.onChangeSearchRoleAuth = this.onChangeSearchRoleAuth.bind(this)


  }
//##################################################################
  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }
  //#######################################################################################

  onChange(e) {
    this.displayTable(e.target.value)
    this.setState({
      role: e.target.value
    })
  }

  onChangeSearchRoleAuth(e) {
    this.setState({ [e.target.name]: e.target.value })
    if(this.state.role!==''){
      if(e.target.value!==''){
        const searchRAuth = {
          searchAuthName: e.target.value
        }
        this.getSearchRoleAuths(searchRAuth)
      }else{
        this.getAuthsNotInRAuths()
      }
    }

  }

  getSearchRoleAuths(searchRoleAuth){
    if(this.state.role!==''){
      const roleData={
        role: this.state.role
      }
      const adminAuth={
        token: localStorage.usertoken,
        authId: 13     // id
      }
      getSearchRoleAuths(roleData,searchRoleAuth,adminAuth).then(res => {
        if(res!==false && res!==null){
          this.setState({
            authlists: [...res]
          })
        }
      })
    }else{
      alertMessage("pls state the role",2000)
    }
  }



  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }

  }

  displayTable(myrole) {
    this.getAuthsNotInRAuths(myrole)
    this.getAllRoleAuths(myrole)
  }

  getAuthsNotInRAuths(myrole){
    if(myrole!==''){
      const roleData={
        role: myrole
      }
      const adminAuth={
        token: localStorage.usertoken,
        authId: 2     // id
      }
      getAuthsNotInRAuths(roleData,adminAuth).then(res => {
        if(res!==false && res!==null){
          this.setState({
            authlists: [...res]
          })
        }else if(res===false){
          alertMessage("you have no rights to views auths",2000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else{
          alertMessage(res,2000);
        }
      })
    }
  }


  getAllRoleAuths(myrole){
    if(myrole!==''){
      const roleData={
        role: myrole
      }
      const adminAuth={
        token: localStorage.usertoken,
        authId: 17     // id
      }
      getAllRoleAuths(roleData,adminAuth).then(res => {
        if(res!==false && res!==null){
          this.setState({
            roleauthlists: [...res]
          })
        }else if(res===false){
          alertMessage("you have no rights to views role auths",2000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else{
          alertMessage(res,2000);
        }
      })
    }
  }



  addRoleAuth(newroleauth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 14     // id
    }

    addRoleAuth(newroleauth,adminAuth).then(res => {
      console.log(res);
      if(res!==false && res!==null){

      }else if(res===false){
        alertMessage("you have no rights to add role auths",2000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        alertMessage(res,2000);
      }
      this.displayTable(this.state.role)
    })
  }


  deleteRoleAuth(existuserauth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 16     // id
    }

    deleteRoleAuth(existuserauth,adminAuth).then(res => {
      console.log(res);
      if(res!==false && res!==null){
      }else if(res===false){
        alertMessage("you have no rights to delete users auths",2000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        alertMessage(res,2000);
      }
      this.displayTable(this.state.role)
    })

  }

  onMouseDownLeft(e){
//    console.log(e.target.id);
//    alert(e.target.id);
    if(this.state.role!==''){
      const newroleauth = {
        role: this.state.role,
        roleauthId: e.target.id
      }

      this.addRoleAuth(newroleauth)

    }else{
      alertMessage("please specify user id.",2000)
    }

  }

  onMouseDownRight(e){
    if(this.state.role!==''){
      const existroleauth = {
        role: this.state.role,
        authId: e.target.id
      }
      this.deleteRoleAuth(existroleauth)
    }else{
      alertMessage("please specify user id.",2000)
    }
  }

  sortOperationL(e){
    this.setState({
      authlists: sortAlgorithm(this.state.authlists,e.target.value,"asc")
    })
  }

  sortOperationR(e){
    this.setState({
      roleauthlists: sortAlgorithm(this.state.roleauthlists,e.target.value,"asc")
    })
  }


  render() {

    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllRoleAuthLink = (
      <div>
        <div className="role-select-roleauths">
            <br></br>
            <br></br>
            <label>Role</label>
            <select onChange={this.onChange}>
              <option value=''></option>
              <option value='user'>user</option>
              <option value='admin'>admin</option>
              <option value='superadmin'>superadmin</option>
              <option value='storeowner'>storeowner</option>
              <option value='storeuser'>storeuser</option>
            </select>
        </div>

        <div className="user-authlist-pos-left">
          <input
            className="width-100px"
            type="text"
            name="searchRoleAuth"
            placeholder="Search"
            value={this.state.searchRoleAuth}
            onChange={this.onChangeSearchRoleAuth}
          />
          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL}>
            <option value='id'>id</option>
            <option value='name'>name</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>AUTH</th>
              </tr>
            </thead>
            <tbody>
              {this.state.authlists.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDownLeft}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDownLeft}> {data.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="user-authlist-pos-right">

          <label className="sort-label-font"> Sort By:</label>
          <select onChange={this.sortOperationL}>
            <option value='id'>id</option>
            <option value='name'>name</option>
          </select>
          <table>
            <thead>
              <tr>
               <th>ID</th>
               <th>Role's AUTH</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roleauthlists.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDownRight}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDownRight}> {data.name}</td>
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
            <div>
              { (myrole.role === 'superadmin') ? viewAllRoleAuthLink : null }
            </div>
          </div>


    )
  }
}

export default RoleAuths
