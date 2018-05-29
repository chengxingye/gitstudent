import {observable, action} from 'mobx'

class Store2 {
  @observable xxx2 = {}

  @action setXXX2 = xxx2=>{
    this.xxx2 = xxx2
  }
}

export default new Store2()
