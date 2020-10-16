import React, { Component } from 'react'

import {alertMessage} from '../alertMessage'

import { registerUser,admindeleteUser,adminmodifiedUser,getAllUsers,getSearchUsers,getRoleAuths } from './UserOperation'
import { getUserInfos } from '../UserFunctions'
import { addUserAuth,deleteUserAuth1_5 } from './UserAuths/UserAuthOperations'
import jwt_decode from 'jwt-decode'

import { sortAlgorithm } from '../Algorithms/sortAlgo'
import { isJWTExpires } from './checkJwt'

import "../../css/ManageUser.css"


class ManageUsers extends Component {
  constructor() {
    super()
    this.state = {
      userId: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: '',
      storeId: '',
      userlists: [],
      searchUser: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeRole = this.onChangeRole.bind(this)
    this.onChangeSearchUser = this.onChangeSearchUser.bind(this)
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

  onChangeRole(e) {
    this.setState({ role: e.target.value })
  }
  //#######################################################################################

  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }else{
      this.getAllUsers()

    }
  }
  //#######################################################################################

  onChangeSearchUser(e) {
    this.setState({ [e.target.name]: e.target.value })
    if(e.target.value!==''){
      const searchUser = {
        searchUserName: e.target.value
      }
      this.getSearchUser(searchUser)
    }else{
      this.getAllUsers()
    }

  }
  //#######################################################################################

  getSearchUser(searchUser){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 24     // id
    }
    getSearchUsers(searchUser,adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){
        this.setState({
          userlists: [...res]
        })
      }
    })
  }
  //#######################################################################################

  sortOperationL(e){
    this.setState({
      userlists: sortAlgorithm(this.state.userlists,e.target.value,"asc")
    })
  }
  //#######################################################################################

  getAllUsers(){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 24     // id
    }

    getAllUsers(adminAuth).then(res => {
      if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==false && res!==null){
        this.setState({
          userlists: [...res]
        })
      }
    })
  }
  //#######################################################################################

  onMouseDown(e){
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
      authId: 24     // id
    }

    getUserInfos(existuser,adminAuth).then(res => {
      //const token1 = JSON.parse(localStorage.getItem('storeownersapplicationlists'))
      //localStorage.removeItem('storeownersapplicationlists')
    //  alert(res.data.storeId);
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
  //#######################################################################################

  onCreate(e) {
    e.preventDefault()

    if (this.state.email!=="" && this.state.password!==''){
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
      }

      registerUser(newUser).then(res => {
        if(res===null){
          alertMessage("already exists",2000)
        }else if(res.name==="SequelizeDatabaseError"){
          alertMessage(res.name+" "+res.original.code,5000)
        }else{
          this.modifyAuths(res,this.state.role)
          alertMessage(res+" added",2000);
        }
        this.setState({
          userId: '',
          last_name: '',
          first_name: '',
          email: '',
          password: '',
          role: '',
        })
        this.getAllUsers()
      })

    }else{
        alertMessage("Enter the corresponding data parameters to add.",2000)
    }
  }
  //#######################################################################################

  deleteUserAuth(existuserauth){
    const adminAuth={
      token: localStorage.usertoken,
      authId: 12     // id
    }

    deleteUserAuth1_5(existuserauth,adminAuth).then(res => {
      if(res===false){
        alertMessage("you have norights to delete user auths",3000)
      }else if(res===null){
        alertMessage("empty auths",3000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res===true){

      }else{  }

    })

  }

  //##############################################################################

  onDelete(e) {
    e.preventDefault()

    if (this.state.userId!==""){
        const existauth = {
          id: this.state.userId
        }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 26     // id
        }
        admindeleteUser(existauth,adminAuth).then(res => {
          if(res===true){
            alertMessage("deleted",2000)

            const existuserauth = {
              existuserId: this.state.userId
            }
            this.deleteUserAuth(existuserauth)

          }else if(res===null){
            alertMessage("data is not found",2000)
          }else if(res===false){
            alertMessage("you have no rights",2000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
            alertMessage(res,2000);
          }
          this.setState({
            userId: '',
            last_name: '',
            first_name: '',
            email: '',
            password: '',
            role: '',
          })
          this.getAllUsers()
        })//register then
      }else{
          alertMessage("Enter the corresponding data parameters to DELETE.",2000)
      }
  }
  //#######################################################################################

  onModify(e) {
    e.preventDefault()
    if (this.state.userId!==""){
        const modifiedauth = {
          id: this.state.userId,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
          storeId: this.state.storeId
          }
        const adminAuth={
          token: localStorage.usertoken,
          authId: 25     // id
        }
        adminmodifiedUser(modifiedauth,adminAuth).then(res => {
          if(res===true){
            alertMessage("updated",2000)
          }
          else if(res===false){
            alertMessage("you have no rights to update users",2000)
          }
          else if(res===null){
            alertMessage("data is not found",2000)
          }else if(res.name==="SequelizeDatabaseError"){
            alertMessage(res.name+" "+res.original.code,5000)
          }else{
            alertMessage(res,2000);
          }
          this.modifyAuths(this.state.userId,this.state.role)
          this.setState({
            userId: '',
            last_name: '',
            first_name: '',
            email: '',
            password: '',
            role: '',
          })
          this.getAllUsers()
        })//register then
      }else{
          alertMessage("Enter the corresponding data parameters to MODIFY.",2000)
      }
  }
  //#######################################################################################

  modifyAuths(myid,myrole){
    const roleData = {
      role: myrole,
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 17     // id
    }

    getRoleAuths(roleData,adminAuth).then(res => {
      if(res===false){
        alertMessage("you have norights to view store user auths",3000)
      }else if(res===null){
        alertMessage("empty auths",3000)
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else if(res!==undefined){
        this.deleteMultipleUserAuths(myid,res)
      }else{  }

    })

  }

//##################################################////////////////////////////////////////////////////////////////////////////////////////////
deleteMultipleUserAuths(userId,token1){
  const userauth = {
    existuserId: userId
  }
  const adminAuth4={
    token: localStorage.usertoken,
    authId: 12     // id
  }
  deleteUserAuth1_5(userauth,adminAuth4).then(res => {
    if(res===false){
      alertMessage("you have norights to delete user auths",3000)
    }else if(res===null){
      alertMessage("empty auths",3000)
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else if(res!==undefined){
      this.addMultipleUserAuths(userId,token1)
    }else{  }

  })


}

//###################################################
  addMultipleUserAuths(myid,authlist){
    const adminAuth2={
      token: localStorage.usertoken,
      authId: 10     // id
    }
    var a;
//      alertMessage(res.length)
    for(a=0; a<authlist.length; a++){
      const newuserauth = {
        newauthId: authlist[a].authId,    //operation for store owners
        newuserId: myid
      }
      //create auth for user store owner
      addUserAuth(newuserauth,adminAuth2).then(res => {
      //  alert("hi")

      })
    }
  }

  //#######################################################################################

  render() {
    var myrole = {
      role: localStorage.usertoken ? jwt_decode(localStorage.usertoken).role : ''
    }
    const viewAllUserLink = (
      <div>
        <div className="userlist-pos-left">
          <br></br>
          <h3>User List</h3>
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
          <table className="table-width table-design">
            <thead>
              <tr>
                <th>ID</th>
                <th>LastName</th>
                <th>FirstName</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userlists.map((data,i)=>{
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
              <input
                className="width-100"
                type="text"
                name="userId"
                placeholder="User ID"
                value={this.state.userId}
                onChange={this.onChange}
                disabled
              />
              <input
                className="width-100"
                type="text"
                name="first_name"
                placeholder="Firstname"
                value={this.state.first_name}
                onChange={this.onChange}
                required
              />
              <input
                className="width-100"
                type="text"
                name="last_name"
                placeholder="Lastname"
                value={this.state.last_name}
                onChange={this.onChange}
                required
              />
              <input
                className="width-100"
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
              <input
                className="width-100"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
              <select value={this.state.role} onChange={this.onChangeRole} className="width-100">
                <option value=''></option>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
                <option value='superadmin'>superadmin</option>
                <option value='storeowner'>storeowner</option>
                <option value='storeuser'>storeuser</option>
              </select>
              <input
                className="width-100"
                type="number"
                name="storeId"
                placeholder="Store Id"
                value={this.state.storeId}
                onChange={this.onChange}
                disabled={(this.state.role==='storeowner' || this.state.role==='storeuser')?false:true}
              />
            </form>
            <br />
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
          { (myrole.role === 'superadmin') ? viewAllUserLink : null }
        </div>
      )
  }
}

export default ManageUsers
