import React, {Component} from 'react'
import './index.scss'
import {Paging} from '../common'
import Modal from './Modal'

class Tool extends Component{
  static SIZE = 10

  state = {
    types: [
      {
        id: 1,
        name: '常用'
      },
      {
        id: 2,
        name: '场景'
      },
      {
        id: 3,
        name: 'MIS'
      },
      {
        id: 4,
        name: 'HR'
      },
      {
        id: 5,
        name: '财务支撑'
      },
      {
        id: 6,
        name: '运营管理'
      },
      {
        id: 7,
        name: '供应管理'
      },
    ],
    typeId: 1,
    list: [
      {
        type: 1,
        id: 1,
        name: '休假系统1'
      },
      {
        type: 1,
        id: 2,
        name: '休假系统2'
      },
      {
        type: 1,
        id: 3,
        name: '休假系统3'
      },
      {
        type: 1,
        id: 4,
        name: '休假系统4'
      },
      {
        type: 1,
        id: 5,
        name: '休假系统5'
      },
      {
        type: 1,
        id: 6,
        name: '休假系统6'
      },
      {
        type: 1,
        id: 7,
        name: '休假系统7'
      },
      {
        type: 1,
        id: 8,
        name: '休假系统8'
      },
      {
        type: 1,
        id: 9,
        name: '休假系统9'
      },
      {
        type: 1,
        id: 10,
        name: '休假系统10'
      },
      {
        type: 1,
        id: 11,
        name: '休假系统11'
      },
    ],
    pageNo: 0,
    isEdit: false,
    showModal: false
  }

  setTypeID = e=>{
    if(e.target.dataset.id !== undefined){
      this.setState({
        typeId: Number(e.target.dataset.id),
        pageNo: 0
      })
    }
  }

  onChange = pageNo=>{
    this.setState({pageNo})
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  deleteApp = e=>{
    if(e.target.dataset.id !== undefined){
      let list = this.state.list.filter(app=>app.id!==Number(e.target.dataset.id))
      let pageNo = this.state.pageNo
      this.setState({
        list,
        pageNo: pageNo>=Math.ceil((list.length+1)/Tool.SIZE) ? pageNo-1 : pageNo
      })
    }
  }

  addApp = ()=>{
    this.setState({
      showModal: true
    })
  }

  onClose = ()=>{
    this.setState({
      showModal: false
    })
  }

  render(){
    const {types, typeId, list, pageNo, isEdit, showModal} = this.state
    let curList = list.filter(app=>app.type===typeId)
    curList = isEdit ? [{id: 0, name: '添加'}, ...curList] : curList
    let count = Math.ceil(curList.length/Tool.SIZE)

    return (
      <div className="Tool">
        <ol onClick={this.setTypeID}>
          {
            types.map((type)=>(<li data-id={type.id} className={typeId===type.id ? 'active' : ''} key={type.id}>{type.name}</li>))
          }
        </ol>
        <ul>
          {
            curList.slice(pageNo*Tool.SIZE, (pageNo+1)*Tool.SIZE).map((app, ii)=>(
              <li key={app.id}>
                {
                  app.name==='添加'
                  ?
                  <b onClick={this.addApp} className='add'></b>
                  :
                  <b>
                    {
                      isEdit
                      ?
                      <i onClick={this.deleteApp} data-id={app.id} className="kara-oa-font">&#xe635;</i>
                      :
                      null
                    }
                  </b>
                }
                <p>{app.name}</p>
              </li>
            ))
          }
        </ul>
        <button onClick={this.toggleEdit}>{isEdit ? '确定' : '自定义'}</button>
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
          showModal
          ?
          <Modal onClose={this.onClose} />
          :
          null
        }
      </div>
    )
  }
}

export default Tool
