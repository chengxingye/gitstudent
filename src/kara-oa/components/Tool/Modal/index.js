import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {Paging} from '../../common'

class Modal extends Component{
  static PAGE_SIZE = 10

  state = {
    typeIndex: 0,
    pageNo: 0,
    keyword: '',
    isFocus: false,
  }

  setTypeIndex = e=>{
    if(e.target.dataset.ii !== undefined){
      this.setState({
        typeIndex: Number(e.target.dataset.ii),
        pageNo: 0,
      })
    }
  }

  onChange = pageNo=>{
    this.setState({pageNo})
  }

  onToggle = id=>{
    this.props.onToggle(id)
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

  stopPropagation = e=>{
    e.stopPropagation()
  }

  render(){
    const {typeIndex, pageNo, keyword, isFocus} = this.state
    const {types, appGroup, apps} = this.props
    let custom = appGroup['wc_custom']
    let uiList = appGroup[types[typeIndex].id]
    let count = Math.ceil(uiList.length/Modal.PAGE_SIZE)

    return ReactDOM.createPortal(
      <div className="KaraOAModal" onClick={this.close}>
        <div onClick={this.stopPropagation}>
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
              <ol onClick={this.setTypeIndex}>
                {
                  types.map((type, index)=>(
                    <li 
                      key={type.id}
                      data-ii={index}
                      className={index===typeIndex ? 'active' : ''}>{type.name}</li>
                  ))
                }
              </ol>
              <ul>
                {
                  uiList.slice(pageNo*Modal.PAGE_SIZE, (pageNo+1)*Modal.PAGE_SIZE).map(id=>(
                    <li key={id} className={custom.includes(id) ? 'added' : ''}>
                      <b 
                        onClick={e=>this.onToggle(id)}
                        title={apps[id].appDesc} 
                        style={{backgroundImage: `url(${apps[id].icon})`}}></b>
                      <p>{apps[id].appName}</p>
                    </li>
                  ))
                }
              </ul>
              {
                count>1
                ?
                <Paging 
                  no={pageNo} 
                  count={count}
                  onChange={this.onChange} />
                :
                null
              }
            </section>
          }
        </div>
      </div>,
      document.body
    )
  }
}

export default Modal
