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


        const products_ui = (
          <div>
            <div>
              <a href={initLinks.addproducts}>
                <button className="dropbtn font-format auths-background"></button>
                <div>Products</div>
              </a>
            </div>
          </div>
        )

        const storeadmin_ui = (
          <div>
            <div>
              <a href={initLinks.viewstoreownersapplication}>
                <button className="dropbtn font-format auths-background"></button>
                <div>Stores</div>
              </a>
            </div>
          </div>
        )

        const orderadmin_ui = (
          <div>
            <div>
              <a href='{initLinks.viewstoreownersapplication}'>
                <button className="dropbtn font-format auths-background"></button>
                <div>Order</div>
              </a>
            </div>
          </div>
        )

    return (
      <div className="nav-height header-fixed-pos">
        {products_ui}
        <br></br>
        {storeadmin_ui}
        <br></br>
        {orderadmin_ui}
      </div>
    )
  }
}

export default withRouter(Landing)
