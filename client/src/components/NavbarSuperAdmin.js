import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'


import '../css/Navbar.css'
import '../css/Home.css'
import {alertMessage} from './alertMessage'
import { isJWTExpires } from './Auth/checkJwt'

const initLinks = require('.././initLinks')



class NavbarSuperAdmin extends Component {

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


  dispAuthDiv = () => {
    var mydiv = document.getElementById('myAuthDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  dispStoreDiv = () =>{
    var mydiv = document.getElementById('myStoreDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }

  hideAuthDiv = () => {
    var mydiv = document.getElementById('myAuthDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
//    this.props.dispLogin=false;
  }

  hideStoreDiv = () => {
    var mydiv = document.getElementById('myStoreDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
//    this.props.dispLogin=false;
  }

  render() {
    const auth_ui = (
      <div>
        <div className="sadmin-auths-btn-pos">
          <button className="auths-background" onClick={this.dispAuthDiv}></button>
          <div className="navbar-btn-label">Auths</div>
        </div>

        <div id="myAuthDiv" className="modal">
          <form className="modal-content animate">
            <div className="imgcontainer">
              <span onClick={this.hideAuthDiv} className="close"
              title="Close"> &times;
              </span>
            </div>
            <br></br>
            <div className="container">
              <a href={initLinks.auths}>
                <div>
                    <img className="home-img" alt='' src="icons/home.png"></img>
                    Auths
                </div>
              </a>
              <hr></hr>
              <a href={initLinks.roleauths}>
                <div>
                      <img className="home-img" alt='' src="icons/home.png"></img>
                    RoleAuths
                </div>
              </a>
              <hr></hr>
              <a href={initLinks.userauths}>
                <div>
                        <img className="home-img" alt='' src="icons/home.png"></img>
                      UserAuths
                </div>
              </a>
              <hr></hr>
              <a href={initLinks.manageusers}>
                <div>
                        <img className="home-img" alt='' src="icons/home.png"></img>
                      ManageUser
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
    )

    const products_ui = (
        <div className="sadmin-products-btn-pos">
          <a href={initLinks.products}>
            <button className="auths-background"></button>
            <div className="navbar-btn-label">Products</div>
          </a>
        </div>
    )

    const storeadmin_ui = (
      <div>
        <div className="sadmin-stores-btn-pos">
          <button className="auths-background" onClick={this.dispStoreDiv}></button>
          <div className="navbar-btn-label">Store</div>
        </div>

        <div id="myStoreDiv" className="modal">
          <form className="modal-content animate">
            <div className="imgcontainer">
              <span onClick={this.hideStoreDiv} className="close"
              title="Close"> &times;
              </span>
            </div>
            <br></br>
            <div className="container">
              <a href={initLinks.viewstoreownersapplication}>
                <div>
                    <img className="home-img" alt='' src="icons/home.png"></img>
                    Store Application
                </div>
              </a>
              <hr></hr>
              <a href={initLinks.stores}>
                <div>
                      <img className="home-img" alt='' src="icons/home.png"></img>
                    Stores
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
    )

    const orderadmin_ui = (
        <div className="sadmin-order-btn-pos">
          <a href={initLinks.order}>
            <button className="auths-background"></button>
            <div className="navbar-btn-label">Order</div>
          </a>
        </div>
    )


    return (
      <div className="header-fixed-pos">
        {auth_ui}
        <br></br>
        {products_ui}
        <br></br>
        {storeadmin_ui}
        <br></br>
        {orderadmin_ui}
      </div>
    )
  }
}

export default withRouter(NavbarSuperAdmin)
