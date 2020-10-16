import React, { Component } from 'react'
import { addNewAuth,modifiedAuth,deleteAuth,getAllAuths,getSearchAuths,getAuthInfos } from './AuthOperation'
import jwt_decode from 'jwt-decode'

import { sortAlgorithm } from '../Algorithms/sortAlgo'
import { isJWTExpires } from './checkJwt'
import {alertMessage} from '../alertMessage'

import "../../css/Auths.css"

class Auths extends Component {
  constructor() {
    super()
    this.state = {
      authId: '',
      authName: '',
      authDesc: '',
      userauthId: '',
      searchAuth: '',
      authlists: [],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeSearchAuth = this.onChangeSearchAuth.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onModify = this.onModify.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.sortOperationL = this.sortOperationL.bind(this)

  }
  //#######################################################################################

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }
  //#######################################################################################

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  //#######################################################################################

  onChangeSearchAuth(e) {
    this.setState({ [e.target.name]: e.target.value })
    if(e.target.value!==''){
      const searchAuth = {
        searchAuthName: e.target.value
      }
      this.getSearchAuths(searchAuth)
    }else{
      this.getAllAuths()
    }

  }
  //#######################################################################################

  onCreate(e) {
    e.preventDefault()
    if(this.state.authName!==''){
      const newauth = {
        name: this.state.authName,
        description: this.state.authDesc,
      }
      const adminAuth={
        token: localStorage.usertoken,
        authId: 1     // id
      }
      addNewAuth(newauth,adminAuth).then(res => {
        if(res===true){
          alertMessage("added",2000)
        }
        else if(res===false){
          alertMessage("you have no rights to add auths",2000)
        }
        else if(res===null){
          alertMessage("data is duplicated or incomplete params",2000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else{
          alertMessage(res);
        }
        this.setState({
          authId: '',
          authName: '',
          authDesc: ''
        })
        this.getAllAuths()
//          alertMessage(res.msg)
      })//register then
    }else{
//      console.log("nnono");
      alertMessage("Enter the corespoding parameters to add",2000);
    }

  }
  //#######################################################################################

  onModify(e) {
    e.preventDefault()
    if(this.state.authId!==''){

          const modifiedauth = {
            id: this.state.authId,
            name: this.state.authName,
            description: this.state.authDesc,
          }
          const adminAuth={
            token: localStorage.usertoken,
            authId: 3     // id
          }
          modifiedAuth(modifiedauth,adminAuth).then(res => {
            if(res===true){
              alertMessage("updated",2000)
            }
            else if(res===false){
              alertMessage("you have no rights to update auths",2000)
            }
            else if(res===null){
              alertMessage("data is not found",2000)
            }else if(res.name==="SequelizeDatabaseError"){
              alertMessage(res.name+" "+res.original.code,5000)
            }else{
              alertMessage(res);
            }
            this.setState({
              authId: '',
              authName: '',
              authDesc: ''
            })
            this.getAllAuths()
          })//register then
        }else{
    //      console.log("nnono");
          alertMessage("Enter the corespoding parameters to modify",2000);
        }
  }
  //#######################################################################################

  onDelete(e) {
    e.preventDefault()
    if(this.state.authId!==''){

        const existauth = {
          id: this.state.authId
        }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 5     // id
        }
        deleteAuth(existauth,adminAuth).then(res => {
          if(res===true){
            alertMessage("deleted",2000)
          }
          else if(res===false){
            alertMessage("you have no rights to delete auths",2000)
          }
          else if(res===null){
            alertMessage("data is not found",2000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
            alertMessage(res);
          }
          this.setState({
            authId: '',
            authName: '',
            authDesc: ''
          })
          this.getAllAuths()
        })//register then
      }else{
        alertMessage("Enter the corespoding parameters to DELETE",2000);
      }
  }
  //#######################################################################################

  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }

    this.getAllAuths()
  }
  //#######################################################################################

  getAllAuths(){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 2     // id
    }
    getAllAuths(adminAuth).then(res => {
      if(res===false){
        alertMessage("You have no rights to view auths",2000);
      }else if(res==null){
        alertMessage("Auth undefined",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          authlists: [...res]
        })
      }
    })
  }
  //#######################################################################################

  getSearchAuths(searchAuth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 2     // id
    }
    getSearchAuths(searchAuth,adminAuth).then(res => {
      if(res!==false && res!==null){
        this.setState({
          authlists: [...res]
        })
      }
    })
  }
  //#######################################################################################

  onMouseDown(e){
//    alertMessage(e.target.id);
//    alertMessage(e.target.id);
    const existauth = {
      id: e.target.id
    }
    this.setState({
      authId: e.target.id
    })

    const adminAuth={
      token: localStorage.usertoken,
      authId: 2     // id
    }

    getAuthInfos(existauth,adminAuth).then(res => {
      if(res===false){
        alertMessage("You have no rights to view auths",2000);
      }else if(res==null){
        alertMessage("Auth undefined",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          authName: res.name,
          authDesc: res.description
        })
      }
    })
  }

  //#######################################################################################

  sortOperationL(e){
    this.setState({
      authlists: sortAlgorithm(this.state.authlists,e.target.value,"asc")
    })
  }
  //#######################################################################################

  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllAuthLink = (
      <div>
        <div className="authlist-pos-left">
          <br></br>
          <h3>Auth List</h3>
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
            <option value='id'>id</option>
            <option value='name'>name</option>
          </select>
          <table>
            <thead>
              <tr>
               <th>ID</th>
               <th>AUTH NAME</th>
               <th>Description</th>
             </tr>
            </thead>
            <tbody>
              {this.state.authlists.map((data,i)=>{
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
              <br/>
              <br/>
              <br/>
              <br/>
              <input
                className="width-100"
                type="text"
                name="authId"
                placeholder="Auth Id"
                value={this.state.authId}
                onChange={this.onChange}
                disabled
              />
              <input
                className="width-100"
                type="text"
                name="authName"
                placeholder="Auth Name"
                value={this.state.authName}
                onChange={this.onChange}
                required
              />
              <input
                className="width-100"
                type="text"
                name="authDesc"
                placeholder="Auth Desc"
                value={this.state.authDesc}
                onChange={this.onChange}
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
          { (myrole.role === 'superadmin') ? viewAllAuthLink : null }
        </div>
      </div>
    )
  }
}

export default Auths
