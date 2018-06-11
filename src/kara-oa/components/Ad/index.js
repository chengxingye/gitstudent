import React, {Component} from 'react'
import './index.scss'
import {Paging} from '../common'

class Ad extends Component{
  state = {
    list: [
      'https://home.asiainfo.com/AIFLS/FileRoot/5/6/5/56573867-1d18-96b4-4fcf-adb01dcaa768/%E5%91%A8%E4%B8%89%E5%BE%AE%E8%AF%BE.jpg',
      'https://home.asiainfo.com/AIFLS/FileRoot/f/6/e/f6eaf6a7-754a-b44c-44d2-4b493cf18f0b/%E5%BA%94%E6%94%B6%E7%BB%93%E7%AE%97%E7%B3%BB%E7%BB%9F%E5%B9%BF%E5%91%8Abanner.png',
      'https://home.asiainfo.com/AIFLS/FileRoot/d/f/a/dfa7c274-108a-8ae5-4ffa-dae2a29011a4/%E4%BA%9A%E4%BF%A1%E6%96%87%E5%8C%96.jpg',
    ],
    isEnter: false,
    activeIndexUI: 0
  }

  constructor(props){
    super(props)
    this.wrapper = React.createRef()
    this.activeIndex = null
  }

  componentDidMount(){
    this.start()
  }

  start = ()=>{
    if(this.state.list.length <= 1) return
    if(this.activeIndex === null){
      this.activeIndex = 1
      this.wrapper.current.style.transform = `translate3d(${-483*this.activeIndex}px,0,0)`
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(this.carousel, 5000)
  }

  end = ()=>{
    clearTimeout(this.timer)
  }

  onTransitionEnd = e=>{
    if(this.state.isEnter) return
    this.start()
  }

  onMouseEnter = e=>{
    this.setState({isEnter: true})
    this.end()
  }

  onMouseLeave = e=>{
    this.setState({isEnter: false})
    this.start()
  }

  prev = ()=>{
    this.carousel(true)
  }

  next = ()=>{
    this.carousel(false)
  }

  toPage = activeIndex=>{
    this.activeIndex = activeIndex+1
    this.wrapper.current.className = 'anim'
    this.wrapper.current.style.transform = `translate3d(${-483*this.activeIndex}px,0,0)`
    this.setState({activeIndexUI: activeIndex})
  }

  carousel = (direction=false)=>{
    const {list} = this.state
    this.activeIndex = direction ? this.activeIndex-1 : this.activeIndex+1
    if(this.activeIndex>0 && this.activeIndex<list.length+1){
      this.wrapper.current.className = 'anim'
      this.wrapper.current.style.transform = `translate3d(${-483*this.activeIndex}px,0,0)`
      this.setState({activeIndexUI: this.activeIndex-1})
    }else{
      this.activeIndex = this.activeIndex<=0 ? list.length+1 : 0
      this.wrapper.current.removeAttribute('class')
      this.wrapper.current.style.transform = `translate3d(${-483*this.activeIndex}px,0,0)`
      setTimeout(this.carousel, 0, direction)
    }
  }

  render(){
    let {list: uiList, isEnter, activeIndexUI} = this.state
    let len = uiList.length
    if(len > 1){
      uiList = [uiList[len-1], ...uiList, uiList[0]]
    }

    return (
      <div 
        className="Ad"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <ul 
          ref={this.wrapper} 
          onTransitionEnd={this.onTransitionEnd}>
          {
            uiList.map((ad, index)=>(<li key={index} style={{backgroundImage: `url(${ad})`}}></li>))
          }
        </ul>
        <span 
          className={`${isEnter&&len > 1 ? '' : 'hide '}left kara-oa-font`}
          onClick={this.prev}
          >&#xe618;</span>
        <span 
          className={`${isEnter&&len > 1 ? '' : 'hide '}right kara-oa-font`}
          onClick={this.next}
          >&#xe7a5;</span>
        {
          len>1
          ?
          <Paging 
            no={activeIndexUI} 
            count={len}
            onChange={this.toPage} />
          :
          null
        }
      </div>
    )
  }
}

export default Ad
