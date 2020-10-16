import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//import jwt_decode from 'jwt-decode'

import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'

import { getstoreownersapps,updatestoreownerapp,getstoreowner } from './StoreOwnerFunctions'
import { /*addstoreuser,*/addStore } from '../Stores/StoreFunctions'
import { updateuserrole,updatestoreuserBelongs } from '../../UserFunctions'
import { addUserAuth } from '../../Auth/UserAuths/UserAuthOperations'
import { getRoleAuth } from '../../Auth/RoleAuths/RoleAuthOperations'


class ViewStoreOwnersApplicationPending extends Component {

  constructor(props) {
    super(props)
    this.state = {
      itemsWaiting: [],
      errors:{}
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.getWaitingStoreApps()
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  //  getWaitingStoreApps = () =>{
    getWaitingStoreApps(){
      const storeowner = {
        status: 'Waiting'
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
            itemsWaiting: [...res]
          })
        }
      })
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    //#################################################################################
    dispPendingDiv = () => {
      this.getWaitingStoreApps()
      this.props.handleHideDivs()
      var mydiv = document.getElementById('pendingDiv');
      ReactDOM.findDOMNode(mydiv).style.display='block';

    }
    ////////////////////////////////////////////////////////////////////////////////////////////
  onReject = (e) =>{
    e.preventDefault()
  //  console.log(e.target.id)
      const storeowner = {
        id: e.target.id,
        status: 'Rejected'
      }
      const adminAuth={
        token: localStorage.usertoken,
        authId: 46     // id
      }
      updatestoreownerapp(storeowner,adminAuth).then(res => {
        this.getWaitingStoreApps()
  //      this.getAcceptedStoreApps()
  //      this.getRejectedStoreApps()
      })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
addStore(resuserId,resdataapp){
  const store = {
    name: resdataapp.storename,
    location: resdataapp.location,
    owner: resdataapp.owner_name,
    isdisabled: 'false'
  }
  const adminAuth3={
    token: localStorage.usertoken,
    authId: 19     // id
  }
  //add to store
  addStore(store,adminAuth3).then(storeId => {
//      alert(res.data.msg)
    if(storeId===null){
      alertMessage("store already exist",2000)
    }else if(storeId===false){
      alertMessage("you have no rights to add store",2000)
    }else{
      this.updateStoreUserBelongs(resuserId,storeId)
    }
  })
}
////////////////////////////////////////////////////////////////////////////////////////////
updateuserrole(resdataapplication){
  const userrole = {
    email: resdataapplication.email,
    role: 'storeowner'
  }
  const adminAuth4={
    token: localStorage.usertoken,
    authId: 42     // id
  }
  //update the user to admin owner
  updateuserrole(userrole,adminAuth4).then(userId => {
    if(userId===false){
      alertMessage("you have no rights to update user role",2000);
    }else if(userId===null){
      alertMessage("user not found",2000);
    }else if(userId!==undefined){
      this.addStore(userId,resdataapplication);
      this.getRoleAuth(userId)
    }
  })
}
////////////////////////////////////////////////////////////////////////////////////////////
updateStoreUserBelongs(resuserId,respstoreId){
  const user = {
    id: resuserId,
    storeId: respstoreId
  }
  const adminAuth4={
    token: localStorage.usertoken,
    authId: 38     // id
  }
  //update the user to store owner
  //console.log(user);
  updatestoreuserBelongs(user,adminAuth4).then(resp => {
    //console.log(resp);
})
}
////////////////////////////////////////////////////////////////////////////////////////////
addingUserAuths(userId,token1){
  const adminAuth5={
    token: localStorage.usertoken,
    authId: 10     // id
  }
  var a;
//      console.log(token1);
  for(a=0; a<token1.length; a++){
    const newuserauth = {
      newauthId: token1[a].authId,    //operation for store owners
      newuserId: userId
    }
    //create auth for user store owner
    addUserAuth(newuserauth,adminAuth5).then(res => {
    //  console.log("hi")
    })
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
getRoleAuth(userId){
  const roleauth = {
    role: 'storeowner'
  }
  const adminAuth6={
    token: localStorage.usertoken,
    authId: 17     // id
  }
  //get auths of a certin role
  getRoleAuth(roleauth,adminAuth6).then(listofRoleAuth =>{
    if(listofRoleAuth===false){
      alertMessage("you have no rights to get role auths",2000)
    }else if(listofRoleAuth===null){
      alertMessage("role auth not found",2000)
    }else if(listofRoleAuth!==undefined){
      this.addingUserAuths(userId,listofRoleAuth)
    }
  })
}
////////////////////////////////////////////////////////////////////////////////////////////
getStoreNewData(applicationId){
  const storeowner2 = {
    id: applicationId.id
  }
  const adminAuth2={
    token: localStorage.usertoken,
    authId: 45     // id
  }
  //get data to add to new store
  getstoreowner(storeowner2,adminAuth2).then(storeownerAppData => {
    if(storeownerAppData===false){
      alertMessage("you have no rights to get store owner application",2000)
    }else if(storeownerAppData===null){
      alertMessage("store owner application not found",2000)
    }else if(storeownerAppData!==undefined){
      this.updateuserrole(storeownerAppData);
    }
  })
}
////////////////////////////////////////////////////////////////////////////////////////////
/*  Steps
    0. update store owner application()
    1.getstore owner infos (applicationId) => storeownerAppData
    2.update userrole(storeownerAppData) => userId
    3a. add store(userId,dataapplication) => storeId
    3b. get role auths(userId) => listofRoleAuth
    4a. add store user belong(userId,storeId) =>
    4b. adding user auths(userid,listofRoleAuth)=>
      4b-1. loop ( add user auth() )
*/
onAccept = (e)=>{
e.preventDefault()
//  console.log(e.target.id)
  const storeownerapp = {
    id: e.target.id,
    status: 'Accepted'
  }
  const adminAuth={
    token: localStorage.usertoken,
    authId: 46     // id
  }
  //update store owner application
  updatestoreownerapp(storeownerapp,adminAuth).then(res => {
    if(res===true){
      this.getStoreNewData(storeownerapp)
      this.getWaitingStoreApps()
    }else if(res===false){
      alertMessage("you have no rights to update store owners apps",2000)
    }else if(res===null){
      alertMessage("Store application not found.",2000)
    }
  })
}



//#########################################################################################


  //#########################################################################

  render() {

    return (
      <div id="pendingDiv">
        <h4>(Pending)</h4>
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
             {this.state.itemsWaiting.map((data,i)=>{
               return (
                 <tr key={i} className="table-list" >
                   <td> {data.id}</td>
                   <td> {data.storename}</td>
                   <td> {data.location}</td>
                   <td> {data.owner_name}</td>
                   <td> {data.email}</td>
                   <td> {data.status}</td>
                   <td id={data.id}>
                    <input type="button" name={data.id} id={data.id} value="Accept" onClick={this.onAccept}></input><em></em>
                    <input type="button" name={data.id} id={data.id} value="Reject" onClick={this.onReject}></input><em></em>
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


export default ViewStoreOwnersApplicationPending
