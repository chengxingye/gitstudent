import React, {Component} from 'react'
import './index.scss'
import Tool from '../Tool'
import Todo from '../Todo'
import Ad from '../Ad'
import Schedule from '../Schedule'
import News from '../News'
import API from '../../api'
import Scroll from 'react-scroller-plugin'
import 'react-scroller-plugin/lib/scroll.css'

class KaraOA extends Component{
  state = {
    bannerAD: {
      title: '',
      picUrl: '',
      linkUrl: '',
    }
  }

  componentDidMount(){
    API.get('/api/v1.0.0/sym/getWebBanner').end().then(res=>res.result.appADList[0].advertisementList[0]).then(res=>{
      this.setState({
        bannerAD: {
          title: res.title,
          picUrl: res.picUrl,
          linkUrl: res.linkUrl,
        }
      })
    })
  }

  render(){
    const {bannerAD} = this.state

    return (
      <div className="KaraOA">
        <Scroll>
          <div className="KaraOAContainer">
            <a 
              target="_blank"
              title={bannerAD.title} 
              style={{backgroundImage: `url(${bannerAD.picUrl})`}}
              href={bannerAD.linkUrl}></a>
            <section>
              <Tool />
              <Todo />
              <Ad />
              <Schedule />
              <News />
            </section>
          </div>
        </Scroll>
      </div>
    )
  }
}

export default KaraOA
