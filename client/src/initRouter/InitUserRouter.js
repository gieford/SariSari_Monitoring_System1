import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Profile from '../components/Profile'
const initLinks = require('../initLinks')

class InitUserRouter extends Component {


  render() {

    return (
      <div>
        <Route exact path={initLinks.profile} component={Profile} />
      </div>

    )
  }
}

export default InitUserRouter
