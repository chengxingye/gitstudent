import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import Pop from './Pop'
import Language from '../../language'
import API from '../../api'

@inject('Config')
@observer
class Todo extends Component{
  state = {
    list: [],
    tab: 0,
    isApprove: false,
    isApproveReject: false,
    isTrack: false,
    pop: {},
    todos: [],
    todoIndex: 0,
    todoObj: {},
  }

  componentDidMount(){
    document.addEventListener('click', ()=>{
      this.setState({
        isApprove: false,
        isApproveReject: false,
        isTrack: false,
        pop: {}
      })
    }, false)


    // API.post('/api/v1.0.0/task/taskinfo/query').end(null, {
    //   pageStart: 1,
    //   pageEnd: 5,
    // }).then(res=>{
    //   this.setState({todos: res.taskInfo||[]})
    // })
  }

  stopPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
  }

  setTab = tab=>{
    this.setState({tab})
  }

  showApprove = (e, todoIndex, todoObj)=>{
    if(!this.state.isApprove){
      e.nativeEvent.stopImmediatePropagation()
      this.setState({
        isApprove: true,
        isApproveReject: false,
        todoIndex,
        todoObj,
      })
    }
  }

  toggleReject = e=>{
    this.setState({isApproveReject: !this.state.isApproveReject})
  }

  showTrack = e=>{
    if(!this.state.isTrack){
      e.nativeEvent.stopImmediatePropagation()
      this.setState({isTrack: true})
    }
  }

  showPop = e=>{
    if(e.target.tagName !== 'I')  return
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
    // TODO 如果当前pop已经显示 则隐藏当前pop 
    let rect = e.target.getBoundingClientRect()
    this.setState({
      pop: {
        show: true,
        left: rect.left-23,
        top: rect.top+24,
      }
    })
  }

  stopTrackPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
    if(this.state.pop.show){
      this.setState({
        pop: {
          ...this.state.pop,
          show: false
        }
      })
    }
  }

  render(){
    const LConfig = Language[this.props.Config.language]['Todo']
    const {tab, isApprove, isApproveReject, isTrack, pop, todos, todoIndex, todoObj} = this.state
    let dataPanel = null
    if(tab === 0){
      dataPanel = (
        <ul className="type0">
          {
            todos.map((todo, index)=>(
              <li onClick={e=>this.showApprove(e, index+1, todo)} key={todo.id}>
                <label>{index+1}、{todo.titleInfo.taskTitleCn}</label>
                <p>{todo.titleInfo.taskDescCn}</p>
              </li>
            ))
          }
        </ul>
      )
    }else if(tab === 1){
      dataPanel = (
        <ul className="type1" onClick={this.showTrack}>
          <li>
            <label>1、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>{LConfig['TRACK_PROCESSING']}</span>
            <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
          </li>
          <li>
            <label>2、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>{LConfig['TRACK_PROCESSING']}</span>
            <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
          </li>
          <li>
            <label>3、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>{LConfig['TRACK_PROCESSING']}</span>
            <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
          </li>
          <li>
            <label>4、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>{LConfig['TRACK_PROCESSING']}</span>
            <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
          </li>
          <li>
            <label>5、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>{LConfig['TRACK_PROCESSING']}</span>
            <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
          </li>
        </ul>
      )
    }else if(tab === 2){
      dataPanel = (
        <table>
          <tbody>
            <tr>
              <td>{LConfig['OTHER_0_0']}: <span>10</span></td>
              <td>{LConfig['OTHER_0_1']}: <span>10</span></td>
            </tr>
            <tr>
              <td>{LConfig['OTHER_1_0']}: <span>20</span></td>
              <td>{LConfig['OTHER_1_1']}: <span>20</span></td>
            </tr>
            <tr>
              <td>{LConfig['OTHER_2_0']}: <span>15</span></td>
              <td>{LConfig['OTHER_2_1']}: <span>15</span></td>
            </tr>
          </tbody>
        </table>
      )
    }

    return (
      <div className="Todo">
        <ol>
          <li onClick={e=>this.setTab(0)} className={`${tab===0 ? 'active' : ''}`}>{LConfig['TODO_TITLE']}&ensp;<span className="red">2</span></li>
          <li onClick={e=>this.setTab(1)} className={`${tab===1 ? 'active' : ''}`}>{LConfig['TRACK_TITLE']}&ensp;<span className="blue">12</span></li>
          <li onClick={e=>this.setTab(2)} className={`${tab===2 ? 'active' : ''}`}>{LConfig['OTHER_TITLE']}&ensp;<span className="green">12</span></li>
          <li className="empty"></li>
          <li className="kara-oa-font orange">&#xe7a4;</li>
          <li className="kara-oa-font orange">&#xe671;</li>
        </ol>
        <p className="nothing">
          <img src={require("./nothing.png")} />
          &emsp;当前还没有待办内容~
        </p>
        {
          dataPanel
        }
        {
          isApprove
          ?
          <div 
            className="approve"
            onClick={this.stopPropagation}>
            <header>
              <label>{todoIndex}、{todoObj.titleInfo.taskTitleCn}</label>
              <p>{todoObj.titleInfo.taskDescCn}</p>
            </header>
            <h2>
              <button>{LConfig['TODO_AGREE']}</button>
              <button onClick={this.toggleReject}>{LConfig['TODO_REJECT']}</button>
              <button>{LConfig['TODO_DETAIL']}</button>
              <span>{todoObj.taskDispTime.substr(0, 10)}</span>
            </h2>
            {
              isApproveReject
              ?
              <textarea placeholder={LConfig['TODO_REJECT_PLACEHOLDER']}></textarea>
              :
              null
            }
            {
              isApproveReject
              ?
              <footer>
                <button>{LConfig['TODO_SUBMIT']}</button>
              </footer>
              :
              null
            }
          </div>
          :
          null
        }
        {
          isTrack
          ?
          <div 
            className="track" 
            onClick={this.stopTrackPropagation}>
            <header>
              <label>1、跟踪 任务跟踪任务跟踪</label>
              <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
              <span>{LConfig['TRACK_PROCESSING']}</span>
              <button>{LConfig['TRACK_BUTTON_PROCESS']}</button>
            </header>
            <div className="scroll">
              <ul onClick={this.showPop}>
                <li>
                  <i></i>
                  <p>高芳<br/>2018-03-27 19:12</p>
                </li>
                <li>
                  <i></i>
                  <p>高芳<br/>2018-03-27 19:12</p>
                </li>
                <li>
                  <i></i>
                  <p>高芳<br/>2018-03-27 19:12</p>
                </li>
                <li className="active">
                  <i></i>
                  <p>高芳<br/>2018-03-27 19:12</p>
                </li>
              </ul>
            </div>
          </div>
          :
          null
        }
        {
          pop.show
          ?
          <Pop left={pop.left} top={pop.top} />
          :
          null
        }
      </div>
    )
  }
}

export default Todo
