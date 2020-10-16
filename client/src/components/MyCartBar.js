import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

//import {alertMessage} from './alertMessage'


const initLinks = require('.././initLinks')

class MyCartBar extends Component {

  constructor(){
    super();
    this.state={
      orderedPcount: 0,
      errors: {}
    }
  }

  //#######################################################################################
  componentDidMount() {
//    this.getUnreadMessages()

  }
/*
  getUnreadMessages = () => {
    const user={
      userEmail: jwt_decode(localStorage.usertoken).email,
      read: 'false'
    }
    getUnreadMessages(user).then(res => {
      if(res===true){
        this.setState({
          unread_msgs: true
        })
      }else{
        this.setState({
          unread_msgs: false
        })
      }
    })

  }

  */

  myCartWasPress = (e) =>{
    e.preventDefault();
    if(!localStorage.usertoken){
      this.props.mycartbuttonPressed("true")
    }else{
      this.props.history.push(initLinks.mycart)
    }
  }


  render() {
    return (
      <div className={(this.props.isLogin==="true")?"mycart-btn-pos-after-login":"mycart-btn-pos-before-login"}>

          <button className="home-button" onClick={this.myCartWasPress}>
              <img className="home-img" alt='' src="icons/mycart.jpg"></img>
              <label className="mycart-number-label-pos">{this.props.orderedPcount}</label>
          </button>

      </div>
    )
  }
}

export default MyCartBar
