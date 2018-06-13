import React, {Component} from 'react'
import './index.scss'
import Pop from './Pop'

class Todo extends Component{
  state = {
    list: [],
    tab: 0,
    isApprove: false,
    isApproveReject: false,
    isTrack: false,
    pop: {},
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
  }

  stopPropagation = e=>{
    e.nativeEvent.stopImmediatePropagation()
  }

  setTab = tab=>{
    this.setState({tab})
  }

  showApprove = e=>{
    if(!this.state.isApprove){
      e.nativeEvent.stopImmediatePropagation()
      this.setState({
        isApprove: true,
        isApproveReject: false
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
    const {tab, isApprove, isApproveReject, isTrack, pop} = this.state
    let dataPanel = null
    if(tab === 0){
      dataPanel = (
        <ul className="type0" onClick={this.showApprove}>
          <li>
            <label>1、待办 待办待办待办待办</label>
            <p>待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办</p>
          </li>
          <li>
            <label>2、待办 待办待办待办待办</label>
            <p>待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办</p>
          </li>
          <li>
            <label>3、待办 待办待办待办待办</label>
            <p>待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办</p>
          </li>
          <li>
            <label>4、待办 待办待办待办待办</label>
            <p>待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办</p>
          </li>
          <li>
            <label>5、待办 待办待办待办待办</label>
            <p>待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办待办</p>
          </li>
        </ul>
      )
    }else if(tab === 1){
      dataPanel = (
        <ul className="type1" onClick={this.showTrack}>
          <li>
            <label>1、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>处理中</span>
            <button>流程</button>
          </li>
          <li>
            <label>2、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>处理中</span>
            <button>流程</button>
          </li>
          <li>
            <label>3、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>处理中</span>
            <button>流程</button>
          </li>
          <li>
            <label>4、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>处理中</span>
            <button>流程</button>
          </li>
          <li>
            <label>5、跟踪 任务跟踪任务跟踪</label>
            <p>任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪任务跟踪</p>
            <span>处理中</span>
            <button>流程</button>
          </li>
        </ul>
      )
    }else if(tab === 2){
      dataPanel = (
        <table>
          <tbody>
            <tr>
              <td>项目第三方采购: <span>10</span></td>
              <td>新立项审批: <span>10</span></td>
            </tr>
            <tr>
              <td>外包管理: <span>20</span></td>
              <td>IT资产变更管理系统: <span>20</span></td>
            </tr>
            <tr>
              <td>销售合同管理部审批: <span>15</span></td>
              <td>劳动合同: <span>15</span></td>
            </tr>
          </tbody>
        </table>
      )
    }

    return (
      <div className="Todo">
        <ol>
          <li onClick={e=>this.setTab(0)} className={`${tab===0 ? 'active' : ''}`}>待办&ensp;<span className="red">2</span></li>
          <li onClick={e=>this.setTab(1)} className={`${tab===1 ? 'active' : ''}`}>任务跟踪&ensp;<span className="blue">12</span></li>
          <li onClick={e=>this.setTab(2)} className={`${tab===2 ? 'active' : ''}`}>其他待办&ensp;<span className="green">12</span></li>
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
              <label>1、常伟 调动-Band8</label>
              <p>常伟 调动-Band8常伟 调动-Band8常伟 调动-Band8常伟 调动-Band8常伟 调动-Band8常伟 调动-Band8</p>
            </header>
            <h2>
              <button>同意</button>
              <button onClick={this.toggleReject}>驳回</button>
              <button>查看详情</button>
              <span>2018-05-18</span>
            </h2>
            {
              isApproveReject
              ?
              <textarea placeholder="请输入驳回原因"></textarea>
              :
              null
            }
            {
              isApproveReject
              ?
              <footer>
                <button>提交</button>
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
              <span>处理中</span>
              <button>流程</button>
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
