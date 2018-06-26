import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import {Paging} from '../common'
import API from '../../api'
import Language from '../../language'
import Modal from './Modal'

@inject('Config')
@observer
class Tool extends Component{
  static COMMON_ID = 'wc_custom'
  static PAGE_SIZE = 10

  state = {
    types: [],
    typeID: Tool.COMMON_ID,
    nodeTree: {
      [Tool.COMMON_ID]: [
        {
          id: '11',
        },
        {
          id: '22',
        },
        {
          id: '33',
        },
        {
          id: '44',
        },
        {
          id: '55',
        },
        {
          id: '66',
        },
        {
          id: '77',
        },
        {
          id: '88',
        },
        {
          id: '99',
        },
        {
          id: '111',
        },
        {
          id: '222',
        },
      ],
      'wc_financialAndLegalAffairs': [],
      'wc_scenario': [
        {
          id: '11',
        },
        {
          id: '22',
        },
        {
          id: '33',
        },
        {
          id: '44',
        },
        {
          id: '55',
        },
        {
          id: '66',
        },
        {
          id: '77',
        },
        {
          id: '88',
        },
        {
          id: '99',
        },
        {
          id: '111',
        },
        {
          id: '222',
          children: [
            {
              id: '333',
            },
          ]
        },
      ],
      'wc_mis': [],
      'wc_supplyManagement': [],
      'wc_hr': [],
      'wc_operationManagement': [],
    },
    webAppInfos: {
      '11': {
        id: "11",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '22': {
        id: "22",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '33': {
        id: "33",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '44': {
        id: "44",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '55': {
        id: "55",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '66': {
        id: "66",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '77': {
        id: "77",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '88': {
        id: "88",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '99': {
        id: "99",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '111': {
        id: "111",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '222': {
        id: "222",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
      '333': {
        id: "333",
        appName: "休假申请",
        appNameEn: "Leave",
        appDesc: "休假请找我",
        appDescEn: "leave ask me...",
        icon: "https://kara-image.asiainfo.com/scale/channel/15a81055-ced8-451c-88e1-d6f51f7498e2.png",
        url: "http://hrleave.asiainfo.com/LeaveMS/index.jsp",
      },
    },
    pageNo: 0,
    isEdit: false,
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
        ]
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
      console.log(res)
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

  toggleEdit = ()=>{
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

  render(){
    const {types, typeID, nodeTree, webAppInfos, pageNo, isEdit} = this.state
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
                className={typeID===type.id ? 'active' : ''}>{isZH ? type.name : type.nameEn}</li>
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
                <b style={{backgroundImage: `url(${webAppInfos[id].icon})`}}>
                  {
                    isEdit && isCustom
                    ?
                    <i onClick={this.deleteApp} data-id={id} className="kara-oa-font">&#xe635;</i>
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
            <button onClick={this.toggleEdit}>{isEdit ? LConfig['BUTTON_OK'] : LConfig['BUTTON_CUSTOM']}</button>
            :
            null
          }
        </footer>
        <Modal {
          ...{
            types: types.filter(type=>type.id!==Tool.COMMON_ID),
            customList: nodeTree[Tool.COMMON_ID].map(app=>app.id),
            nodeTree,
            webAppInfos,
            onToggle: this.onToggle
          }
        } />
      </div>
    )
  }
}

export default Tool
