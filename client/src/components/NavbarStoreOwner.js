import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'


import '../css/Navbar.css'
import {alertMessage} from './alertMessage'
import { isJWTExpires } from './Auth/checkJwt'

const initLinks = require('.././initLinks')


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      myrole: '',
      errors: {}
    }
  }

  //#######################################################################################
  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }
  //#######################################################################################
  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }
  }
  //#######################################################################################


  render() {

    const storeproducts_ui = (
        <div className="sadmin-auths-btn-pos">
          <a href={initLinks.storeproducts}>
            <button className="dropbtn font-format auths-background"></button>
            <div className="navbar-btn-label">Products</div>
          </a>
        </div>
    )

    const orderadmin_ui = (
        <div className="sadmin-products-btn-pos">
          <a href={initLinks.orders}>
            <button className="dropbtn font-format auths-background"></button>
            <div className="navbar-btn-label">Order</div>
          </a>
        </div>
    )

    const storeusers_ui = (
        <div  className="sadmin-stores-btn-pos">
          <a href={initLinks.storeuser}>
            <button className="dropbtn font-format auths-background"></button>
            <div className="navbar-btn-label">Store</div>
          </a>
        </div>
    )



    return (
      <div className="nav-height header-fixed-pos">
        {storeproducts_ui}
        <br></br>
        {storeusers_ui}
        <br></br>
        {orderadmin_ui}
      </div>
    )
  }
}

export default withRouter(Landing)
