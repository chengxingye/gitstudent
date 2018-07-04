import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import ReactDOM from 'react-dom'
import './index.scss'
import Language from '../../../language'

@inject('Config')
@observer
class Pop extends Component{
  stopPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
  }

  render(){
    const LConfig = Language[this.props.Config.language]['Todo']
    const {node, left, top} = this.props

    return ReactDOM.createPortal(
      <div onClick={this.stopPropagation} className="KaraOAPop s-b-default" style={{left, top}}>
        <div>
          <img src={node.headIcon} alt="" />
          <button className="s-bg-primary small">{LConfig['POP_BUTTON']}</button>
        </div>
        <div>
          <p className="s-secondary">{LConfig['POP_NAME']}：{node.accountName}（{node.nodeEmployeeNo}）</p>
          <p className="s-secondary">{LConfig['POP_ORG']}：{node.dept}</p>
          <p className="s-secondary">{LConfig['POP_TEL']}：{node.phone}</p>
          <a className="s-info" href={`mailto: ${node.email}`}>{LConfig['POP_MAIL']}：{node.email}</a>
        </div>
      </div>,
      document.getElementById('web')||document.getElementById('client')
    )
  }
}

export default Pop
