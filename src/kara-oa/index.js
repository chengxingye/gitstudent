import React, {Component} from 'react'
import {configure} from 'mobx'
import {Provider} from 'mobx-react'
import Index from './components/Index'
import Config from './stores/Config'
import './font/font.css'

configure({
  enforceActions: true,
  isolateGlobalState: true,
})

class KaraOAStore extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {match} = this.props

    return (
      <Provider Config={Config} >
        <Index />
      </Provider>
    )
  }
}

export default KaraOAStore
