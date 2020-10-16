import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

//import { addstoreuser,getstoreId } from '../Stores/StoreFunctions'
import { resetStoreUserPass,registerStoreUser,modifyStoreUser,getUserInfos } from '../../UserFunctions'
import { deleteUserAuth1_5,addUserAuth } from '../../Auth/UserAuths/UserAuthOperations'
import { getRoleAuth } from '../../Auth/RoleAuths/RoleAuthOperations'
import { getAllStoreUsers } from './StoreFunctions'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'

class StoreUser extends Component {

  constructor() {
    super()
    this.state = {
      userId: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: '',
      storeid: '',
      storeuserlists: [],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeRole = (e) => {
    this.setState({ role: e.target.value })
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
      this.getAllStoreUsers()

    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  getAllStoreUsers(){
    const userData = {
      storeId: jwt_decode(localStorage.usertoken).storeId
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 37     // id
    }
    getAllStoreUsers(userData,adminAuth).then(res=>{
      if(res===false){
        alertMessage("you have no rights to view store users",5000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
          this.setState({ storeuserlists: [...res]})
      }else{}
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////
  addMultipleUserAuths(userId,token1){

    const adminAuth5={
      token: localStorage.usertoken,
      authId: 49     // id
    }
    var a;
      for(a=0; a<token1.length; a++){
        const newuserauth = {
          newauthId: token1[a].authId,    //operation for store owners
          newuserId: userId
        }
        //create auth for user store owner
        addUserAuth(newuserauth,adminAuth5).then(res => {
        //  console.log("hi")
        })
      }

  }
//#######################################################
////////////////////////////////////////////////////////////////////////////////////////////
deleteMultipleUserAuths(userId,token1){
  const userauth = {
    existuserId: userId
  }
  const adminAuth4={
    token: localStorage.usertoken,
    authId: 50     // id
  }
  deleteUserAuth1_5(userauth,adminAuth4).then(res => {
    this.addMultipleUserAuths(userId,token1)
  })


}
  ////////////////////////////////////////////////////////////////////////////////////////////
  getUserAuth(userId){
    const roleauth = {
      role: this.state.role
    }
    const adminAuth6={
      token: localStorage.usertoken,
      authId: 48     // id
    }
    //get auths of a certin role
    getRoleAuth(roleauth,adminAuth6).then(resp2 =>{
      if(resp2===false){
        alertMessage("you have norights to view store user auths",3000)
      }else if(resp2===null){
        alertMessage("empty auths",3000)
      }else if(resp2.name==="SequelizeDatabaseError"){
        alertMessage(resp2.name+" "+resp2.original.code,5000)
      }else if(resp2!==undefined){
        this.deleteMultipleUserAuths(userId,resp2)
      }else{  }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  addToUser(){

    const newStoreUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      storeId: jwt_decode(localStorage.usertoken).storeId
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 36     // id
    }

    registerStoreUser(newStoreUser,adminAuth).then(res => {
      if(res===false){
        alertMessage("You have no rights to add storeuser",3000)
      }else if(res===null){
        alertMessage("User already exist",3000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        alertMessage("User Added",3000)
        this.getUserAuth(res)
        this.getAllStoreUsers()
      }
      this.clearData()
    })
  }
//##################################################################################
  clearData = () =>{
    this.setState({
      userid: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: '',
    })
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////
modifyUser(){
  const eStoreUser = {
    id: this.state.userId,
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    email: this.state.email,
    role: this.state.role,
    storeId: (this.state.role==='user')?'-1':jwt_decode(localStorage.usertoken).storeId
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 38     // id
  }

  modifyStoreUser(eStoreUser,adminAuth).then(res => {
    if(res===false){
      alertMessage("You have no rights to update storeuser",3000)
    }else if(res===null){
      alertMessage("User not found",3000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      alertMessage("User Modified",3000)
      this.getUserAuth(this.state.userId)
      this.getAllStoreUsers()
    }
    this.clearData()
  })
}

//####################################################
//////////////////////////////////////////////////////////////////////////////////////////////////////
deleteUser(){
  const eStoreUser = {
    id: this.state.userId,
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    email: this.state.email,
    role: 'user',
    storeId: -1
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 38     // id
  }

  modifyStoreUser(eStoreUser,adminAuth).then(res => {
    if(res===false){
      alertMessage("You have no rights to update storeuser",3000)
    }else if(res===null){
      alertMessage("User not found",3000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      alertMessage("User Modified",3000)
      this.setState({
        role: 'user'
      })
      this.getUserAuth(this.state.userId)
      this.getAllStoreUsers()
    }
    this.clearData()
  })
}
//////////////////////////////////////////////////////////////////////////////////////////
  onCreate = (e) => {
    e.preventDefault()

    if (this.state.email!=="" ){
      this.addToUser()
    }else{
    //  console.log('hi');
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
    onModify = (e) => {
      e.preventDefault()

      if (this.state.email!==""){
        this.modifyUser()
      }else{
      //  console.log('hi');
      }
    }
  //#######################################################################################
  //////////////////////////////////////////////////////////////////////////////////////////
    onDelete = (e) => {
      e.preventDefault()

      if (this.state.email!==""){
        this.deleteUser()
      }else{
      //  console.log('hi');
      }
    }
//#########################################################################################################
  onResetPass = (e) => {
    e.preventDefault()
    if(this.state.userId!==""){
      const existuser = {
        id: this.state.userId,
        password: this.state.userId+this.state.email,
        storeId: this.state.storeId
      }

      const adminAuth={
        token: localStorage.usertoken,
        authId: 38     // id
      }

      resetStoreUserPass(existuser,adminAuth).then(res => {
        console.log(res);
        if(res===true){
          alertMessage("Done.The new pssword is "+this.state.userId+this.state.email,5000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }
      })
    }else{
      alertMessage("Please specify user",3000)
    }
  }

//#####################################################################################
  onMouseDown = (e) =>{
//    alert(e.target.id);
//    alert(e.target.id);
    const existuser = {
      id: e.target.id
    }
    this.setState({
      userId: e.target.id
    })

    const adminAuth={
      token: localStorage.usertoken,
      authId: 37     // id
    }

    getUserInfos(existuser,adminAuth).then(res => {
      this.setState({
        userId: res.id,
        last_name: res.last_name,
        first_name: res.first_name,
        email: res.email,
        role: res.role,
        storeId: res.storeId
      })
    })
  }

  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllStoreUserLink = (
      <div>
        <div className="user-authlist-pos-left">
          <br></br>
          <h3>Store User List</h3>
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
                <th>LastName</th>
                <th>FirstName</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.storeuserlists.map((data,i)=>{
                return (
                  <tr key={i}  className="table-list">
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.id}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.last_name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.first_name}</td>
                    <td id={data.id} onMouseDown={this.onMouseDown}> {data.role}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="userlist-button-right">
          <div>
            <form>
              <br/>
              <br/>
              <label>Id</label>
              <input
                className="width-100"
                type="text"
                name="userId"
                placeholder="User ID"
                value={this.state.userId}
                onChange={this.onChange}
                readOnly={true}
              />
              <label>FirstName</label>
              <input
                className="width-100"
                type="text"
                name="first_name"
                placeholder="Firstname"
                value={this.state.first_name}
                onChange={this.onChange}
                required
              />
              <label>Last Name</label>
              <input
                className="width-100"
                type="text"
                name="last_name"
                placeholder="Lastname"
                value={this.state.last_name}
                onChange={this.onChange}
                required
              />
              <label>User Name</label>
              <input
                className="width-100"
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
              <label>password</label>
              <input
                className="width-100"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
              <label>Role</label>
              <select value={this.state.role} onChange={this.onChangeRole} className="width-100">
                <option value=''></option>
                <option value='storeuser'>storeuser</option>
                <option value='user'>user</option>
                <option value='storeowner' disabled={true}>storeowner</option>
              </select>
            </form>
            <br />
            <div>
              <input type="button" value="Add" onClick={this.onCreate}></input><em></em>
              <input type="button" value="Delete" onClick={this.onDelete}></input><em></em>
              <input type="button" value="Modify" onClick={this.onModify}></input><em></em>
              <input type="button" value="Reset Password" onClick={this.onResetPass}></input><em></em>
            </div>
         </div>
        </div>
      </div>
    )
    return (
      <div>
        { (myrole.role === 'storeowner') ? viewAllStoreUserLink : null }
      </div>
    )
  }

}

export default StoreUser
