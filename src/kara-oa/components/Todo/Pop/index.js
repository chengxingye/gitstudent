import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import ReactDOM from 'react-dom'
import './index.scss'
import Language from '../../../language'

@inject('Config')
@observer
class Pop extends Component{
  render(){
    const LConfig = Language[this.props.Config.language]['Todo']
    const {left, top} = this.props

    return ReactDOM.createPortal(
      <div className="KaraOAPop" style={{left, top}}>
        <div>
          <img src={require('./header.png')} alt="" />
          <button>{LConfig['POP_BUTTON']}</button>
        </div>
        <div>
          <p>{LConfig['POP_NAME']}：姚世祺（32898）</p>
          <p>{LConfig['POP_ORG']}：亚信软件CIT</p>
          <p>{LConfig['POP_TEL']}：13911688297</p>
          <a href="mailto: yaosq@asiainfo.com">{LConfig['POP_MAIL']}：yaosq@asiainfo.com</a>
        </div>
      </div>,
      document.body
    )
  }
}

export default Pop
