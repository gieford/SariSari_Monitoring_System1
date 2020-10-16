import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

//import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class MySentbox extends Component {

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
      <div id="mySentboxMsgDiv" >
        <h3>Sentbox</h3>
        <table className="message-table-width">
          <thead>
          </thead>
          <tbody>
            {this.props.messagelists_sentbox.map((data,i)=>{
              return (
                <tr key={i} className="list">
                  <td id={data.id} onMouseDown={this.props.onMouseDown_ViewMsgOnly} className="align-text-left msg-height">
                    <img src="icons/read_message.jpg" alt='' className="message-read-unread-pos"></img>
                    To: {data.to} {data.date_created}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


      <div id="myViewSentboxMsgDivOnly" className="modal">
        <form className="modal-content2 animate">
          <div className="imgcontainer">
            <span onClick={this.props.hideViewMsgDivOnly} className="close"
            title="Close"> &times;
            </span>
          </div>
          <div className="container">
            <label><b>To</b></label>
            <input className="width-100"  type="text" value={this.props.to} readOnly/>
            <label><b>Content</b></label>
            <textarea className="width-100"  type="text" value={this.props.content} rows="5" readOnly/>
            <br />
            <br />
          </div>
          <div className="container">
            <button type="button" onClick={this.hideViewMsgDivOnly} className="cancelbtn"> Cancel</button>
          </div>
        </form>
      </div>
    </div>

    )
  }
}

export default MySentbox
