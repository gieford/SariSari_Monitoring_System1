import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'

import ProfileBar from './ProfileBar'


import {alertMessage} from './alertMessage'

import '../css/Navbar.css'

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
  componentDidMount() {
//    this.getOrderedProductcCount()

  }

  //#######################################################################################
  onLogOut = (e) => {
    e.preventDefault()

    alertMessage("Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    localStorage.removeItem('orderedproducts')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }

  handleOrderProducts = (orderedProducts) =>{
    console.log(orderedProducts.length);
    this.setState({
      orderproductcount: orderedProducts.length
    })
  }


  render() {

    const home_ui = (
        <div>
          <div className="home-btn-pos">
            <a href={initLinks.home}>
              <button className="home-button">
                <img className="home-img" alt='' src="icons/home.png"></img>
              </button>
              <div className="navbar-btn-label">Home</div>
            </a>
          </div>
          <ProfileBar />
          <button className="logoutbtn" type="submit" onClick={this.onLogOut}>Logout</button>
        </div>
    )

    return (
      <div className="nav-height header-fixed-pos">
          {localStorage.usertoken ? home_ui : ''}
      </div>
    )
  }
}

export default withRouter(Landing)
