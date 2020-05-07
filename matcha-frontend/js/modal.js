const modal = document.querySelectorAll('.modal');
//const close1 = document.getElementsByClassName("close")[0]
const close = document.querySelectorAll('.close')

if(close[0]){
  close[0].onclick = function() {
    modal[0].style.display = "none"
  }
}

if(close[1]){
  close[1].onclick = function() {
    modal[1].style.display = "none"
  }
}