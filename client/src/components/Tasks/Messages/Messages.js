import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MyInbox from './MyInbox'
import MySentBox from './MySentBox'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
import { sortAlgorithm } from '../../Algorithms/sortAlgo'

import { getAllInboxMessages,getAllSentboxMessages,getMsgInfo,updateRead,createMsg,findUserEmail } from './MessagesOperation'
import jwt_decode from 'jwt-decode'

import "../../../css/Messages.css"

class Messages extends Component {
  constructor(){
    super();
    this.state={
      id: '',
      from: '',
      to: '',
      to_role: '',
      content: '',
      date_created: '',
      messagelists_inbox: [],
      messagelists_sentbox: [],
      read: 'false',
      replyMsg: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
  }

  //#######################################################################################

  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
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
    }else{
      this.getAllInboxMessages()
      this.dispInboxMsgDiv()
    }
  }
  //#########################################################################################

  getAllInboxMessages = () => {
    const user={
      userEmail: jwt_decode(localStorage.usertoken).email
    }
    getAllInboxMessages(user).then(res => {
      if(res.length===0){
        alertMessage("Empty Messages",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          //messagelists_inbox: [...res]
          messagelists_inbox: sortAlgorithm([...res],"date_created","desc")
        })
      }
    })
  }
//#########################################################################################
  getAllSentboxMessages = () => {
    const user={
      userEmail: jwt_decode(localStorage.usertoken).email
    }
    getAllSentboxMessages(user).then(res => {
      if(res.length===0){
        alertMessage("Empty Messages",2000);
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        this.setState({
          //messagelists_inbox: [...res]
          messagelists_sentbox: sortAlgorithm([...res],"date_created","desc")
        })
      }
    })
  }
  //#########################################################################################

  dispViewMsgDiv = () => {
    var mydiv = document.getElementById('myViewInboxMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
  //#########################################################################################

  hideViewMsgDiv = () => {
    var mydiv = document.getElementById('myViewInboxMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.getAllInboxMessages()

    this.setState({
      to: '',
      from: '',
      replyMsg: '',
      content: '',
    })
  }
  //#########################################################################################

  dispViewMsgDivOnly = () => {
    var mydiv = document.getElementById('myViewSentboxMsgDivOnly');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
  //#########################################################################################

  hideViewMsgDivOnly = () => {
    var mydiv = document.getElementById('myViewSentboxMsgDivOnly');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.getAllSentboxMessages()
    this.setState({
      to: '',
      from: '',
      content: '',
    })
  }
  //#################################################################################

  dispCreateMsgDiv = () => {
    var mydiv = document.getElementById('myCreateMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
  }
  //#########################################################################################

  hideCreateMsgDiv = () => {
    var mydiv = document.getElementById('myCreateMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    this.getAllInboxMessages()
    this.setState({
      to: '',
      from: '',
      content: ''
    })

  }
//#################################################################################
  dispInboxMsgDiv = () => {
    var mydiv = document.getElementById('myInboxMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';
    var mydiv2 = document.getElementById('mySentboxMsgDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='none';
    this.getAllInboxMessages()
  }
  //#########################################################################################

  hideInboxMsgDiv = () => {
    var mydiv = document.getElementById('myInboxMsgDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    var mydiv2 = document.getElementById('mySentboxMsgDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='block';
    this.getAllSentboxMessages()
  }



//##############################################################
  onMouseDown_ViewMsg = (e) =>{
      const mymsgId = {
        id: e.target.id
      }
      getMsgInfo(mymsgId).then(res => {
        if(res===null){
          alertMessage("Unable to get message infos",2000);
        }else{
          this.setState({
            from: res.from,
            to: res.to,
            content: res.content,
            date_created: res.date_created
          })

          const mymsgId2 = {
            id: res.id,
            read: 'true'
          }
          updateRead(mymsgId2).then(res=>{

          })
          this.dispViewMsgDiv()
        }
      })
    }

//##############################################################
  onMouseDown_ViewMsgOnly = (e) =>{
      const mymsgId = {
        id: e.target.id
      }

      getMsgInfo(mymsgId).then(res => {
        if(res===null){
          alertMessage("Unable to get message infos",2000);
        }else{
          this.setState({
            from: res.from,
            to: res.to,
            content: res.content,
            date_created: res.date_created
          })

          const mymsgId2 = {
            id: res.id,
            read: 'true'
          }
          updateRead(mymsgId2).then(res=>{

          })
          this.dispViewMsgDivOnly()
        }
      })
    }
//####################################################################
  onSendReply = (e) => {
    e.preventDefault();
    const mymsgData = {
      to: this.state.from,
      to_role: null,
      from: this.state.to,
      content: this.state.replyMsg,
      read: 'false'
    }

    createMsg(mymsgData).then(res=>{
      if(res===true){
        this.hideViewMsgDiv()
        alertMessage("Message Sent",2000);
        this.setState({
          to: '',
          from: '',
          content: '',
        })
      }else if(res.name==="SequelizeDatabaseError"){
        alertMessage(res.name+" "+res.original.code,5000)
      }else{
        alertMessage("Message Not Sent",2000);
      }
    })

  }
  //#########################################################################################

onCreateMsg = (e) => {
  e.preventDefault()
  const mymsgData = {
    to: this.state.to,
    to_role: null,
    from: jwt_decode(localStorage.usertoken).email,
    content: this.state.content,
    read: 'false'
  }

  createMsg(mymsgData).then(res=>{
    if(res===true){
      this.hideCreateMsgDiv()
      alertMessage("Message Sent",2000);
      this.setState({
        to: '',
        from: '',
        content: '',
      })
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      alertMessage("Message Not Sent",2000);
    }
  })
}
//#########################################################################################

onChangeAndFindTo = (e) =>{
  e.preventDefault()
  this.setState({ [e.target.name]: e.target.value })

  const myuserEmail = {
    email: e.target.value
  }

  findUserEmail(myuserEmail).then(res=>{
    if(res){
      this.enableMsgTextArea()
    }else if(res.name==="SequelizeDatabaseError"){
      alertMessage(res.name+" "+res.original.code,5000)
    }else{
      this.disableMsgTextArea()
    }
  })

}
//#########################################################################################

enableMsgTextArea = () => {
  var mydiv = document.getElementById('mymsgtextarea');
  ReactDOM.findDOMNode(mydiv).readOnly=false;
  ReactDOM.findDOMNode(mydiv).placeholder="Enter msg here";
}
//#########################################################################################

disableMsgTextArea = () => {
  var mydiv = document.getElementById('mymsgtextarea');
  ReactDOM.findDOMNode(mydiv).readOnly=true;
  ReactDOM.findDOMNode(mydiv).placeholder="Email doesnt exist";
}


  render() {
    return (
      <div className="myMSG">
          <br />
          <h2>Messages</h2>
          <div>
            <button onClick={this.dispInboxMsgDiv}>Inbox</button>
            <button onClick={this.hideInboxMsgDiv}>Sentbox</button>
          </div>

          <MyInbox
            messagelists_inbox={this.state.messagelists_inbox}
            onMouseDown_ViewMsg={this.onMouseDown_ViewMsg}
            onSendReply={this.onSendReply}
            hideViewMsgDiv={this.hideViewMsgDiv}
            from={this.state.from}
            content={this.state.content}
            onChange={this.onChange}
            replyMsg={this.state.replyMsg}
          />

          <MySentBox
            messagelists_sentbox={this.state.messagelists_sentbox}
            onMouseDown_ViewMsgOnly={this.onMouseDown_ViewMsgOnly}
            hideViewMsgDivOnly={this.hideViewMsgDivOnly}
            to={this.state.to}
            content={this.state.content}

          />


          <div id="myCreateMsgDiv" className="modal">
            <form className="modal-content2 animate" onSubmit={this.onCreateMsg}>
              <div className="imgcontainer">
                <span onClick={this.hideCreateMsgDiv} className="close"
                title="Close"> &times;
                </span>
              </div>
              <div className="container">
                <label><b>To</b></label>
                <input className="width-100"  type="text" name="to" value={this.state.to} onChange={this.onChangeAndFindTo} required/>
                <label><b>Content</b></label>
                <textarea id="mymsgtextarea" className="width-100"  type="text" name="content"  value={this.state.content} rows="5" onChange={this.onChange} readOnly required/>
                <button className="loginbtn" type="submit">Send</button>
              </div>
              <div className="container">
                <button type="button" onClick={this.hideCreateMsgDiv} className="cancelbtn"> Cancel</button>
              </div>
            </form>
          </div>

          <div className="createmsg-btn-pos">
            <button className="createmsg-background" onClick={this.dispCreateMsgDiv}></button>
          </div>

        </div>

    )
  }
}

export default Messages
