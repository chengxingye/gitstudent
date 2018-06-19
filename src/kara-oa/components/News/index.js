import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import Language from '../../language'

@inject('Config')
@observer
class News extends Component{
  render(){
    const LConfig = Language[this.props.Config.language]['News']
    return (
      <div className="News">
        <header>{LConfig['TITLE']}</header>
        <section>
          <header>
            <b></b>
            <div>
              <h1>高念书定调亚信软件2018：“三新四能” ···</h1>
              <p>
                1月25日消息（岳明）在刚刚过去的2017年，亚信软亚信软亚信软
                <sub>来源：亚信白皮书</sub>
              </p>
            </div>
          </header>
          <ul>
            <li>“习语”论人才 习近平“习语”论人才 习近平<sub>来源：亚信白皮书</sub></li>
            <li>习近平十大金句 习近习近平十大金句 习近<sub>来源：亚信白皮书</sub></li>
            <li>中国更高层次开放按下中国更高层次开放按下<sub>来源：同事圈话题</sub></li>
          </ul>
        </section>
      </div>
    )
  }
}

export default News
