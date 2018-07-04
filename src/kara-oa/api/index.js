import 'whatwg-fetch'
import Config from '../stores/Config'
import {errorTost} from "kara-module-tost"

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
      errorTost({msg: 'Please try again later.', time: 1.5})
      return Promise.reject()
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.error_description){
        errorTost({msg: res.error_description, time: 1.5})
        return Promise.reject()
      }else if(res.resultCode !== '000000'){
        errorTost({msg: res.resultMessage, time: 1.5})
        return Promise.reject()
      }else{
        return res
      }
    })
  },
}
