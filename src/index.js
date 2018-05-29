import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import KaraOA from './kara-oa'

ReactDOM.render(
  <KaraOA />,
  document.getElementById('app')
)

if(module.hot){
  module.hot.accept()
}
