import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

//import {alertMessage} from '../../alertMessage'
//import { isJWTExpires } from '../../Auth/checkJwt'
//import { sortAlgorithm } from '../../Algorithms/sortAlgo'


class MyOrder extends Component {

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

    const myorderTable = (
      <div>
        <table className="responsiveTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderDatalist.map((data,i)=>{
              return (
                <tr key={i} className="table-list">
                  <td id={data.id} onClick={this.props.listorderMouseDown}>{data.id}</td>
                  <td id={data.id} onClick={this.props.listorderMouseDown}>{data.store_name}</td>
                  <td id={data.id} onClick={this.props.listorderMouseDown}>{data.date}</td>
                  <td id={data.id} onClick={this.props.listorderMouseDown}>
                    This transaction is <b id={data.id} onClick={this.props.listorderMouseDown}>{data.status}</b>
                    {(data.status==='canceled' && data.storeuserIdProcess!==-1)?' by the user of the store.':'.'}
                    </td>
                  <td id={data.id} onClick={this.props.listorderMouseDown}>P{(Math.round(data.totalprice*100)/100).toFixed(2)}</td>
                  <td><button id={data.id} onClick={this.props.onCancelMyOrder} disabled={(data.status==='pending')?false:true}>Cancel My Order</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )

    return (
      <div  id="myOrderDiv" >
        <h1>My Order</h1>
        <div>

          {(this.props.orderDatalist.length!==0) ? myorderTable :
            <h2>Empty Order</h2>
          }

        </div>

        <div id="listoOrderProductsDiv" className="modal">
          <form className="modal-content animate  myorder-modal-background">
            <div className="imgcontainer">
              <span onClick={this.props.hidelistOrderProductsDiv} className="close"
              title="Close"> &times;
              </span>
              <h3>ORDER LIST</h3>
            </div>
            <div className="container">

              {this.props.orderIndDatalist.map((data,i)=>{
                return (
                  <tr key={i}>
                    <div key={i}>
                      <div className="myorder-image-pos-left">
                        <img src={"icons/products/"+data.product_name+".jpg"} alt='' className="landing-display-ind-products"></img>
                      </div>
                      <div className="myorder-label-pos-right">
                        <b>{data.product_name}</b>
                        <br />
                          {data.count}pc(s)
                        <br/>
                          P {(Math.round(data.price*100)/100).toFixed(2)}
                        <br />
                          P {(Math.round(data.price*data.count*100)/100).toFixed(2)}
                        <br />
                          {(data.isAvailable==="true")?'Available':'Unavailable'}
                      </div>
                    </div>
                  </tr>
                )
              })}
            </div>
            <div className="container">
              <button type="button" onClick={this.props.hidelistOrderProductsDiv} className="cancelbtn"> Close</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export default MyOrder
