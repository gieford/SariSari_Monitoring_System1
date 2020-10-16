import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'

import { registerstoreowner } from './StoreOwnerFunctions'

class ApplyforStoreOwner extends Component {
  constructor() {
    super()
    this.state = {
      storename: '',
      owner_name: '',
      location: '',
      email:'',
      status:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }


  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
      const newStoreOwner = {
        storename: this.state.storename,
        owner_name: this.state.owner_name,
        email: jwt_decode(localStorage.usertoken).email,
        location: this.state.location,
        status: 'Waiting'
      }

      registerstoreowner(newStoreOwner).then(res => {
        if(res){
          alertMessage("Application Done. Waiting for admin to confim.",5000)
        }else{
          alertMessage("Store Already Exist. Please review your credentials.",5000)
        }
        this.props.history.push(`/home`)
      })
  }

  render() {
    return (
      <div className="login-form">
        <h1>Apply for Store Owner</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="width-100"
            type="text"
            name="storename"
            placeholder="Name of the Store"
            value={this.state.storename}
            onChange={this.onChange}
            required
          />
          <input
            className="width-100"
            type="text"
            name="owner_name"
            placeholder="Owner Name"
            value={this.state.owner_name}
            onChange={this.onChange}
            required
          />
          <input
            className="width-100"
            type="text"
            name="location"
            placeholder="Location"
            value={this.state.location}
            onChange={this.onChange}
            required
          />
        <button  className="loginbtn" type="submit">
          Apply
        </button>
      </form>
     </div>
    )
  }
}

export default ApplyforStoreOwner
