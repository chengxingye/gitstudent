import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {Paging} from '../../common'

class Modal extends Component{
  state = {
    keyword: '',
    isFocus: false,
  }

  constructor(props){
    super(props)
    this.el = document.createElement('div')
    this.el.className = "KaraOAModal"
  }

  componentDidMount(){
    document.body.appendChild(this.el)
  }

  componentWillUnmount(){
    document.body.removeChild(this.el)
  }

  keywordChange = e=>{
    this.setState({
      keyword: e.target.value
    })
  }

  keywordClear = ()=>{
    this.setState({
      keyword: ''
    })
  }

  keywordFocus = ()=>{
    this.setState({
      isFocus: true
    })
  }

  keywordBlur = ()=>{
    this.setState({
      isFocus: false
    })
  }

  close = ()=>{
    this.props.onClose()
  }

  render(){
    const {keyword, isFocus} = this.state

    return ReactDOM.createPortal(
      <div>
        <h1>自定义功能<i onClick={this.close} className="kara-oa-font">&#xe655;</i></h1>
        <form className={isFocus ? 'focus' : ''}>
          <i className="kara-oa-font">&#xe61c;</i>
          <input type="text" onFocus={this.keywordFocus} onBlur={this.keywordBlur} value={keyword} onChange={this.keywordChange} />
          {
            keyword
            ?
            <i onClick={this.keywordClear} className="kara-oa-font">&#xe655;</i>
            :
            null
          }
        </form>
        {
          keyword
          ?
          <ul>
            <li className="added">
              <figure>
                <img src={require('./icon.png')} alt="" />
                <p>办公用品采购</p>
              </figure>
              <div>
                <h1>薪资自助服务</h1>
                <h2>关键字：工资，薪水</h2>
                <p>简介：支持员工对当月及历史月份的薪资查询</p>
              </div>
              <button>已添加</button>
            </li>
            <li>
              <figure>
                <img src={require('./icon.png')} alt="" />
                <p>办公用品采购</p>
              </figure>
              <div>
                <h1>薪资自助服务</h1>
                <h2>关键字：工资，薪水</h2>
                <p>简介：支持员工对当月及历史月份的薪资查询</p>
              </div>
              <button>添加</button>
            </li>
          </ul>
          :
          <section>
            <ol>
              <li className="active">场景</li>
              <li>MIS</li>
              <li>HR</li>
              <li>财务支撑</li>
              <li>运营管理</li>
              <li>供应管理</li>
            </ol>
            <ul>
              <li className="added">
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
              <li>
                <b></b>
                <p>MIS在线</p>
              </li>
            </ul>
            <Paging no={1} count={3} />
          </section>
        }
      </div>,
      this.el
    )
  }
}

export default Modal
