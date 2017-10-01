function createXAUser(input, callback){

  //Variable declarations
  let user_number, account;

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

    //Add 'Enter' key alias
    window.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        check();
      }
    });

    //Submit function
    document.getElementById('submit').addEventListener('click', check);

    //Add pre-given XID
    if(typeof input === 'string'){
      document.getElementById('xid').value = input;
    }
  }

  function innerMessage(msg){
    const duration = 3000;

    //Delete existing message
    if(document.querySelector('.msg')){
      document.querySelector('.msg').remove();
    }

    const m = document.createElement('div');
    m.classList.add('msg', 'hidden');
    m.innerHTML = msg;
    document.body.appendChild(m);

    //Get opacity transition from CSS
    const cssTransition = getComputedStyle(m).transition.match(/opacity ([0-9.]+)s/)[1] * 1000;

    //Fade in animation
    setTimeout(function(){
      m.classList.remove('hidden');
    }, 1);

    //Fade out animation
    setTimeout(function(){
      m.classList.add('hidden');
    }, duration + cssTransition);

    //Remove message
    setTimeout(function(){
      m.remove();
    }, duration + cssTransition + cssTransition);
  }

  function radioControl(e){
    document.querySelector('.radio.sel').classList.remove('sel');
    e.target.classList.add('sel');
  }

  function lockInput(){

    //Disable inputs
    const inputs = document.querySelectorAll('input');
    for(let i = 0; i < inputs.length; i++){
      inputs[i].disabled = true;
    }

    //Disable radio control
    const radio = document.querySelectorAll('.radio');
    for(let i = 0; i < radio.length; i++){
      radio[i].removeEventListener('click', radioControl);
      radio[i].classList.add('disabled');
    }

    //Disable submit button
    document.getElementById('submit').classList.add('disabled');
    document.getElementById('submit').removeEventListener('click', check);

    //Add loader
    const loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);
  }

  function check(){
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

    lockInput();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.tregan.io/xw/getAccount/xna/'+document.getElementById('xna').value.trim(), true);
    xhr.onload = function(){
      const response = JSON.parse(this.response);
      if(response.success){
        submit();
      }else{
        innerMessage(response.reason);
        throw new Error(response.reason);
      }
    }
    xhr.send();
  }

  function submit(){

    account = document.querySelector('.radio.sel').innerHTML === 'Contractor' ? 'Contractor' : 'Adjuster';

    //Create user request
    const data = {
      account: account,
      userAccount: account,
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
      redirectOnDelete: './UserList.jsp?account='+account,
      test_user: false,
      userNumber: 0,
      user_number: 0,
      xid_action: 'xida_create'
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apps.xactware.com/apps/xnadmin/SaveUser', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = addRights;
    xhr.send(encodeURIData(data));
  }

  function addRights(){
    const html = document.createElement('html');
    html.innerHTML = this.response;
    const script = html.querySelector('script');

    const alertMessage = script.innerHTML.match(/alert\("(.*)"\)/);

    //If creation failed
    if(!!alertMessage){
      innerMessage(alertMessage[1].replace(/\\n/gi, ' '));
      throw new Error(alertMessage[1].replace(/\\n/gi, ' '));
    }

    //Get user number
    user_number = script.innerHTML.match(/user_number=([A-Za-z0-9]+)/)[1];

    //Add Rights
    const data = {
      account: account,
      userAccount: account,
      email_address: document.getElementById('xid').value.trim().replace(/\s/g, ''),
      first_name: document.getElementById('fname').value.trim().replace(/\s/g, ''),
      last_name: document.getElementById('lname').value.trim().replace(/\s/g, ''),
      user_id: document.getElementById('uid').value.trim().replace(/\s/g, ''),
      userNumber: user_number,
      user_number: user_number,

      //Other required info
      addAnother: false,
      command: false,
      context: 'GENER',
      locale: 'en_US',
      redirectOnDelete: './UserList.jsp?account='+account,
      test_user: false,
    }

    let dataToSend = encodeURIData(data);

    //Add account specific rights
    if(account === 'Adjuster'){
      dataToSend += '&appRight_=xasp|action_items&appRight_=cxa|pers_rules&appRight_=cxa|run&appRight_=roof_insight|request';
    }else if(account === 'Contractor'){
      dataToSend += '&appRight_=xasp|action_items&appRight_=cxa|pers_rules&appRight_=cxa|run&appRight_=cxa|reports&appRight_=roof_insight|request';
    }

    //Send request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apps.xactware.com/apps/xnadmin/SaveUser', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = addCompanyRight;
    xhr.send(dataToSend);
  }

  function addCompanyRight(){
    if(account === 'Adjuster'){
      const data = {
        CoRight_: '-3|'+document.getElementById('xna').value.trim().toUpperCase()+'|-3|-3|-3|-3',
        account: account,
        carrier: '-3',
        user_number: user_number,
        xna: document.getElementById('xna').value.trim().toUpperCase()
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://apps.xactware.com/apps/xnadmin/UpdateCoRights.jsp', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function(){
        message('Success');
      }
      xhr.send(encodeURIData(data));
    }else if(account === 'Contractor'){

      //Get company ID from XNA
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.tregan.io/xw/getAccount/xna/'+document.getElementById('xna').value.trim(), true);
      xhr.onload = function(){
        const response = JSON.parse(this.response);
        const acct = response.data.account;
        const x = new XMLHttpRequest();
        x.open('GET', 'https://apps.xactware.com/apps/xnadmin/UpdateCoRights.jsp?user_number='+user_number+'&account=Contractor&level1=-2&level2=-2&level3=-2&level4=-2&mode=&companyID=&CoRight_='+acct+'%7C%7C-2%7C-2%7C-2%7C-2&carrier='+acct+'&xna=', true);
        x.onload = function(){
          message('Success');
        }
        x.send();
      }
      xhr.send();
    }
  }
}
