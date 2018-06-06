import {observable, action} from 'mobx'

class Config {
  @observable token = null
  @observable karagw = null
  @observable lang = null
}

export default new Config()
