function openLicenseAdmin(input, callback){
  input = input.trim();

  //If input is text
  console.log('hi');
  if(isNaN(input)){

    //Request company based on XNA
    const x = new XMLHttpRequest();
    x.open('GET', 'https://api.tregan.io/xw/getAccount/xna/'+input, true);
    x.onload = function(){
      const response = JSON.parse(this.response);
      if(response.success){
        chrome.tabs.create({url: 'https://apps.xactware.com/apps/shared/licenseAdmin.jsp?fcoid='+response.data.account});
      }else{
        callback(response.reason);
      }
    }
    x.send();
  }else{
    chrome.tabs.create({url: 'https://apps.xactware.com/apps/shared/licenseAdmin.jsp?fcoid='+input});
  }
}
