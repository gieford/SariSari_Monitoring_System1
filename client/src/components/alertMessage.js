export const alertMessage = (msg,duration) => {
  var el = document.createElement("div");
  el.setAttribute("style","position: fixed; top:40%; botton: 40%; left: 30%; right: 30%; width: auto; height: auto; text-align: center; border: 1px solid black; padding: 20px; background: rgb(230,230,230); z-index: 1;");
//  el.setAttribute("style","position: fixed; right:0%; botton: 0%; width: auto; height: auto; text-align: center; border: 1px solid black; padding: 20px; background: rgb(230,230,230); z-index: 1;");
  el.innerHTML = msg;
  setTimeout(function(){
    el.parentNode.removeChild(el);
  },duration);
  document.body.appendChild(el);
}
