import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'


import '../css/Navbar.css'

import {alertMessage} from './alertMessage'
import { isJWTExpires } from './Auth/checkJwt'

const initLinks = require('.././initLinks')


class NavbarUser extends Component {

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

    const services_ui = (
        <div  className="sadmin-auths-btn-pos">
          <a href={initLinks.apply4storeowner}>
            <button className="dropbtn font-format auths-background"></button>
            <div className="navbar-btn-label">Store</div>
          </a>
        </div>
    )


    return (
      <div className="nav-height header-fixed-pos">
          {services_ui}
      </div>
    )
  }
}

export default withRouter(NavbarUser)
