import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import {Paging} from '../common'
import Modal from './Modal'
import Language from '../../language'

@inject('Config')
@observer
class Tool extends Component{
  static PAGE_SIZE = 10

  state = {
    types: [
      {
        id: 'wc_custom',
        name: '常用'
      },
      {
        id: 'wc_scenario',
        name: '场景'
      },
      {
        id: 'wc_supplyManagement',
        name: '供应管理'
      },
      {
        id: 'wc_mis',
        name: 'MIS'
      },
      {
        id: 'wc_hr',
        name: 'HR'
      },
      {
        id: 'wc_financialAndLegalAffairs',
        name: '财审与法务'
      },
      {
        id: 'wc_operationManagement',
        name: '运营管理'
      },
    ],
    typeId: 'wc_custom',
    apps: {
      '1-1': {
        id: '1-1',
        appName: '场景一',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-2': {
        id: '1-2',
        appName: '场景二',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-3': {
        id: '1-3',
        appName: '场景三',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-4': {
        id: '1-4',
        appName: '场景四',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-5': {
        id: '1-5',
        appName: '场景五',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-6': {
        id: '1-6',
        appName: '场景六',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-7': {
        id: '1-7',
        appName: '场景七',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-8': {
        id: '1-8',
        appName: '场景八',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-9': {
        id: '1-9',
        appName: '场景九',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-10': {
        id: '1-10',
        appName: '场景十',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-11': {
        id: '1-11',
        appName: '场景十一',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '1-12': {
        id: '1-12',
        appName: '场景十二',
        appDesc: '场景描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '2-1': {
        id: '2-1',
        appName: '供应一',
        appDesc: '供应描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '2-2': {
        id: '2-2',
        appName: '供应二',
        appDesc: '供应描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '2-3': {
        id: '2-3',
        appName: '供应三',
        appDesc: '供应描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '3-1': {
        id: '3-1',
        appName: 'MIS一',
        appDesc: 'MIS描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '3-2': {
        id: '3-2',
        appName: 'MIS二',
        appDesc: 'MIS描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '3-3': {
        id: '3-3',
        appName: 'MIS三',
        appDesc: 'MIS描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '4-1': {
        id: '4-1',
        appName: 'HR一',
        appDesc: 'HR描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '4-2': {
        id: '4-2',
        appName: 'HR二',
        appDesc: 'HR描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '4-3': {
        id: '4-3',
        appName: 'HR三',
        appDesc: 'HR描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '5-1': {
        id: '5-1',
        appName: '财务一',
        appDesc: '财务描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '5-2': {
        id: '5-2',
        appName: '财务二',
        appDesc: '财务描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '5-3': {
        id: '5-3',
        appName: '财务三',
        appDesc: '财务描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '6-1': {
        id: '6-1',
        appName: '运营一',
        appDesc: '运营描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '6-2': {
        id: '6-2',
        appName: '运营二',
        appDesc: '运营描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
      '6-3': {
        id: '6-3',
        appName: '运营三',
        appDesc: '运营描述',
        icon: 'https://kara-image.asiainfo.com/scale/channel/d8e78b75-26b6-4436-8ecc-b6f75d4077c4.png',
        keywords: ['客服', '有事请找我'],
        url: 'https://itsm.asiainfo.com/customer.pl',
      },
    },
    appGroup: {
      wc_custom: ['1-1','2-1','3-1'],
      wc_scenario: ['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','1-9','1-10','1-11','1-12'],
      wc_supplyManagement: ['2-1','2-2','2-3'],
      wc_mis: ['3-1','3-2','3-3'],
      wc_hr: ['4-1','4-2','4-3'],
      wc_financialAndLegalAffairs: ['5-1','5-2','5-3'],
      wc_operationManagement: ['6-1','6-2','6-3'],
    },
    isEdit: false,
    pageNo: 0,
    isModal: false,
  }

  setTypeID = e=>{
    if(e.target.dataset.id !== undefined){
      this.setState({
        typeId: e.target.dataset.id,
        pageNo: 0,
      })
    }
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  deleteApp = e=>{
    if(e.target.dataset.id !== undefined){
      const {typeId, appGroup, pageNo} = this.state
      let uiList = appGroup[typeId].filter(id=>id!==e.target.dataset.id)
      this.setState({
        appGroup: {
          ...appGroup,
          [typeId]: uiList,
        },
        pageNo: pageNo>=Math.ceil((uiList.length+1)/Tool.PAGE_SIZE) ? pageNo-1 : pageNo
      })
    }
  }

  onChange = pageNo=>{
    this.setState({pageNo})
  }

  showModal = ()=>{
    this.setState({isModal: true})
  }

  closeModal = ()=>{
    this.setState({isModal: false})
  }

  onToggle = id=>{
    const {appGroup} = this.state
    let wc_custom = appGroup['wc_custom']
    if(wc_custom.includes(id)){
      wc_custom = wc_custom.filter(appId=>appId!==id)
    }else{
      wc_custom = [id, ...wc_custom]
    }
    this.setState({
      appGroup: {
        ...appGroup,
        wc_custom
      }
    })
  }

  render(){
    const LConfig = Language[this.props.Config.language]['Tool']
    const {types, typeId, apps, appGroup, isEdit, pageNo, isModal} = this.state
    let uiList = appGroup[typeId]
    if(isEdit && typeId==='wc_custom'){
      uiList = ['add', ...uiList]
    }
    let count = Math.ceil(uiList.length/Tool.PAGE_SIZE)

    return (
      <div className="Tool">
        <ol onClick={this.setTypeID}>
          {
            types.map((type)=>(
              <li 
                key={type.id} 
                data-id={type.id} 
                className={typeId===type.id ? 'active' : ''}>{type.name}</li>
            ))
          }
        </ol>
        <ul>
          {
            uiList.slice(pageNo*Tool.PAGE_SIZE, (pageNo+1)*Tool.PAGE_SIZE).map(id=>(
              id==='add'
              ?
              <li key={id}>
                <b onClick={this.showModal} className="add"></b>
                <p>{LConfig['ADD']}</p>
              </li>
              :
              <li key={id}>
                <b title={apps[id].appDesc} style={{backgroundImage: `url(${apps[id].icon})`}}>
                  {
                    isEdit && typeId==='wc_custom'
                    ?
                    <i onClick={this.deleteApp} data-id={id} className="kara-oa-font">&#xe635;</i>
                    :
                    null
                  }
                </b>
                <p>{apps[id].appName}</p>
              </li>
            ))
          }
        </ul>
        {
          typeId==='wc_custom'
          ?
          <button onClick={this.toggleEdit}>{isEdit ? LConfig['BUTTON_OK'] : LConfig['BUTTON_CUSTOM']}</button>
          :
          null
        }
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
        {
          isModal
          ?
          <Modal
            types={types.slice(1)}
            apps={apps}
            appGroup={appGroup}
            onToggle={this.onToggle}
            onClose={this.closeModal} />
          :
          null
        }
      </div>
    )
  }
}

export default Tool
