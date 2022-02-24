function open () {
    document.querySelector(".container").className = "container open";
  }
  
function close () { 
    document.querySelector(".container").className = "container";
  }
  
document.querySelector("#open").addEventListener('click', open);
document.querySelector("#close").addEventListener('click', close);