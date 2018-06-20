import {observable, action} from 'mobx'

class Config {
  @observable token = ''
  @observable karagw = ''
  @observable language = 'zh' // zh: 中文 en: 英文

  @action set(token, karagw, language){
    this.token = token || this.token
    this.karagw = karagw || this.karagw
    this.language = language || this.language
  }
}

export default new Config()
