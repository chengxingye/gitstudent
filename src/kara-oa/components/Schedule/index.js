import React, {Component} from 'react'
import './index.scss'

class Schedule extends Component{
  render(){
    return (
      <div className="Schedule">
        <header>
          我的日程
          <button className="kara-oa-font">&#xe671;</button>
        </header>
        <section>
          <div className="left">
            <h1>
              <i className="kara-oa-font">&#xe618;</i>
              &ensp;2018年5月&ensp;
              <i className="kara-oa-font">&#xe7a5;</i>
            </h1>
            <header>
              <b>日</b>
              <b>一</b>
              <b>二</b>
              <b>三</b>
              <b>四</b>
              <b>五</b>
              <b>六</b>
            </header>
            <div>
              <span className="gray">26</span>
              <span className="gray">27</span>
              <span className="gray">28</span>
              <span className="gray">29</span>
              <span className="gray">30</span>
              <span className="gray">31</span>
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
              <span>06</span>
              <span>07</span>
              <span>08</span>
              <span>09</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span className="mark">17</span>
              <span className="mark">18</span>
              <span className="mark">19</span>
              <span>20</span>
              <span className="cur">21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span>
              <span>26</span>
              <span className="mark">27</span>
              <span>28</span>
              <span>29</span>
              <span className="mark">30</span>
              <span>31</span>
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
            </div>
          </div>
          <div className="right">
            <h1>我的日程<button>+添加日程</button></h1>
          </div>
        </section>
      </div>
    )
  }
}

export default Schedule
