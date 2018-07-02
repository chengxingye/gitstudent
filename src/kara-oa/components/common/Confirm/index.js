export default function Confirm(msg, fn=()=>{}){
  Confirm._fn = fn
  let confirm = document.getElementById('_KARAOA_CONFIRM_')
  if(!confirm){
    confirm = document.createElement('div')
    confirm.id = '_KARAOA_CONFIRM_'
    confirm.style.cssText = 'position: absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:rgba(0,0,0,0.5);'
    let panel = document.createElement('div')
    panel.style.cssText = 'position:absolute;left:50%;top:50%;padding:30px 50px;background-color:#FFFFFF;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);border-radius:5px;overflow:hidden;'
    let p = document.createElement('p')
    p.style.cssText = 'font-size:18px;color:#232323;line-height:27px;word-break:break-all;'
    p.innerHTML = msg;
    let cancel = document.createElement('button')
    cancel.style.cssText = 'border:none;width:106px;height:32px;border-radius:5px;margin:0 12px;background-color:#bfbfbf;font-size:14px;color:#fffefe;cursor:pointer;outline:none;'
    cancel.appendChild(document.createTextNode('取消'))
    let ok = document.createElement('button')
    ok.appendChild(document.createTextNode('确定'))
    ok.style.cssText = 'border:none;width:106px;height:32px;border-radius:5px;margin:0 12px;background-color:#ff8928;font-size:14px;color:#fffefe;cursor:pointer;outline:none;'
    let footer = document.createElement('footer')
    footer.style.cssText = 'text-align:center;padding-top:30px;'
    footer.appendChild(cancel)
    footer.appendChild(ok)
    panel.appendChild(p)
    panel.appendChild(footer)
    confirm.appendChild(panel)
    panel.addEventListener('click', e=>{
      e.stopPropagation()
      if(e.target.tagName === 'BUTTON'){
        confirm.style.display = 'none'
        if(e.target === ok){
          Confirm._fn()
        }
      }
    }, false)
    confirm.addEventListener('click', e=>{
      confirm.style.display = 'none'
    }, false)
	let root = document.getElementById('web')||document.getElementById('client')
    root.appendChild(confirm)
  }
  confirm.style.display = 'block'
}
