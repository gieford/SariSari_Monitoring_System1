import React, { Component } from 'react'

import { Route } from 'react-router-dom'

import Order from '../components/Tasks/Order/Order'

const initLinks = require('../initLinks')


class InitOrderRouter extends Component {


  render() {
    return (
      <div>

        <Route exact path={initLinks.orders} component={Order} />

      </div>
    )
  }
}

export default InitOrderRouter
