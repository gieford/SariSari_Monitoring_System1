import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

//import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class MyInbox extends Component {

  constructor(){
    super();
    this.state={
      errors: {}
    }
  }

  //#######################################################################################
  componentDidMount() {
  }

  render() {
    return (
      <div id="myInboxMsgDiv" >
        <h3>Inbox</h3>
        <table className="message-table-width">
          <thead>
          </thead>
          <tbody>
            {this.props.messagelists_inbox.map((data,i)=>{
              return (
                <tr key={i} className="list">
                  <td id={data.id} onMouseDown={this.props.onMouseDown_ViewMsg} className="align-text-left msg-height">
                    {
                      (data.read==='true')?
                      <img src="icons/read_message.jpg" alt='' className="message-read-unread-pos"></img>
                      :<img src="icons/message.jpg" alt='' className="message-read-unread-pos"></img>
                    }
                    From:  <b>{data.from}</b> {data.date_created}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div id="myViewInboxMsgDiv" className="modal">
          <form className="modal-content2 animate" onSubmit={this.props.onSendReply}>
            <div className="imgcontainer">
              <span onClick={this.props.hideViewMsgDiv} className="close"
              title="Close"> &times;
              </span>
            </div>
            <div className="container">
              <label><b>From</b></label>
              <input className="width-100"  type="text" value={this.props.from} readOnly/>
              <label><b>Content</b></label>
              <textarea className="width-100"  type="text" value={this.props.content} rows="5" readOnly/>
              <br />
              <br />
              <label><b>Reply</b></label>
              <textarea className="width-100"  type="text" placeholder= "Enter Reply here" name="replyMsg" value={this.props.replyMsg} onChange={this.props.onChange} rows="5" required/>

              <button className="loginbtn" type="submit">Send</button>
            </div>
            <div className="container">
              <button type="button" onClick={this.props.hideViewMsgDiv} className="cancelbtn"> Cancel</button>
            </div>
          </form>
        </div>

      </div>

    )
  }
}

export default MyInbox
