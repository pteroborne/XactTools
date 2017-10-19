export function xaLogin(){
  //Get credentials
  const creds = JSON.parse(localStorage.getItem('xid_creds'));

  //Send login request
  fetch('https://apps.xactware.com/apps/shared/LoginServlet', {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodeData({
      app: 'xnportal',
      context: 'GENER',
      loginPage: 'welcome.jsp',
      startPage: '/apps/routing/routeUser.do',
      user_id: creds.user,
      password: creds.pass
    })
  }).then((response)=>{
    response.text().then((text)=>{
      getAccount(text);
    });
  });

  //Get account number
  function getAccount(t){
    //Creat virtual document
    const html = document.implementation.createHTMLDocument();
    html.documentElement.innerHTML = t;
    console.log(html);

    //Check if login was successful
    if(!html.documentElement.querySelector('#accountBody')){
      console.log('Login Failed');
      return;
    }

    //Find Xactware account
    const xwRow = html.documentElement.querySelector('[accountname="Xactware"]');

    //If Xactware account doesn't exist
    if(!xwRow){
      console.log('Super account doesn\'t exist');
      return;
    }

    //Store account number
    const xa_id = xwRow.getAttribute('number');
    localStorage.setItem('xa_id', xa_id);

    //Login with Xactware account
    fetch('https://apps.xactware.com/apps/shared/XALoginServlet', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodeData({usernumber: xa_id})
    }).then((response)=>{
      response.json().then((json)=>{
        if(json.success){
          console.log('Login Successful');
        }else{
          console.log(json.message ? json.message : 'Login failed for an unknown reason');
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
