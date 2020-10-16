import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ApplyforStoreOwner from '../components/Tasks/Services/ApplyforStoreOwner'
import ViewStoreOwnersApplication from '../components/Tasks/Services/ViewStoreOwnersApplication'
import StoreUser from '../components/Tasks/Stores/StoreUser'
import Stores from '../components/Tasks/Stores/Stores'
const initLinks = require('../initLinks')

class InitStoreRouter extends Component {


  render() {

    return (
      <div>
        <Route exact path={initLinks.apply4storeowner} component={ApplyforStoreOwner} />
        <Route exact path={initLinks.viewstoreownersapplication} component={ViewStoreOwnersApplication} />
        <Route exact path={initLinks.storeuser} component={StoreUser} />
        <Route exact path={initLinks.stores} component={Stores} />
      </div>

    )
  }
}

export default InitStoreRouter
