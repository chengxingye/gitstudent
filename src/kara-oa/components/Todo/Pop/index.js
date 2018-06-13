import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

class Pop extends Component{
  render(){
    const {left, top} = this.props

    return ReactDOM.createPortal(
      <div className="KaraOAPop" style={{left, top}}>
        <div>
          <img src={require('./header.png')} alt="" />
          <button>发起聊天</button>
        </div>
        <div>
          <p>姓名：姚世祺（32898）</p>
          <p>部门：亚信软件CIT</p>
          <p>电话：13911688297</p>
          <a href="mailto: yaosq@asiainfo.com">邮件：yaosq@asiainfo.com</a>
        </div>
      </div>,
      document.body
    )
  }
}

export default Pop
