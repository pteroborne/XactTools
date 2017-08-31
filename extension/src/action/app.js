const bg = chrome.extension.getBackgroundPage();

window.addEventListener('DOMContentLoaded', function(){
  const actions = document.querySelectorAll('.act');

  //Add listeners
  for(let i = 0; i < actions.length; i++){
    actions[i].addEventListener('click', action);
  }
});

function action(e){
  const input = document.getElementById('input').value.trim();

  if(!input){
    document.getElementById('input').classList.add('error');
    document.getElementById('input').addEventListener('input', removeInputError);
    return;
  }

  switch(e.target.closest('.act').getAttribute('data-action')){
    default:break;
  }
}

function removeInputError(){
  this.classList.remove('error');
  this.removeEventListener('input', removeInputError);
}
