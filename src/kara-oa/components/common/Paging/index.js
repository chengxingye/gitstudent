import React, {Component} from 'react'
import './index.scss'

class Paging extends Component{
  onChange = e=>{
    if(e.target.dataset.ii !== undefined){
      this.props.onChange(Number(e.target.dataset.ii))
    }
  }

  render(){
    const {no, count} = this.props
    return (
      <div className="Paging" onClick={this.onChange}>
        {
          Array.from({length: count}).map((page, ii)=>(<i data-ii={ii} className={ii===no ? 'active' : ''} key={ii}></i>))
        }
      </div>
    )
  }
}

export default Paging
