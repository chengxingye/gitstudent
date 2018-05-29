import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import './index.scss'

@inject('Store2')
@observer
class KaraOAOne extends Component{
  componentDidMount(){
    const {Store2} = this.props
    setInterval(()=>{
      Store2.setXXX2(Math.floor(Math.random()*1000+1))
    }, 1000)
  }

  render(){
    const {Store2} = this.props

    return (
      <div className="KaraOAOne">
        <div>{Store2.xxx2}</div>
      </div>
    )
  }
}

export default KaraOAOne
