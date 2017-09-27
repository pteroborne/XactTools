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

  //Run function
  window[e.target.closest('.act').getAttribute('data-action')](input, message);
}

function removeInputError(){
  this.classList.remove('error');
  this.removeEventListener('input', removeInputError);
}

function message(msg){
  while(document.body.firstChild){
    document.body.firstChild.remove();
  }

  const message = document.createElement('div');
  message.classList.add('message');
  const text = document.createTextNode(msg);
  message.append(text);
  document.body.append(message);
}

function encodeURIData(obj){
  if(typeof obj !== 'object'){
    throw new Error('Invalid input: Expected object. Received '+typeof obj);
  }

  let response = '';

  for(let i in obj){
    if(response !== ''){
      response += '&';
    }

    response += i + '=' + obj[i];
  }

  return response;
}
