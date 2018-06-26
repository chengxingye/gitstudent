import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {inject, observer} from 'mobx-react'
import './index.scss'
import {Paging} from '../../common'
import Language from '../../../language'

@inject('Config')
@observer
class Modal extends Component{
  static PAGE_SIZE = 10

  state = {
    typeIndex: 0,
    pageNo: 0,
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

  render(){
    const {typeIndex, pageNo} = this.state
    const LConfig = Language[this.props.Config.language]['Tool']
    let isZH = this.props.Config.language==='zh'
    const {types, nodeTree, webAppInfos, customList} = this.props
    let uiList = []
    if(types[typeIndex]){
      uiList = nodeTree[types[typeIndex].id]
    }
    let count = Math.ceil(uiList.length/Modal.PAGE_SIZE)

    return ReactDOM.createPortal(
      <div className="KaraOAModal">
        <div>
          <h1>
            {LConfig['MODAL_TITLE']}
            <i className="kara-oa-font">&#xe655;</i>
          </h1>
          <form className="focus">
            <i className="kara-oa-font">&#xe61c;</i>
            <input type="text" />
            <i className="kara-oa-font">&#xe655;</i>
          </form>
          <section>
            <ol onClick={this.setTypeIndex}>
              {
                types.map((type, index)=>(
                  <li 
                    key={type.id}
                    data-ii={index}
                    className={index===typeIndex ? 'active' : ''}>{isZH ? type.name : type.nameEn}</li>
                ))
              }
            </ol>
            <ul>
              {
                uiList.slice(pageNo*Modal.PAGE_SIZE, (pageNo+1)*Modal.PAGE_SIZE).map(app=>(
                  <li key={app.id}>
                    <b style={{backgroundImage: `url(${webAppInfos[app.id].icon})`}}>
                      {
                        customList.includes(app.id)
                        ?
                        <sup>{LConfig['MODAL_ADDED']}</sup>
                        :
                        null
                      }
                    </b>
                    <p>{isZH ? webAppInfos[app.id].appName : webAppInfos[app.id].appNameEn}</p>
                    <div>
                      {
                        customList.includes(app.id)
                        ?
                        <button onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_CANCEL']}</button>
                        :
                        <button onClick={e=>this.onToggle(app.id)}>{LConfig['MODAL_ADD']}</button>
                      }
                      {
                        app.children&&app.children.length>0
                        ?
                        <button>{LConfig['MODAL_DETAIL']}</button>
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
        </div>
      </div>,
      document.body
    )
  }
}

export default Modal
