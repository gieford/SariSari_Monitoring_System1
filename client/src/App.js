import React, { Component } from 'react'
import { BrowserRouter as Router, } from 'react-router-dom'

import Navbar from './components/Navbar'
import InitRouter from './initRouter/InitRouter'
import InitUserRouter from './initRouter/InitUserRouter'
import InitAuthRouter from './initRouter/InitAuthRouter'
import InitProductRouter from './initRouter/InitProductRouter'
import InitOrderRouter from './initRouter/InitOrderRouter'
import InitStoreRouter from './initRouter/InitStoreRouter'

import './css/App.css'

class App extends Component {
  render() {
//    const home = "/"+localStorage.usertoken+"home"

    return (
      <Router>
        <div className="App">
          <Navbar />
          <InitRouter />
          <InitAuthRouter />
          <InitProductRouter />
          <InitStoreRouter />
          <InitOrderRouter />
          <InitUserRouter />

        </div>
      </Router>
    )
  }
}

export default App
