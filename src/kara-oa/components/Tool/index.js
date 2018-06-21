import React, {Component} from 'react'
import './index.scss'
import API from '../../api'

class Tool extends Component{
  static COMMON_ID = '000000'

  state = {
    list: [
      {
        id: Tool.COMMON_ID,
        name: '常用',
      },
      {
        id: '2',
        name: '第一个',
      },
      {
        id: '3',
        name: '第二个',
      },
      {
        id: '4',
        name: '第三个',
      },
    ],
    activeID: Tool.COMMON_ID,
  }

  componentDidMount(){
    // API.get('/api/v1.0.0/webhook/w_apps.get').end().then(res=>{
    //   console.log(res)
    // })
  }

  setActiveID = e=>{
    this.setState({activeID: e.target.dataset.id})
  }

  onDragOver = e=>{
    let id = e.target.dataset.id
    if(id===Tool.COMMON_ID) return

    e.preventDefault()
  }

  onDragStart = e=>{
    this.originIDs = this.state.list.map(app=>app.id).join('#')
    this.dragID = e.target.dataset.id
  }

  onDragEnter = e=>{
    let endID = e.target.dataset.id
    if(endID===Tool.COMMON_ID || endID===this.dragID) return

    let list = this.state.list
    let start = list.findIndex(app=>app.id===this.dragID)
    let end = list.findIndex(app=>app.id===endID)
    let startItem = list.splice(start, 1)[0]
    let pos = list.findIndex(app=>app.id===endID)
    if(start < end){
      pos++
    }
    list.splice(pos, 0, startItem)
    this.setState({list})
  }

  onDragEnd = e=>{
    let destIDs = this.state.list.map(app=>app.id).join('#')
    if(this.originIDs !== destIDs){
      console.log('save type')
    }
  }

  render(){
    const {list, activeID} = this.state

    return (
      <div className="Tool">
        <ol 
          onClick={this.setActiveID}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragEnd={this.onDragEnd}
          onDragOver={this.onDragOver}>
          {
            list.map(app=>(
              <li 
                data-id={app.id}
                key={app.id} 
                draggable={app.id!==Tool.COMMON_ID}
                className={activeID===app.id ? 'active' : ''}>{app.name}</li>
            ))
          }
        </ol>
      </div>
    )
  }
}

export default Tool
