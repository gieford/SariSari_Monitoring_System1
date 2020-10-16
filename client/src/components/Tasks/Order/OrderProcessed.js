import React, { Component } from 'react'

import {alertMessage} from '../../alertMessage'
import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class OrderProcessed extends Component {
  constructor() {
    super()
    this.state = {
      errors: {}
    }
  }

  //#######################################################################################

  logOut() {
    alertMessage("JWT Expired. Logging OUT!",1000)
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
    window.history.pushState(null,null,'/')
  }


  componentDidMount() {
    if(isJWTExpires(localStorage.usertoken)){
      this.logOut()
    }

  }
//#########################################################
//#########################################################
  render() {
    return (
        <div id="orderProcessedDiv">
          <h3>Processed Orders</h3>
          <table className="responsiveTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {this.props.orderProcessedDatalist.map((data,i)=>{
                  return (
                    <tr key={i} className="table-list" >
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{data.id}</td>
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{data.fullName}</td>
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{data.address}</td>
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{data.contact}</td>
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{data.date}</td>
                      <td id={data.id} onClick={this.props.listorderMouseDown}>{(Math.round(data.totalprice*100)/100).toFixed(2)}</td>
                      <td>
                        <button id={data.id} onClick={this.props.onDeliveredOrder}>Delivered</button>
                      </td>

                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
    )
  }

}

export default OrderProcessed
