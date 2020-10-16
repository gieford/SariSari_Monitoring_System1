import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Landing from '../components/Landing'
import Home from '../components/Home'
import About from '../components/About'
import Messages from '../components/Tasks/Messages/Messages'
import MyCart from '../components/Tasks/MyCart/MyCart'

const initLinks = require('../initLinks')


class InitRouter extends Component {


  render() {

    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path={initLinks.home} component={Home} />
        <Route exact path={initLinks.messages} component={Messages} />
        <Route exact path={initLinks.about} component={About} />
        <Route exact path={initLinks.mycart} component={MyCart} />
      </div>

    )
  }
}

export default InitRouter
