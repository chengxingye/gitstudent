import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import './index.scss'

@inject('Store1', 'Store2')
@observer
class KaraOA extends Component{
  componentDidMount(){
    const {Store1, Store2} = this.props
    setInterval(()=>{
      Store1.setXXX(new Date().toLocaleTimeString())
      Store2.setXXX2(Math.floor(Math.random()*1000+1))
    }, 1000)
  }

  render(){
    const {Store1, Store2} = this.props

    return (
      <div className="KaraOA">
        <div>
          <div>{Store1.xxx}</div>
          <div><i className="font">&#xe6ae;</i></div>
        </div>
        <div>
          <div><i className="font">&#xe6a8;</i></div>
        </div>
        <div>
          <div><i className="font">&#xe6ae;</i></div>
          <div>{Store2.xxx2}</div>
        </div>
      </div>
    )
  }
}

export default KaraOA
