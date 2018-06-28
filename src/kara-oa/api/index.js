import 'whatwg-fetch'
import Config from '../stores/Config'
import {Toast} from '../components/common'

export default{
  url: '',
  method: 'GET',
  header: {},
  get(url, header={}){
    this.url = Config.karagw + url
    this.method = 'GET'
    this.header = header
    return this
  },
  post(url, header={}){
    this.url = Config.karagw + url
    this.method = 'POST'
    this.header = header
    return this
  },
  end(params, body){
    if(params){
      this.url += this.url.indexOf("?")!=-1 ? "&" : "?"
      this.url += Object.keys(params).map(k=>k+'='+encodeURIComponent(params[k])).join('&')
    }

    return fetch(this.url, {
      method: this.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${Config.token}`,
        ...this.header,
      },
      body: JSON.stringify(body),
    })
    .catch(e=>{
      Toast.error('Please try again later.')
      return Promise.reject()
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.error_description){
        Toast.error(res.error_description)
        return Promise.reject()
      }else if(res.resultCode !== '000000'){
        Toast.error(res.resultMessage)
        return Promise.reject()
      }else{
        return res
      }
    })
  },
}
