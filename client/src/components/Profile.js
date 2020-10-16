import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom'

import { update,remove1 } from './UserFunctions'
import { deleteUserAuth2 } from './Auth/UserAuths/UserAuthOperations'

import "../css/Profile.css"
import {alertMessage} from './alertMessage'
import { isJWTExpires } from './Auth/checkJwt'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      role:'',
      password: '',
      newpassword: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
        const token =  localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          id:decoded.id,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          email: decoded.email,
          role: decoded.role
        })
    }

  }

  dispUpdate = () => {
    var mydiv = document.getElementById('myUpdateDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  hideUpdate = () => {
    var mydiv = document.getElementById('myUpdateDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
//    this.props.dispLogin=false;
  }

  dispDelete = () => {
    var mydiv = document.getElementById('myDeleteDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  hideDelete = () => {
    var mydiv = document.getElementById('myDeleteDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
//    this.props.dispLogin=false;
  }

  onUpdate = (e) => {
    e.preventDefault()

    if (this.state.email!=="" ){
      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        newpassword: this.state.newpassword
      }

      update(user).then(res => {
          if(res===true){
            alertMessage("Updated",2000);
            this.hideUpdate()
          }else if(res===false){
            alertMessage("Incorrect Credentials",2000);
          }else{
            alertMessage("User does not exist",2000);
          }
      })
    }else{
      alertMessage("Enter corresponsing credentials",2000);
    }
    this.setState({
      password: '',
      newpassword: ''
    })

  }

  deleteUserAuth = (myid) => {
    const existuserauth = {
      existuserId: myid
    }
    deleteUserAuth2(existuserauth).then(res => {
      if(res!==false && res!==null){
      }else{
        alertMessage(res,2000);
      }
    })
  }

  onDelete = (e) => {
    e.preventDefault()

    if (this.state.password===this.state.newpassword){
      const user = {
        email: this.state.email,
        password: this.state.password
      }

      remove1(user)
        .then(res=> {
              if(res===true){
                alertMessage("Deleted",2000);
                this.deleteUserAuth(this.state.id)
                this.hideDelete()
                this.onLogOut()
              }else if(res===false){
                alertMessage("Incorrect Credentials",2000);
              }else{
                alertMessage("User does not exist",2000);
              }
            })
    }else{
      alertMessage("Password doesnt match",2000)
    }
    this.setState({
      password: '',
      newpassword: ''
    })
//    this.hideDelete()

  }

  render() {
    const profileLink = (
      <div>
          <div>
            <form>
              <div className="imgcontainer">
                <img src="icons/profile.png" alt="Avatar" className="img-profile"/>
              </div>
              <div className="container">
                <label><b>ID</b></label>
                <input className="width-100" type="text" value={this.state.id} readOnly/>
                <label><b>Firstname</b></label>
                <input className="width-100" type="text" value={this.state.first_name} readOnly/>
                <label><b>Lastname</b></label>
                <input className="width-100" type="text" value={this.state.last_name} readOnly/>
                <label><b>Username</b></label>
                <input className="width-100" type="text" value={this.state.email} readOnly/>
                <label><b>Role</b></label>
                <input className="width-100" type="text" value={this.state.role} readOnly/>
              </div>
            </form>
          </div>

          <button className="loginbtn" type="submit" onClick={this.dispUpdate}>Update Account</button>
          <button className="loginbtn" type="submit" onClick={this.dispDelete}>Delete Account</button>


          <div id="myUpdateDiv" className="modal">
            <form className="modal-content animate" onSubmit={this.onUpdate}>
              <div className="imgcontainer">
                <span onClick={this.hideUpdate} className="close"
                title="Close"> &times;
                </span>
                <img src="icons/profile.png" alt="Avatar" className="avatar"/>
              </div>
              <div className="container">
                <label><b>ID</b></label>
                <input className="width-100"  type="text" value={this.state.id} readOnly/>
                <label><b>Firstname</b></label>
                <input className="width-100"  type="text" placeholder= "Enter New Firstname" name="first_name" value={this.state.first_name} onChange={this.onChange} required/>
                <label><b>Lastname</b></label>
                <input className="width-100"  type="text" placeholder= "Enter New lastname" name="last_name" value={this.state.last_name} onChange={this.onChange} required/>
                <label><b>Username</b></label>
                <input className="width-100"  type="text" value={this.state.email} onChange={this.onChange} readOnly/>
                <label><b>Old Password</b></label>
                <input className="width-100"  type="password" placeholder= "Enter Old Password" name="password" value={this.state.password} onChange={this.onChange} required/>
                <label><b>New Password</b></label>
                <input className="width-100"  type="password" placeholder= "Enter New Password" name="newpassword" value={this.state.newpassword} onChange={this.onChange} required/>
                <button className="loginbtn" type="submit">Update</button>
              </div>
              <div className="container">
                <button type="button" onClick={this.hideUpdate} className="cancelbtn"> Cancel</button>
              </div>
            </form>
          </div>

          <div id="myDeleteDiv" className="modal">
            <form className="modal-content animate" onSubmit={this.onDelete}>
              <div className="imgcontainer">
                <span onClick={this.hideDelete} className="close"
                title="Close"> &times;
                </span>
                <img src="icons/profile.png" alt="Avatar" className="avatar"/>
              </div>
              <div className="container">
                <label><b>Enter Password</b></label>
                <input className="width-100"  type="password" placeholder= "Enter Old Password" name="password" value={this.state.password} onChange={this.onChange} required/>
                <label><b>Verify Password</b></label>
                <input className="width-100"  type="password" placeholder= "Enter New Password" name="newpassword" value={this.state.newpassword} onChange={this.onChange} required/>
                <button className="loginbtn" type="submit" >Delete</button>
              </div>
              <div className="container">
                <button type="button" onClick={this.hideDelete} className="cancelbtn"> Cancel</button>
              </div>
            </form>
          </div>

      </div>
    )

    return (
      <div>
        {localStorage.usertoken ? profileLink : ''}
      </div>
    )
  }
}

export default Profile
