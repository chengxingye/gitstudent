import React, {Component} from 'react'
import './index.scss'
import {Paging} from '../common'
import API from '../../api'

class Ad extends Component{
  state = {
    list: [],
    isEnter: false,
    activeIndexUI: 0
  }

  constructor(props){
    super(props)
    this.wrapper = React.createRef()
    this.activeIndex = null
  }

  componentDidMount(){
    API.get('/api/v1.0.0/sym/getAD.web').end().then(res=>res.result.appADList[0].advertisementList).then(res=>{
      this.setState({
        list: res.map(l=>({
          title: l.title,
          picUrl: l.picUrl,
          linkUrl: l.linkUrl,
        }))
      })
      setTimeout(this.start, 0)
    })
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
        <nav 
          ref={this.wrapper} 
          onTransitionEnd={this.onTransitionEnd}>
          {
            uiList.map((ad, index)=>(
              <a 
                target="_blank"
                title={ad.title}
                key={index} 
                style={{backgroundImage: `url(${ad.picUrl})`}}
                href={ad.linkUrl}></a>
            ))
          }
        </nav>
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
