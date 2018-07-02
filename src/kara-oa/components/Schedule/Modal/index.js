import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

class Modal extends Component{
  constructor(props){
    super(props)
    this.current = React.createRef()
    this.current_future = React.createRef()
    this.all = React.createRef()
  }

  onCancel = ()=>{
    this.props.onCancel()
  }

  onOK = ()=>{
    let current = this.current.current
    let current_future = this.current_future.current
    let all = this.all.current
    if(current.checked){
      this.props.onOK(current.value)
    }else if(current_future.checked){
      this.props.onOK(current_future.value)
    }else if(all.checked){
      this.props.onOK(all.value)
    }
  }

  stopPropagation = e=>{
    e.stopPropagation()
  }

  render(){
    const {method} = this.props
    let txt = method==='delete' ? '删除' : '编辑'

    return ReactDOM.createPortal(
      <div className="KaraOAScheduleModal" onClick={this.onCancel}>
        <div onClick={this.stopPropagation}>
          <header>您正在{txt}重复事件</header>
          <label>
            <input ref={this.current} name="type" type="radio" value="current" defaultChecked></input>&nbsp;&nbsp;仅{txt}当前事件
          </label>
          <label>
            <input ref={this.current_future} name="type" type="radio" value="current_future"></input>&nbsp;&nbsp;{txt}当前事件及后续此重复事件
          </label>
          <label>
            <input ref={this.all} name="type" type="radio" value="all"></input>&nbsp;&nbsp;{txt}所有此重复事件
          </label>
          <footer>
            <button onClick={this.onCancel}>取消</button>
            <button onClick={this.onOK} className="ok">确定</button>
          </footer>
        </div>
      </div>,
      document.getElementById('web')||document.getElementById('client')
    )
  }
}

export default Modal
