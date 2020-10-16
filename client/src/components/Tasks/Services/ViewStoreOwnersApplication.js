import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//import jwt_decode from 'jwt-decode'

import ViewStoreOwnersApplicationAccepted from './ViewStoreOwnersApplicationAccepted'
import ViewStoreOwnersApplicationPending from './ViewStoreOwnersApplicationPending'
import ViewStoreOwnersApplicationRejected from './ViewStoreOwnersApplicationRejected'


import { updatestoreownerapp } from './StoreOwnerFunctions'


import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class ViewStoreOwnersApplication extends Component {

  constructor(props) {
    super(props)
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.state = {
      errors:{}
    }
  }

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }
    this.child3.current.getWaitingStoreApps()
    this.child3.current.dispPendingDiv()
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

//#################################################################################

  hideDivs = () => {
    var mydiv = document.getElementById('pendingDiv');
    ReactDOM.findDOMNode(mydiv).style.display='none';
    var mydiv2 = document.getElementById('acceptedDiv');
    ReactDOM.findDOMNode(mydiv2).style.display='none';
    var mydiv3 = document.getElementById('rejectedDiv');
    ReactDOM.findDOMNode(mydiv3).style.display='none';
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
onCancel =(storeIdApps)=>{
    //e.preventDefault()
//  console.log(e.target.id)
    const storeowner = {
      id: storeIdApps,
      status: 'Waiting'
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 46     // id
    }
    updatestoreownerapp(storeowner,adminAuth).then(res => {
      this.child3.current.getWaitingStoreApps()
      this.child2.current.getAcceptedStoreApps()
      this.child1.current.getRejectedStoreApps()
    })
  }

  displayPendingDiv = () =>{
    this.child3.current.dispPendingDiv()
  }

  displayAcceptedDiv = () =>{
    this.child2.current.dispAcceptedDiv()
  }

  displayRejectedDiv = () =>{
    this.child1.current.dispRejectedDiv()
  }

  render() {

    return (
      <div>
        <h1>Store Application</h1>
        <div>
          <button onClick={this.displayPendingDiv}>Pending</button>
          <button onClick={this.displayAcceptedDiv}>Accepted</button>
          <button onClick={this.displayRejectedDiv}>Rejected</button>
        </div>


        <ViewStoreOwnersApplicationPending
          handleonCancel={this.onCancel}
          ref={this.child3}
          handleHideDivs={this.hideDivs}
        />


        <ViewStoreOwnersApplicationAccepted
          handleonCancel={this.onCancel}
          ref={this.child2}
          handleHideDivs={this.hideDivs}
        />

        <ViewStoreOwnersApplicationRejected
          handleonCancel={this.onCancel}
          ref={this.child1}
          handleHideDivs={this.hideDivs}
        />

      </div>
    )
  }
}


export default ViewStoreOwnersApplication
