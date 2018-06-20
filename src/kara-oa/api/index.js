import 'whatwg-fetch'
import Config from '../stores/Config'

export default{
  url: '',
  method: 'GET',
  get(url){
    this.url = Config.karagw + url
    this.method = 'GET'
    return this
  },
  post(url){
    this.url = Config.karagw + url
    this.method = 'POST'
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
      },
      body
    }).then(res=>res.json())
  },
}
