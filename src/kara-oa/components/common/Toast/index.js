export default {
  show(msg, fn, bgColor='rgba(255,83,63,0.8)'){
    let toastPanel = document.getElementById('_REACT_TOAST_')
    if(!toastPanel){
      toastPanel = document.createElement('div')
      toastPanel.id = '_REACT_TOAST_'
      toastPanel.style.cssText = 'position:absolute;left:0;top:0;z-inedx:80;width:100%;height:auto;font-size:14px;color:#FFFFFF;text-align:center;line-height:40px;background-color:#FFFFFF;'
    }
    let p = document.createElement('p')
    p.style.cssText = `background-color:${bgColor};margin-bottom:2px;word-break:break-all;`
    p.innerHTML = msg
    toastPanel.appendChild(p)
	let root = document.getElementById('web')||document.getElementById('client')
    root.appendChild(toastPanel)
    setTimeout(()=>{
      toastPanel.removeChild(p)
      if(typeof fn === 'function'){
        fn()
      }
    }, 1500)
  },
  info(msg, fn){
    this.show(msg, fn, 'rgba(88,170,72,.6)')
  },
  error(msg, fn){
    this.show(msg, fn, 'rgba(255,83,63,0.8)')
  },
}
