export function xaLogin(callback){
  //Get credentials
  const creds = JSON.parse(localStorage.getItem('xid_creds'));

  //Set empty function if callback wasn't set
  if(!callback || typeof callback !== 'function'){
    callback = function(){}
  }

  //Log out of any existing sessions
  fetch('https://apps.xactware.com/apps/shared/logout.jsp?fullxa=true', {
    method: 'GET',
    credentials: 'include',
  }).then(initLogin);

  //Initial login
  function initLogin(){
    fetch('https://apps.xactware.com/apps/shared/LoginServlet', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodeData({
        context: 'GENER',
        app: 'xnportal',
        loginPage: 'welcome.jsp',
        startPage: '/apps/routing/routeUser.do',
        user_id: creds.user,
        password: creds.pass
      }),
    }).then((response)=>{
      response.text().then((text)=>{
        //Create virtual DOM
        const dom = document.implementation.createHTMLDocument();
        dom.documentElement.innerHTML = text;

        //If login failed
        if(dom.documentElement.querySelector('form') && dom.documentElement.querySelector('form').name === 'login'){
          callback(false, 'Email or password incorrect');
          return;
        }

        getAccounts();
      });
    });
  }

  //Get Xactware account number
  function getAccounts(){
    fetch('https://apps.xactware.com/apps/xnportal/xid_landing.jsp', {
      method: 'GET',
      credentials: 'include'
    }).then((response)=>{
      response.text().then((text)=>{
        //Create virtual DOM
        const dom = document.implementation.createHTMLDocument();
        dom.documentElement.innerHTML = text;

        //Find account
        const row = dom.documentElement.querySelector('[accountname="Xactware"]');

        //If super account doesn't exist
        if(!row){
          callback(false, 'Xactware account not found on ID');
          return;
        }

        //Store account number
        const xa_id = row.getAttribute('number');
        localStorage.setItem('xa_id', xa_id);

        openSuperAccount(xa_id);
      });
    });
  }

  //Select super account
  function openSuperAccount(xa_id){
    fetch('https://apps.xactware.com/apps/shared/XALoginServlet', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodeData({usernumber: xa_id})
    }).then((response)=>{
      response.json().then((json)=>{
        //Successful login
        if(json.success){
          callback(true);
        }else{
          callback(false, json.message ? json.message : 'Login failed for an unknown reason');
        }
      });
    });
  }
}

//Convert object into x-www-form-urlencoded
function encodeData(d){
  let s = [];
  for(let i in d){
    const k = encodeURIComponent(i);
    const v = encodeURIComponent(d[i]);
    s.push(k+'='+v);
  }
  s = s.join('&');
  return s;
}
