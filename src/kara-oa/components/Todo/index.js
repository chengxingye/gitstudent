import React, {Component} from 'react'
import './index.scss'

class Todo extends Component{
  render(){
    return (
      <div className="Todo">
        <ol>
          <li className="active">待办&ensp;<span className="red">2</span></li>
          <li>任务跟踪&ensp;<span className="green">12</span></li>
          <li className="empty"></li>
          <li className="kara-oa-font orange">&#xe7a4;</li>
          <li className="kara-oa-font orange">&#xe671;</li>
        </ol>
        <p className="nothing">
          <img src={require("./nothing.png")} />
          &emsp;当前还没有待办内容~
        </p>
      </div>
    )
  }
}

export default Todo
