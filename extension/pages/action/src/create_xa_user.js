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

      //Create user request
      const data = {
        account: 'Adjuster',
        userAccount: 'Adjuster',
        email_address: document.getElementById('xid').value.trim().replace(/\s/g, ''),
        xid: document.getElementById('xid').value.trim().replace(/\s/g, ''),
        first_name: document.getElementById('fname').value.trim().replace(/\s/g, ''),
        last_name: document.getElementById('lname').value.trim().replace(/\s/g, ''),
        user_id: document.getElementById('uid').value.trim().replace(/\s/g, ''),

        //Other required data
        addAnother: false,
        command: false,
        context: 'GENER',
        grant_future_rights: false,
        locale: 'en_US',
        password: 'T3stP@ssw0rd',
        password2: 'T3stP@ssw0rd',
        redirectOnDelete: './UserList.jsp?account=Adjuster',
        test_user: true,
        userNumber: 0,
        user_number: 0,
        xid_action: 'xida_create'
      };

      let dataToSend = '';

      for(let i in data){
        if(dataToSend !== ''){
          dataToSend += '&';
        }

        dataToSend += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://apps.xactware.com/apps/xnadmin/SaveUser', true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = addRights;
      xhr.send(dataToSend);

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

  function addRights(){
    const html = document.createElement('html');
    html.innerHTML = this.response;
    const script = html.querySelector('script');

    const alertMessage = script.innerHTML.match(/alert\("(.*)"\)/);

    //If creation was successful
    if(!alertMessage){
      message('Success');
    }else{
      message(alertMessage[1].replace(/\\n/gi, ' '));
    }
  }
}
