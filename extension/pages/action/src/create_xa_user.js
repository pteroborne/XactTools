function createXAUser(input, callback){

  //Load and replace HTML
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'src/create_xa_user.html', true);
  xhr.onload = function(){
    while(document.body.firstChild){
      document.body.firstChild.remove();
    }

    document.body.innerHTML = this.response;
    init();
  }
  xhr.send();

  function init(){

    //Add radio listeners
    const radio_items = document.querySelectorAll('.radio');
    for(let i = 0; i < radio_items.length; i++){
      radio_items[i].addEventListener('click', radioControl);
    }

    //Submit function
    document.getElementById('submit').addEventListener('click', function(){

      const inputs = document.querySelectorAll('input');
      let failed = false;

      //Check if all fields are filled
      for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value.trim() === ''){
          inputs[i].addEventListener('input', removeInputError);
          inputs[i].classList.add('error');
          failed = true;
        }
      }

      if(failed){
        throw new Error('Missing required fields');
      }

      //Do stuff
      console.log(true);
    });

    //Add pre-given XID
    if(typeof input === 'string'){
      document.getElementById('xid').value = input;
    }
  }

  function radioControl(e){
    document.querySelector('.radio.sel').classList.remove('sel');
    e.target.classList.add('sel');
  }
}
