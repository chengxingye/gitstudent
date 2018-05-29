import React, {Component} from 'react'
import {Redirect, Route, Router, Switch} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import KaraOA from './kara-oa'
import {hot} from 'react-hot-loader'

class Frame extends Component{
  history = createBrowserHistory({
    basename: `/`
  })

  render(){
    return (
      <Router history={this.history}>
        <Switch>
          <Route path="/oa" component={KaraOA} />
          <Redirect to="/oa" />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(Frame)
