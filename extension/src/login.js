function xa_login(callback){
  if(typeof callback !== 'function'){
    callback = function(success, msg){
      console.log('Success: '+success, 'Message: '+msg);
    }
  }

  //Login with XID
  function loginServlet(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apps.xactware.com/apps/shared/LoginServlet', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
      const dom = document.createElement('html');
      dom.innerHTML = this.response;

      //Check if login was successful
      if(dom.querySelector('script').innerHTML.trim() === 'document.location.replace("/apps/xactanalysis/welcome.jsp");'){
        xid_landing();
      }else if(dom.querySelector('.message').innerHTML.trim() === 'Please enter your Xactware ID and password. If you don\'t have an Xactware ID click the \'Get an Xactware ID\' link below.'){
        callback(false, 'Xactware ID Invalid');
        return;
      }else{
        callback(false, dom.querySelector('.message').innerHTML.trim());
      }
    }

    //Fetch credentials from storage
    chrome.storage.local.get('xid', function(o){
      const params = {
        app: 'xnportal',
        loginPage: 'welcome.jsp',
        startPage: '/apps/routing/routeUser.do',
        user_id: o.xid.user,
        password: o.xid.pass
      }

      xhr.send(encodeFormData(params));
    });
  }

  //Get superuser account #
  function xid_landing(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://apps.xactware.com/apps/xnportal/xid_landing.jsp', true);
    xhr.onload = function(){
      const dom = document.createElement('html');
      dom.innerHTML = this.response;
      const allAccounts = dom.querySelectorAll('#accountBody tr');
      for(let i = 0; i < allAccounts.length; i++){
        if(allAccounts[i].getAttribute('accountname') === 'Xactware'){
          XALoginServlet(allAccounts[i].getAttribute('number'));
          return;
        }
      }
      callback(false, 'No super accounts found');
    }
    xhr.send();
  }

  //Log into super account
  function XALoginServlet(id){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apps.xactware.com/apps/shared/XALoginServlet', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
    xhr.onload = function(){
      const response = JSON.parse(this.response);
      if(response.success){
        callback(true);
      }else{
        callback(false, response.message || 'Failed to open super user account');
      }
    }
    xhr.send('usernumber='+id);
  }

  //Start command
  loginServlet();
}

function encodeFormData(params){
  var str = '';
  for(let key in params){
    if(key != ''){
      str += '&';
    }
    str += key + '=' + encodeURIComponent(params[key]);
  }
  return str;
}
