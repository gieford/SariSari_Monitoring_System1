import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import RoleAuth from '../components/Auth/RoleAuths/RoleAuths'
import Auths from '../components/Auth/Auths'
import ManageUsers from '../components/Auth/ManageUsers'
import UserAuths from '../components/Auth/UserAuths/UserAuths'
const initLinks = require('../initLinks')


class InitAuthRouter extends Component {


  render() {


    return (
      <div>
        <Route exact path={initLinks.roleauths} component={RoleAuth} />
        <Route exact path={initLinks.auths} component={Auths} />
        <Route exact path={initLinks.userauths} component={UserAuths} />
        <Route exact path={initLinks.manageusers} component={ManageUsers} />

      </div>

    )
  }
}

export default InitAuthRouter
