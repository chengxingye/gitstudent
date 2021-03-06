import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {inject, observer} from 'mobx-react'
import './index.scss'
import {Paging} from '../../common'
import Language from '../../../language'
import API from '../../../api'

@inject('Config')
@observer
class Modal extends Component{
  static PAGE_SIZE = 10
  static SUB_PAGE_SIZE = 15

  state = {
    typeIndex: 0,
    pageNo: 0,
    subNodeTree: null,
    subPageNo: 0,
    isFocus: false,
    keyword: '',
    result: [],
  }

  setTypeIndex = e=>{
    if(e.target.dataset.ii !== undefined){
      this.setState({
        typeIndex: Number(e.target.dataset.ii),
        pageNo: 0,
      })
    }
  }

  onToggle = id=>{
    this.props.onToggle(id)
  }

  onChange = pageNo=>{
    this.setState({pageNo})
  }

  onSubChange = subPageNo=>{
    this.setState({subPageNo})
  }

  showSubView = subNodeTree=>{
    this.setState({
      subNodeTree,
      subPageNo: 0,
    })
  }

  closeSubView = ()=>{
    this.setState({subNodeTree: null})
  }

  stopPropagation = e=>{
    e.stopPropagation()
  }

  close = ()=>{
    this.props.onClose()
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

  keywordChange = e=>{
    let keyword = e.target.value
    this.setState({keyword})
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.search(keyword)
    }, 200)
  }

  search = keywords=>{
    if(!keywords) return
    API.post('/api/v1.0.0/webhook/apps.search', {
      language: this.props.Config.language==='zh' ? 'cn' : 'en',
      platform: 'web',
    }).end(null, {
      keywords,
      isHighlight: true,
    }).then(res=>{
      this.setState({
        result: res.webAppInfos,
      })
    })
  }

  keywordClear = ()=>{
    this.setState({
      keyword: ''
    })
  }

  render(){
    const {typeIndex, pageNo, subNodeTree, subPageNo, isFocus, keyword, result} = this.state
    const LConfig = Language[this.props.Config.language]['Tool']
    let isZH = this.props.Config.language==='zh'
    const {types, nodeTree, webAppInfos, customList} = this.props
    let uiList = []
    if(types[typeIndex]){
      uiList = nodeTree[types[typeIndex].id]
    }
    let count = Math.ceil(uiList.length/Modal.PAGE_SIZE)
    let subCount = 0
    if(subNodeTree){
      subCount = Math.ceil(subNodeTree.children.length/Modal.SUB_PAGE_SIZE)
    }

    return ReactDOM.createPortal(
      <div className="KaraOAModal" onClick={this.close}>
        {
          !keyword && subNodeTree
          ?
          <div className="subView"  onClick={this.stopPropagation}>
            <h1 className="s-default">
              {LConfig['MODAL_TITLE']}&nbsp;>&nbsp;<span className="s-primary">{isZH ? webAppInfos[subNodeTree.id].appName : webAppInfos[subNodeTree.id].appNameEn}</span>
              <i onClick={this.closeSubView} className="kara-oa-font">&#xe655;</i>
            </h1>
            <section className="s-b-default">
              <ul>
                {
                  subNodeTree.children.map(app=>app.id).slice(subPageNo*Modal.SUB_PAGE_SIZE, (subPageNo+1)*Modal.SUB_PAGE_SIZE).map(id=>(
                    <li key={id}>
                      <b className="s-bg-primary" style={{backgroundImage: `url(${webAppInfos[id].icon})`}}>
                        {
                          customList.includes(id)
                          ?
                          <sup className="s-bg-slicer-dot">{LConfig['MODAL_ADDED']}</sup>
                          :
                          null
                        }
                      </b>
                      <p className="s-lesser">{isZH ? webAppInfos[id].appName : webAppInfos[id].appNameEn}</p>
                      <div>
                        {
                          customList.includes(id)
                          ?
                          <button className="s-secondary s-bg-panel-title" onClick={e=>this.onToggle(id)}>{LConfig['MODAL_CANCEL']}</button>
                          :
                          <button className="s-secondary s-bg-panel-title" onClick={e=>this.onToggle(id)}>{LConfig['MODAL_ADD']}</button>
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div>
                {
                  subCount>1
                  ?
                  <Paging 
                    no={subPageNo} 
                    count={subCount}
                    onChange={this.onSubChange} />
                  :
                  null
                }
              </div>
              <button className="s-b-default s-bg-panel-title s-secondary" onClick={this.closeSubView}>{LConfig['MODAL_BACK']}</button>
            </section>
          </div>
          :
          <div className="default"  onClick={this.stopPropagation}>
            <h1 className="s-default">
              {LConfig['MODAL_TITLE']}
              <i onClick={this.close} className="kara-oa-font">&#xe655;</i>
            </h1>
            <form className={isFocus ? 'focus s-b-primary' : 's-bg-input-a s-b-default'}>
              <i className={`kara-oa-font ${isFocus ? 's-primary' : 's-tips'}`}>&#xe61c;</i>
              <input className="s-default" type="text" onFocus={this.keywordFocus} onBlur={this.keywordBlur} value={keyword} onChange={this.keywordChange} />
              {
                keyword
                ?
                <i onClick={this.keywordClear} className={`kara-oa-font ${isFocus ? 's-primary' : 's-tips'}`}>&#xe655;</i>
                :
                null
              }
            </form>
            {
              keyword
              ?
              <ul>
                {
                  result.map(app=>(
                    <li className="s-bg-info" key={app.id}>
                      {
                        customList.includes(app.id)
                        ?
                        <sup className="s-bg-primary">{LConfig['MODAL_ADDED']}</sup>
                        :
                        null
                      }
                      <b className="s-bg-primary" style={{backgroundImage: `url(${app.icon})`}}></b>
                      <div>
                        <h1 className="s-lesser" dangerouslySetInnerHTML={{__html: isZH ? app.appName : app.appNameEn}}></h1>
                        <h2 className="s-secondary" dangerouslySetInnerHTML={{__html: `${LConfig['MODAL_KEYWORD']}：${isZH ? app.keywords : app.keywordsEn}`}}></h2>
                        <p className="s-tips" dangerouslySetInnerHTML={{__html: `${LConfig['MODAL_INTRODUCTION']}：${isZH ? app.appDesc : app.appDescEn}`}}></p>
                      </div>
                      {
                        customList.includes(app.id)
                        ?
                        <button className="s-bg-primary s-bg-slicer-dot" onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_CANCEL']}</button>
                        :
                        <button className="s-bg-primary" onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_ADD']}</button>
                      }
                    </li>
                  ))
                }
              </ul>
              :
              <section className="s-b-default">
                <ol onClick={this.setTypeIndex}>
                  {
                    types.map((type, index)=>(
                      <li 
                        key={type.id}
                        data-ii={index}
                        className={`s-secondary s-b-default s-bg-panel-title ${index===typeIndex ? 'active' : ''}`}>{isZH ? type.name : type.nameEn}</li>
                    ))
                  }
                </ol>
                <ul>
                  {
                    uiList.slice(pageNo*Modal.PAGE_SIZE, (pageNo+1)*Modal.PAGE_SIZE).map(app=>(
                      <li key={app.id}>
                        <b className="s-bg-primary" style={{backgroundImage: `url(${webAppInfos[app.id].icon})`}}>
                          {
                            customList.includes(app.id)
                            ?
                            <sup className="s-bg-slicer-dot">{LConfig['MODAL_ADDED']}</sup>
                            :
                            null
                          }
                        </b>
                        <p className="s-lesser">{isZH ? webAppInfos[app.id].appName : webAppInfos[app.id].appNameEn}</p>
                        <div>
                          {
                            webAppInfos[app.id].canCustom!==1
                            ?
                            null
                            :
                            (
                              customList.includes(app.id)
                              ?
                              <button className="s-secondary s-bg-panel-title" onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_CANCEL']}</button>
                              :
                              <button className="s-secondary s-bg-panel-title" onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_ADD']}</button>
                            )
                          }
                          {
                            app.children&&app.children.length>0
                            ?
                            <button className="s-secondary s-bg-panel-title" onClick={e=>this.showSubView(app)}>{LConfig['MODAL_DETAIL']}</button>
                            :
                            null
                          }
                        </div>
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
        }
      </div>,
      document.getElementById('web')||document.getElementById('client')
    )
  }
}

export default Modal
