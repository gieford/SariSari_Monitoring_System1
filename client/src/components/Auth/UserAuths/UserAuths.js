import React, { Component } from 'react'
//import { getAllAuths } from '../AuthOperation'

import { addUserAuth,deleteUserAuth,getAllUserAuths,searchUser,getSearchUserAuths,getAuthsNotInUAuths } from './UserAuthOperations'
import jwt_decode from 'jwt-decode'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'
import { isJWTExpires } from '.././checkJwt'
import {alertMessage} from '../../alertMessage'

import "../../../css/UserAuths.css"

class UserAuths extends Component {
  constructor() {
    super()
    this.state = {
      userId: '',
      searcheduserId: '',
      firstname: '',
      lastname: '',
      searchUserAuth: '',
      authlists: [],
      userauthlists: [],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onMouseDownLeft = this.onMouseDownLeft.bind(this)
    this.onMouseDownRight = this.onMouseDownRight.bind(this)
    this.sortOperationL = this.sortOperationL.bind(this)
    this.sortOperationR = this.sortOperationR.bind(this)
    this.onChangeSearchUserAuth = this.onChangeSearchUserAuth.bind(this)


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
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeSearchUserAuth(e) {
    this.setState({ [e.target.name]: e.target.value })
    if(this.state.searcheduserId!==''){
      if(e.target.value!==''){
        const searchAuth = {
          searchAuthName: e.target.value
        }
        this.getSearchUserAuths(searchAuth)
      }else{
        this.getAuthsNotInUAuths()
      }
    }
  }


  onSearch(e) {
    e.preventDefault()
        const userData = {
          id: this.state.userId,
        }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 24     // id
        }
        searchUser(userData,adminAuth).then(res => {
          if(res!==false && res!==null){
            this.setState({
              searcheduserId: this.state.userId,
              firstname: res.first_name,
              lastname: res.last_name
            })
            this.displayTable()
          }else{
            if(res===false){
              alertMessage("you have no rights to vsearch user",2000)
            }else if(res===null){
              alertMessage("user did not exist",2000)
            }else if(res.name==="SequelizeDatabaseError"){
              alertMessage(res.name+" "+res.original.code,5000)
            }else{
              alertMessage(res,2000);
            }
            this.setState({
              searcheduserId: '-1',
              firstname: '',
              lastname: ''
            })
            this.displayTable()
          }
        })//register then

  }

  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }

//    this.getAuthsNotInUAuths()
//    this.getAllUserAuths()
  }

  displayTable() {
    this.getAuthsNotInUAuths()
    this.getAllUserAuths()
  }

  getAuthsNotInUAuths(){
    const userData={
      userId: this.state.searcheduserId
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 2     // id
    }
    getAuthsNotInUAuths(userData,adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){
        this.setState({
          authlists: [...res]
        })
      }else if(res===false){
        alertMessage("you have no rights to views auths",2000)
      }else{
        alertMessage(res,2000);
      }
    })
  }

  getAllUserAuths(){
    const userData={
      userId: this.state.searcheduserId
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 13     // id
    }
    getAllUserAuths(userData,adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){
        this.setState({
          userauthlists: [...res]
        })
      }else if(res===false){
        alertMessage("you have no rights to views users auths",2000)
      }else{
        alertMessage(res,2000);
      }
    })
  }


  addUserAuth(newuserauth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 10     // id
    }

    addUserAuth(newuserauth,adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){

      }else if(res===false){
        alertMessage("you have no rights to add users auths",2000)
      }else{
        alertMessage(res,2000);
      }
      this.displayTable()
    })

  }

  deleteUserAuth(existuserauth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 12     // id
    }

    deleteUserAuth(existuserauth,adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){
      }else if(res===false){
        alertMessage("you have no rights to delete users auths",2000)
      }else{
        alertMessage(res,2000);
      }
      this.displayTable()
    })

  }

  onMouseDownLeft(e){
//    console.log(e.target.id);
//    alertMessage(e.target.id);
    if(this.state.searcheduserId!=='-1'){
      const newuserauth = {
        newuserId: this.state.searcheduserId,
        newauthId: e.target.id
      }

      this.addUserAuth(newuserauth)

    }else{
      alertMessage("please specify user id.",2000)
    }

  }

  onMouseDownRight(e){
    if(this.state.searcheduserId!=='-1'){

      const existuserauth = {
        existuserId: this.state.searcheduserId,
        existauthId: e.target.id
      }

      this.deleteUserAuth(existuserauth)
    }else{
      alertMessage("please specify user id.",2000)
    }
  }

  getSearchUserAuths(searchUserAuth){
    const userData={
      userId: this.state.searcheduserId
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 13     // id
    }
    getSearchUserAuths(userData,searchUserAuth,adminAuth).then(res => {
      if(res!==false && res!==null){
        this.setState({
          authlists: [...res]
        })
      }
    })
  }


  sortOperationL(e){
    this.setState({
      authlists: sortAlgorithm(this.state.authlists,e.target.value,"asc")
    })
  }

  sortOperationR(e){
    this.setState({
      userauthlists: sortAlgorithm(this.state.userauthlists,e.target.value,"asc")
    })
  }


  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllUserAuthLink = (
      <div>
        <div>
            <br></br>
            <br></br>
            <input
              type="text"
              name="userId"
              placeholder="User Id"
              value={this.state.userId}
              onChange={this.onChange}
            />
            <div>
              <input type="button" value="Search" onClick={this.onSearch}></input><em></em>
            </div>
            <br></br>
            <label>Name: {this.state.lastname.toUpperCase()+', '+ this.state.firstname.toUpperCase()}</label>
            <br></br>
        </div>

        <div className="user-authlist-pos-left">
          <input
            type="text"
            name="searchUserAuth"
            placeholder="Search"
            value={this.state.searchUserAuth}
            onChange={this.onChangeSearchUserAuth}
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
                  <tr key={i} className="table-list">
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
          <select onChange={this.sortOperationR}>
            <option value='id'>id</option>
            <option value='name'>name</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User's AUTH</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userauthlists.map((data,i)=>{
                return (
                  <tr key={i} className="table-list">
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
          { (myrole.role === 'superadmin') ? viewAllUserAuthLink : null }
        </div>
      </div>
    )
  }
}

export default UserAuths
