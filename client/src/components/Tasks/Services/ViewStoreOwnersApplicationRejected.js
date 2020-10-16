import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//import jwt_decode from 'jwt-decode'

import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'

import { getstoreownersapps } from './StoreOwnerFunctions'

class ViewStoreOwnersApplicationRejected extends Component {

  constructor(props) {
    super(props)
    this.state = {
      itemsRejected: [],
      errors:{}
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.getRejectedStoreApps()
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  getRejectedStoreApps(){
    const storeowner = {
      status: 'Rejected'
    }
    const adminAuth={
      token: localStorage.usertoken,
      authId: 45     // id
    }
    getstoreownersapps(storeowner,adminAuth).then(res => {
      if(res===false){
        alertMessage("you have no rights to view store application",2000)
      }else{
        this.setState({
          itemsRejected: [...res]
        })
      }
    })
  }

  onCancel = (e) =>{
    e.preventDefault()
    this.props.handleonCancel(e.target.id)
  }

  //#################################################################################
  dispRejectedDiv = () => {
    this.getRejectedStoreApps()
    this.props.handleHideDivs()
    var mydiv = document.getElementById('rejectedDiv');
    ReactDOM.findDOMNode(mydiv).style.display='block';

  }

  render() {

    return (
      <div id="rejectedDiv">
        <h4>(Rejected)</h4>
        <form>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>STORE_NAME</th>
                <th>LOCATION</th>
                <th>OWNER</th>
                <th>EMAIL</th>
                <th>STATUS</th>
                <th>OPERATION</th>
              </tr>
            </thead>
            <tbody>
             {this.state.itemsRejected.map((data,i)=>{
               return (
                 <tr key={i} className="table-list">
                   <td> {data.id}</td>
                   <td> {data.storename}</td>
                   <td> {data.location}</td>
                   <td> {data.owner_name}</td>
                   <td> {data.email}</td>
                   <td> {data.status}</td>
                   <td id={data.id}>
                    <input type="button" name={data.id} id={data.id} value="Cancel" onClick={this.onCancel}></input><em></em>
                   </td>
                 </tr>
               )
             })}
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}


export default ViewStoreOwnersApplicationRejected
