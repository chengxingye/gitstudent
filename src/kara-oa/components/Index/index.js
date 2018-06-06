import React, {Component} from 'react'
import './index.scss'
import Tool from '../Tool'
import Todo from '../Todo'
import Ad from '../Ad'
import Schedule from '../Schedule'
import News from '../News'

class KaraOA extends Component{
  render(){
    return (
      <div className="KaraOA">
        <header></header>
        <section>
          <Tool />
          <Todo />
          <Ad />
          <Schedule />
          <News />
        </section>
      </div>
    )
  }
}

export default KaraOA
