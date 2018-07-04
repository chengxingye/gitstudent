import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import {Paging} from '../common'
import API from '../../api'
import Language from '../../language'
import Modal from './Modal'
import {successTost} from "kara-module-tost"

@inject('Config')
@observer
class Tool extends Component{
  static COMMON_ID = 'wc_custom'
  static PAGE_SIZE = 10

  state = {
    types: [],
    typeID: Tool.COMMON_ID,
    nodeTree: {
      [Tool.COMMON_ID]: [],
    },
    webAppInfos: {},
    pageNo: 0,
    isEdit: false,
    isModal: false,
  }

  componentDidMount(){
    API.get('/api/v1.0.0/webhook/w_apps.get').end().then(res=>{
      this.setState({
        types: [
          {
            id: Tool.COMMON_ID,
            name: Language['zh']['Tool']['TYPE_COMMON'],
            nameEn: Language['en']['Tool']['TYPE_COMMON']
          },
          ...res.appCatalogInfos
        ],
        nodeTree: {
          ...res.nodeTree,
          [Tool.COMMON_ID]: res.customWebAppList.map(id=>({id})),
        },
        webAppInfos: res.webAppInfos,
      })
    })
  }

  setTypeID = e=>{
    if(e.target.dataset.id !== undefined){
      this.setState({
        typeID: e.target.dataset.id,
        pageNo: 0,
      })
    }
  }

  onDragStart = e=>{
    this.originIDs = this.state.types.map(type=>type.id).join('#')
    this.dragID = e.target.dataset.id
  }

  onDragEnter = e=>{
    let endID = e.target.dataset.id
    if(endID===Tool.COMMON_ID || endID===this.dragID) return

    let types = this.state.types
    let start = types.findIndex(type=>type.id===this.dragID)
    let end = types.findIndex(type=>type.id===endID)
    let startItem = types.splice(start, 1)[0]
    let pos = types.findIndex(type=>type.id===endID)
    if(start < end){
      pos++
    }
    types.splice(pos, 0, startItem)
    this.setState({types})
  }

  onDragEnd = e=>{
    let destIDs = this.state.types.map(type=>type.id).join('#')
    if(this.originIDs !== destIDs){
      this.saveTypes(this.state.types.filter(type=>type.id!==Tool.COMMON_ID).map(type=>type.id))
    }
  }

  saveTypes = types=>{
    API.post('/api/v1.0.0/webhook/w_custom_appCatalog.set').end(null, {
      webCustomAppCatalogIds: types
    }).then(res=>{
      successTost({msg: '调整成功', time: 1.5})
    })
  }

  onDragOver = e=>{
    let id = e.target.dataset.id
    if(id===Tool.COMMON_ID) return

    e.preventDefault()
  }

  pageChange = pageNo=>{
    this.setState({pageNo})
  }

  saveCustom = ()=>{
    API.post('/api/v1.0.0/webhook/w_custom_apps.set').end(null, {
      webCustomAppIds: this.state.nodeTree[Tool.COMMON_ID].map(app=>app.id)
    }).then(res=>{
      successTost({msg: '保存成功', time: 1.5})
    })
  }

  toggleEdit = ()=>{
    if(this.state.isEdit){
      this.saveCustom()
    }
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  deleteApp = e=>{
    e.preventDefault()
    let appID = e.target.dataset.id
    if(appID !== undefined){
      const {nodeTree, pageNo} = this.state
      let customList = nodeTree[Tool.COMMON_ID].filter(app=>app.id!==appID)
      this.setState({
        nodeTree: {
          ...nodeTree,
          [Tool.COMMON_ID]: customList,
        },
        pageNo: pageNo>=Math.ceil((customList.length+1)/Tool.PAGE_SIZE) ? pageNo-1 : pageNo
      })
    }
  }

  onToggle = id=>{
    const {nodeTree} = this.state
    let customList = nodeTree[Tool.COMMON_ID]
    if(customList.some(app=>app.id===id)){
      customList = customList.filter(app=>app.id!==id)
    }else{
      customList = [
        {id}, 
        ...customList
      ]
    }
    this.setState({
      nodeTree: {
        ...nodeTree,
        [Tool.COMMON_ID]: customList,
      }
    })
  }

  onClose = ()=>{
    this.setState({isModal: false})
  }

  showModal = ()=>{
    this.setState({isModal: true})
  }

  render(){
    const {types, typeID, nodeTree, webAppInfos, pageNo, isEdit, isModal} = this.state
    let isZH = this.props.Config.language==='zh'
    const LConfig = Language[this.props.Config.language]['Tool']
    let isCustom = typeID===Tool.COMMON_ID
    let uiList = nodeTree[typeID].map(app=>app.id)
    if(isEdit && isCustom){
      uiList = ['add', ...uiList]
    }
    let count = Math.ceil(uiList.length/Tool.PAGE_SIZE)

    return (
      <div className="Tool">
        <ol 
          className="s-bg-panel-title"
          onClick={this.setTypeID}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragEnd={this.onDragEnd}
          onDragOver={this.onDragOver}>
          {
            types.map(type=>(
              <li 
                data-id={type.id}
                key={type.id} 
                draggable={type.id!==Tool.COMMON_ID}
                className={typeID===type.id ? 's-secondary s-success active' : 's-secondary'}>{isZH ? type.name : type.nameEn}</li>
            ))
          }
        </ol>
        <nav>
          {
            uiList.slice(pageNo*Tool.PAGE_SIZE, (pageNo+1)*Tool.PAGE_SIZE).map(id=>(
              id==='add'
              ?
              <a 
                key={id}
                onClick={this.showModal}
                href='javascript:void(0);'>
                <b className="add"></b>
                <p>{LConfig['ADD']}</p>
              </a>
              :
              <a 
                target="_blank"
                key={id}
                title={isZH ? webAppInfos[id].appDesc : webAppInfos[id].appDescEn}
                href={webAppInfos[id].url}>
                <b className="s-bg-primary" style={{backgroundImage: `url(${webAppInfos[id].icon})`}}>
                  {
                    isEdit && isCustom
                    ?
                    <i onClick={this.deleteApp} data-id={id} className="kara-oa-font s-danger">&#xe635;</i>
                    :
                    null
                  }
                </b>
                <p>{isZH ? webAppInfos[id].appName : webAppInfos[id].appNameEn}</p>
              </a>
            ))
          }
        </nav>
        <footer>
          {
            count>1
            ?
            <Paging no={pageNo} count={count} onChange={this.pageChange} />
            :
            null
          }
          {
            isCustom
            ?
            <button className="btn-info outline" onClick={this.toggleEdit}>{isEdit ? LConfig['BUTTON_OK'] : LConfig['BUTTON_CUSTOM']}</button>
            :
            null
          }
        </footer>
        {
          isModal
          ?
          <Modal {
            ...{
              types: types.filter(type=>type.id!==Tool.COMMON_ID),
              customList: nodeTree[Tool.COMMON_ID].map(app=>app.id),
              nodeTree,
              webAppInfos,
              onToggle: this.onToggle,
              onClose: this.onClose,
            }
          } />
          :
          null
        }
      </div>
    )
  }
}

export default Tool
