import React, {Component} from 'react'
import {Redirect, Route, Router, Switch} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import 'normalize.css'
import './skin/default.css'
import KaraOA from '../kara-oa'
import {hot} from 'react-hot-loader'

class Frame extends Component{
  history = createBrowserHistory({
    basename: `/`
  })

  state = {
    language: 'zh',
    token: 'uuf8m6kuPpYv04a7cPVzd53f4XPnCZ0N',
    karagw: 'https://xin-sandbox.asiainfo.com:16020',
  }

  toggleLanguage = ()=>{
    this.setState({
      language: this.state.language==='zh' ? 'en' : 'zh'
    })
  }

  render(){
    const {language, token, karagw} = this.state

    return (
      <React.Fragment>
        <button onClick={this.toggleLanguage}>{language}</button>
        <Router history={this.history}>
          <Switch>
            <Route path="/oa" render={props=>(
              <KaraOA 
                {...props} 
                language={language} 
                token={token} 
                karagw={karagw} />
            )} />
            <Redirect to="/oa" />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default hot(module)(Frame)
