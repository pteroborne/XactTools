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
      console.log(text);
    });
  });
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
