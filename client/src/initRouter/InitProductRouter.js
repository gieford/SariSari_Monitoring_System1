import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Products from '../components/Tasks/ProductFunctions/Products'
import StoreProducts from '../components/Tasks/ProductFunctions/StoreProducts'

const initLinks = require('../initLinks')


class InitProductRouter extends Component {

  render() {


    return (
      <div>
        <Route exact path={initLinks.products} component={Products} />
        <Route exact path={initLinks.storeproducts} component={StoreProducts} />
      </div>

    )
  }
}

export default InitProductRouter
