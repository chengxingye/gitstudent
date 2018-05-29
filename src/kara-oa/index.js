import React, {Component} from 'react'
import {observable, configure} from 'mobx'
import {Provider} from 'mobx-react'
import Index from './components/Index'
import Store1 from './stores/Store1'
import Store2 from './stores/Store2'

configure({
  enforceActions: true,
  isolateGlobalState: true,
})

class KaraOAStore extends Component{
  constructor(props){
    super(props)
    Store1.setXXX('heihei')
    Store2.setXXX2('haha')
  }

  render(){
    return (
      <Provider {...{Store1, Store2}} >
        <Index />
      </Provider>
    )
  }
}

export default KaraOAStore
