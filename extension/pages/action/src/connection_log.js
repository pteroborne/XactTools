function connectionLog(xna, callback){

  //Input validation
  if(!xna || typeof xna !== 'string'){
    callback('Invalid input type');
    throw new Error('Invalid input type');
  }

  xna = xna.trim().toUpperCase();

  //Find company ID
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.tregan.io/xw/getAccount/xna/'+xna, true);
  xhr.onload = function(){

    //Parse response from API
    const response = JSON.parse(this.response);
    if(!response.success){
      callback(response.reason);
      throw new Error(response.reason);
    }

    //Open log
    chrome.tabs.create({url: 'https://apps.xactware.com/apps/cxa/adminConnectLog.jsp?xn_address='+xna+'&fcoid='+response.data.account});
  }
  xhr.send();
}
