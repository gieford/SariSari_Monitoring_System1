import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'


import { getUnreadMessages } from './Tasks/Messages/MessagesOperation'

const initLinks = require('.././initLinks')

class MessageBar extends Component {

  constructor(){
    super();
    this.state={
      unread_msgs_len: '',
      errors: {}
    }
  }

  //#######################################################################################
  componentDidMount() {
    this.getUnreadMessages()
  }

  getUnreadMessages = () => {
    const user={
      userEmail: jwt_decode(localStorage.usertoken).email,
      read: 'false'
    }
    getUnreadMessages(user).then(res => {
      if(res===null){
        this.setState({
          unread_msgs_len: 0
        })
      }else{
        this.setState({
          unread_msgs_len: res.length
        })
      }
    })

  }

  render() {
    return (
      <div className="messagebar-btn-pos">
        <a href={initLinks.messages}>
          <button className="home-button">
            <img className="home-img" alt='' src="icons/message.jpg"></img>
            {
              (this.state.unread_msgs_len>0)?
              <label className="mycart-number-label-pos">{this.state.unread_msgs_len}</label>:
              <label className="mycart-number-label-pos">{}</label>
            }
          </button>
        </a>
      </div>
    )
  }
}

export default MessageBar
