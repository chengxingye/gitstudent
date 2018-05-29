import {observable, action} from 'mobx'

class Store1 {
  @observable xxx = {}

  @action setXXX = xxx=>{
    this.xxx = xxx
  }
}

export default new Store1()
