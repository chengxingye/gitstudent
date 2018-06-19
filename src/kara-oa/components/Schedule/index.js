import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './index.scss'
import Language from '../../language'

@inject('Config')
@observer
class Schedule extends Component{
  constructor(props){
    super(props)
    let date = new Date()
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth()+1,
      today: {
        y: date.getFullYear(),
        m: date.getMonth()+1,
        d: date.getDate(),
      },
      marks: [
        '2018/6/4',
        '2018/6/12',
        '2018/6/28',
      ],
      pageNo: 1,
      pageCount: 10,
    }
  }

  generateDatePanel = (year, month)=>{
    let DAY = 24*60*60*1000
    let firstDay = new Date(year, month-1, 1)
    let diffDays = firstDay.getDay() || 7
    firstDay = new Date(firstDay.getTime() - diffDays*DAY)
    let result = []
    for(let i=0; i<42; i++){
      let date = new Date(firstDay.getTime() + i*DAY)
      result.push({
        y: date.getFullYear(),
        m: date.getMonth()+1,
        d: date.getDate(),
      })
    }
    return result
  }

  prev = ()=>{
    let {year, month} = this.state
    year = month===1 ? year-1 : year
    month = month===1 ? 12 : month-1
    this.setState({year, month})
  }

  next = ()=>{
    let {year, month} = this.state
    year = month===12 ? year+1 : year
    month = month===12 ? 1 : month+1
    this.setState({year, month})
  }

  setToday = e=>{
    if(e.target.title){
      let ymd = e.target.title.split('/')
      let y = Number(ymd[0])
      let m = Number(ymd[1])
      let d = Number(ymd[2])
      this.setState({
        year: y,
        month: m,
        today: {y, m, d},
      })
    }
  }

  prevPage = e=>{
    if(e.target.classList.contains('disabled')) return
    this.setState({pageNo: this.state.pageNo-1})
  }

  nextPage = e=>{
    if(e.target.classList.contains('disabled')) return
    this.setState({pageNo: this.state.pageNo+1})
  }

  render(){
    const LConfig = Language[this.props.Config.language]['Schedule']
    const {year, month, today, marks, pageNo, pageCount} = this.state
    const dp = this.generateDatePanel(year, month)

    return (
      <div className="Schedule">
        <header>
          {LConfig['TITLE']}
          <button className="kara-oa-font">&#xe671;</button>
        </header>
        <section>
          <div className="left">
            <h1>
              <i onClick={this.prev} className="kara-oa-font">&#xe618;</i>
              &ensp;{year}{LConfig['YEAR_LABEL']}{month}{LConfig['MONTH_LABEL']}&ensp;
              <i onClick={this.next} className="kara-oa-font">&#xe7a5;</i>
            </h1>
            <header>
              <b>{LConfig['WEEK_SUNDAY']}</b>
              <b>{LConfig['WEEK_MONDAY']}</b>
              <b>{LConfig['WEEK_TUESDAY']}</b>
              <b>{LConfig['WEEK_WEDNESDAY']}</b>
              <b>{LConfig['WEEK_THURSDAY']}</b>
              <b>{LConfig['WEEK_FRIDAY']}</b>
              <b>{LConfig['WEEK_SATURDAY']}</b>
            </header>
            <div onClick={this.setToday}>
              {
                dp.map((date, index)=>{
                  let classNames = []
                  if(date.y!==year || date.m!==month){
                    classNames.push('gray')
                  }
                  if(date.y===today.y && date.m===today.m && date.d===today.d){
                    classNames.push('cur')
                  }
                  if(marks.includes(`${date.y}/${date.m}/${date.d}`)){
                    classNames.push('mark')
                  }
                  return (
                    <span 
                      key={index} 
                      title={`${date.y}/${date.m}/${date.d}`}
                      className={classNames.join(' ')}>{date.d}</span>
                  )
                })
              }
            </div>
          </div>
          <div className="right">
            <h1>{LConfig['SUB_TITLE']}<button>+{LConfig['ADD_SCHEDULE']}</button></h1>
            <section>
              <ul>
                <li>
                  <label>{LConfig['ALL_DAY']}</label>
                  <p>需求需求文档编写及问题确认OA需求文档编写及问题确认OA需求文档编写及问题确认OA需求文档编写及问题确认</p>
                  <div className="pop">
                    <header>
                      <label>{LConfig['ALL_DAY']}</label>
                      <p>需求需求文档编写及问题确认需求需求文档编写及问题确认需求需求文档编写及问题确认需求需求文档编写及问题确认</p>
                    </header>
                    <footer>
                      <button>{LConfig['TO_DETAIL']}</button>
                      <button>{LConfig['TO_EDIT']}</button>
                      <button>{LConfig['TO_DEL']}</button>
                    </footer>
                  </div>
                </li>
                <li>
                  <label>14:00</label>
                  <p>项目组例会项目组例会项目组例会项目组例会</p>
                  <div className="pop">
                    <header>
                      <label>14:00</label>
                      <p>项目组例会项目组例会项目组例会项目组例会</p>
                    </header>
                    <footer>
                      <button>{LConfig['TO_DETAIL']}</button>
                      <button>{LConfig['TO_EDIT']}</button>
                      <button>{LConfig['TO_DEL']}</button>
                    </footer>
                  </div>
                </li>
                <li>
                  <label>17:00</label>
                  <p>客户反馈问题跟进客户反馈问题跟进客户反馈问题跟进</p>
                  <div className="pop">
                    <header>
                      <label>17:00</label>
                      <p>客户反馈问题跟进客户反馈问题跟进客户反馈问题跟进客户反馈问题跟进客户反馈问题跟进客户反馈问题跟进</p>
                    </header>
                    <footer>
                      <button>{LConfig['TO_DETAIL']}</button>
                      <button>{LConfig['TO_EDIT']}</button>
                      <button>{LConfig['TO_DEL']}</button>
                    </footer>
                  </div>
                </li>
              </ul>
              {
                pageCount>1
                ?
                <div className="paging">
                  <span 
                    onClick={this.prevPage} 
                    className={`kara-oa-font${pageNo<=1 ? ' disabled' : ''}`}>&#xe618;</span>
                  {pageNo}
                  <span 
                    onClick={this.nextPage} 
                    className={`kara-oa-font${pageNo>=pageCount ? ' disabled' : ''}`}>&#xe7a5;</span>
                </div>
                :
                null
              }
            </section>
          </div>
        </section>
      </div>
    )
  }
}

export default Schedule
