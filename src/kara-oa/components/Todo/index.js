import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import Pop from './Pop'
import Language from '../../language'
import API from '../../api'
import {successTost, errorTost} from "kara-module-tost"
import Scroll from 'react-scroller-plugin'

@inject('Config')
@observer
class Todo extends Component{
  static PAGE_SIZE = 5

  state = {
    type: 'todo',
    todoInfo: {
      pageNo: 1,
      count: 0,
      result: [],
    },
    trackInfo: {
      pageNo: 1,
      count: 0,
      result: [],
    },
    todoActive: null,
    trackActive: null,
    pop: null,
  }

  componentDidMount(){
    document.addEventListener('click', ()=>{
      this.setState({
        todoActive: null,
        trackActive: null,
        pop: null
      })
    }, false)
    this.refresh()
  }

  refresh = ()=>{
    this.getTodos(1)
    this.getTracks(1)
  }

  getTodos = pageNo=>{
    API.post('/api/v1.0.0/task/taskinfo/query').end(null, {
      pageStart: (pageNo-1)*Todo.PAGE_SIZE+1,
      pageEnd: pageNo*Todo.PAGE_SIZE,
    }).then(res=>{
      this.setState({
        todoInfo: {
          pageNo,
          count: res.count,
          result: res.taskInfo||[],
        }
      })
    })
  }

  getTracks = pageNo=>{
    API.post('/api/v1.0.0/task/tasktrace/query').end(null, {
      pageStart: (pageNo-1)*Todo.PAGE_SIZE+1,
      pageEnd: pageNo*Todo.PAGE_SIZE,
    }).then(res=>{
      this.setState({
        trackInfo: {
          pageNo,
          count: res.count,
          result: res.taskTraceInfo||[],
        }
      })
    })
  }

  prev = ()=>{
    const {type, todoInfo, trackInfo} = this.state
    if(type==='todo'){
      this.getTodos(todoInfo.pageNo-1)
    }else if(type==='track'){
      this.getTracks(trackInfo.pageNo-1)
    }
  }

  next = ()=>{
    const {type, todoInfo, trackInfo} = this.state
    if(type==='todo'){
      this.getTodos(todoInfo.pageNo+1)
    }else if(type==='track'){
      this.getTracks(trackInfo.pageNo+1)
    }
  }

  todoAgree = ()=>{
    this.postTodo()
  }

  todoReject = ()=>{
    const {todoActive} = this.state
    if(!todoActive.rejectReason){
      errorTost({msg: '请输入驳回原因', time: 1.5})
    }else{
      this.postTodo(false)
    }
  }

  postTodo = (isAgree=true)=>{
    const {todoActive} = this.state
    API.post('/api/v1.0.0/task/taskinfo/async').end(null, {
      systemId: todoActive.systemId,
      targetTaskId: todoActive.targetTaskId,
      service: isAgree ? todoActive.acceptBtnUrl : todoActive.rejectBtnUrl,
      sync: '0',
      channel: 'oa',
      rejectReason: isAgree ? undefined : todoActive.rejectReason,
    }).then(res=>{
      successTost({msg: '审批成功', time: 1.5})
      this.refresh()
    })
  }

  stopPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
  }

  setType = e=>{
    const type = e.target.dataset.type
    if(type){
      this.setState({type})
    }
  }

  showApprove = (e, todoActive)=>{
    if(!this.state.todoActive){
      e.nativeEvent.stopImmediatePropagation()
      this.setState({
        todoActive: {
          ...todoActive,
          isApproveReject: false,
          rejectReason: '',
        }
      })
    }
  }

  toggleReject = e=>{
    const {todoActive} = this.state
    this.setState({
      todoActive: {
        ...todoActive,
        isApproveReject: !todoActive.isApproveReject,
      }
    })
  }

  showTrack = (e, trackActive)=>{
    if(!this.state.trackActive){
      e.nativeEvent.stopImmediatePropagation()
      this.setState({trackActive})
    }
  }

  showPop = (e, node)=>{
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
    let rect = e.target.getBoundingClientRect()
    const {pop} = this.state
    if(pop && pop.node.nodeSeq===node.nodeSeq){
      this.setState({pop: null})
    }else{
      this.setState({
        pop: {
          node,
          left: rect.left-23,
          top: rect.top+24,
        }
      })
    }
  }

  stopTrackPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
    if(this.state.pop){
      this.setState({pop: null})
    }
  }

  rejectReasonChange = e=>{
    const {todoActive} = this.state
    this.setState({
      todoActive: {
        ...todoActive,
        rejectReason: e.target.value,
      }
    })
  }

  render(){
    const LConfig = Language[this.props.Config.language]['Todo']
    const {type, todoInfo, todoActive, trackInfo, trackActive, pop} = this.state
    let isZH = this.props.Config.language==='zh'
    let dataPanel = null
    let pageInfo = {}
    let isNothing = false
    if(type ==='todo'){
      isNothing = todoInfo.count===0
      pageInfo = todoInfo
      dataPanel = (
        <ul className="todoList s-secondary">
          {
            todoInfo.result.map((todo, index)=>(
              <li onClick={e=>this.showApprove(e, todo)} key={todo.id}>
                <label>{(todoInfo.pageNo-1)*Todo.PAGE_SIZE+index+1}、{isZH ? todo.titleInfo.taskTitleCn : todo.titleInfo.taskTitleEn}</label>
                <p>{isZH ? todo.titleInfo.taskDescCn : todo.titleInfo.taskDescEn}</p>
              </li>
            ))
          }
        </ul>
      )
    }else if(type === 'track'){
      isNothing = trackInfo.count===0
      pageInfo = trackInfo
      dataPanel = (
        <ul className="trackList s-secondary">
          {
            trackInfo.result.map((track, index)=>(
              <li onClick={e=>this.showTrack(e, track)} key={track.orderId}>
                <label>{(trackInfo.pageNo-1)*Todo.PAGE_SIZE+index+1}、{isZH ? track.titleInfo.orderTitleCn : track.titleInfo.orderTitleEn}</label>
                <p>{isZH ? track.titleInfo.orderDescCn : track.titleInfo.orderDescEn}</p>
                <span className="s-primary">{LConfig['TRACK_PROCESSING']}</span>
                <button className="s-bg-primary">{LConfig['TRACK_BUTTON_PROCESS']}</button>
              </li>
            ))
          }
        </ul>
      )
    }else if(type === 'other'){
      pageInfo = {pageNo: 1, count: 0}
      dataPanel = (
        <table>
          <tbody>
            <tr>
              <td>{LConfig['OTHER_0_0']}: <span className="s-info">10</span></td>
              <td>{LConfig['OTHER_0_1']}: <span className="s-info">10</span></td>
            </tr>
            <tr>
              <td>{LConfig['OTHER_1_0']}: <span className="s-info">20</span></td>
              <td>{LConfig['OTHER_1_1']}: <span className="s-info">20</span></td>
            </tr>
            <tr>
              <td>{LConfig['OTHER_2_0']}: <span className="s-info">15</span></td>
              <td>{LConfig['OTHER_2_1']}: <span className="s-info">15</span></td>
            </tr>
          </tbody>
        </table>
      )
    }

    return (
      <div className="Todo">
        <ol onClick={this.setType} className="s-bg-panel-title">
          <li 
            data-type='todo' 
            className={`s-secondary s-b-default ${type==='todo' ? 'active' : ''}`}>
            {LConfig['TODO_TITLE']}&ensp;
            <span data-type='todo' className="red">{todoInfo.count}</span>
          </li>
          <li 
            data-type='track' 
            className={`s-secondary s-b-default ${type==='track' ? 'active' : ''}`}>
            {LConfig['TRACK_TITLE']}&ensp;
            <span data-type='track' className="blue">{trackInfo.count}</span>
          </li>
          <li 
            data-type='other' 
            className={`s-secondary s-b-default ${type==='other' ? 'active' : ''}`}>
            {LConfig['OTHER_TITLE']}&ensp;
            <span data-type='other' className="green">12</span>
          </li>
          <li className="s-secondary s-b-default empty"></li>
          <li onClick={this.refresh} className="s-primary s-b-default kara-oa-font">&#xe7a4;</li>
          <li className="s-primary s-b-default kara-oa-font">&#xe671;</li>
        </ol>
        <section>
          {
            isNothing
            ?
            <p className="nothing s-secondary">
              <b></b>
              &emsp;当前还没有待办内容~
            </p>
            :
            null
          }
          {
            dataPanel
          }
          {
            pageInfo.pageNo>1
            ?
            <span onClick={this.prev} className='left kara-oa-font'>&#xe618;</span>
            :
            null
          }
          {
            pageInfo.pageNo*Todo.PAGE_SIZE<pageInfo.count
            ?
            <span onClick={this.next} className='right kara-oa-font'>&#xe7a5;</span>
            :
            null
          }
        </section>
        {
          todoActive
          ?
          <div 
            className="approve s-b-default"
            onClick={this.stopPropagation}>
            <header>
              <label>{(todoInfo.pageNo-1)*Todo.PAGE_SIZE+todoInfo.result.findIndex(todo=>todo.id===todoActive.id)+1}、{isZH ? todoActive.titleInfo.taskTitleCn : todoActive.titleInfo.taskTitleEn}</label>
              <p>{isZH ? todoActive.titleInfo.taskDescCn : todoActive.titleInfo.taskDescEn}</p>
            </header>
            <h2>
              {
                todoActive.acceptBtnUrl
                ?
                <button className="s-bg-primary small" onClick={this.todoAgree}>{LConfig['TODO_AGREE']}</button>
                :
                null
              }
              {
                todoActive.rejectBtnUrl
                ?
                <button className="s-bg-slicer-dot" onClick={this.toggleReject}>{LConfig['TODO_REJECT']}</button>
                :
                null
              }
              {
                todoActive.viewBtnUrl
                ?
                <a className="btn-info" href={todoActive.viewBtnUrl} target="_blank">{LConfig['TODO_DETAIL']}</a>
                :
                null
              }
              <span className="s-secondary">{todoActive.taskDispTime.substr(0, 10)}</span>
            </h2>
            {
              todoActive.isApproveReject
              ?
              <textarea 
                className="s-b-default"
                value={todoActive.rejectReason}
                onChange={this.rejectReasonChange}
                placeholder={LConfig['TODO_REJECT_PLACEHOLDER']}></textarea>
              :
              null
            }
            {
              todoActive.isApproveReject
              ?
              <footer>
                <button className="s-bg-primary small" onClick={this.todoReject}>{LConfig['TODO_SUBMIT']}</button>
              </footer>
              :
              null
            }
          </div>
          :
          null
        }
        {
          trackActive
          ?
          <div 
            className="track s-b-default" 
            onClick={this.stopTrackPropagation}>
            <header>
              <label>{(trackInfo.pageNo-1)*Todo.PAGE_SIZE+trackInfo.result.findIndex(track=>track.orderId===trackActive.orderId)+1}、{isZH ? trackActive.titleInfo.orderTitleCn : trackActive.titleInfo.orderTitleEn}</label>
              <p>{isZH ? trackActive.titleInfo.orderDescCn : trackActive.titleInfo.orderDescEn}</p>
              <span className="s-primary">{LConfig['TRACK_PROCESSING']}</span>
              <button className="s-bg-primary">{LConfig['TRACK_BUTTON_PROCESS']}</button>
            </header>
            <div className="trackScroll">
              <Scroll>
                <ul>
                  {
                    trackActive.nodeInfo.map(node=>(
                      <li className={`${node.nodeStatus==='1' ? 'btn-secondary outline' : 's-b-primary s-primary'} ${node.nodeStatus==='1' ? 'done' : ''} ${node.nodeStatus==='2' ? 'wait' : ''}`} key={node.nodeSeq}>
                        <i className={`s-b-primary ${node.nodeStatus==='1' ? 's-bg-slicer-dot' : ''} ${node.nodeStatus==='2' ? 's-bg-primary small' : ''} ${node.nodeStatus!=='1'&&node.nodeStatus!=='2' ? 'iDefault' : ''} `} onClick={e=>this.showPop(e, node)}></i>
                        <p>{node.accountName||(isZH ? node.nodeNameCn : node.nodeNameEn)}<br/>{node.nodeStatusDate}</p>
                      </li>
                    ))
                  }
                </ul>
              </Scroll>
            </div>
          </div>
          :
          null
        }
        {
          pop
          ?
          <Pop node={pop.node} left={pop.left} top={pop.top} />
          :
          null
        }
      </div>
    )
  }
}

export default Todo
