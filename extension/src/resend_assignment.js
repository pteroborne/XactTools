chrome.omnibox.onInputEntered.addListener(function(text){
  var reg = /resend (.+)/;

  if(text.match(reg)){
    chrome.extension.getBackgroundPage().resend(reg.exec(text)[1].toUpperCase(), alert);
  }

});

function resend(mfn, callback){
  if(!mfn.trim()){
    callback('MFN cannot be empty');
    throw new Error('MFN cannot be null');
  }

  mfn = mfn.trim().toUpperCase();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://apps.xactware.com/apps/xactanalysis/request.jsp?ddid='+mfn+'&type=resend&submitted=yes&isqr=&can=no&notify=no', true);
  xhr.onerror = function(){
    callback('An error occured');
  }
  xhr.onload = function(){
    const response = document.createElement('html');
    response.innerHTML = this.response;

    if(response.querySelector('.alert b')){
      callback('Unauthorized Access');
    }else if(response.querySelector('#login-container')){
      callback('Not Logged In');
    }if(response.querySelector('td.wrap')){
      callback('Assignment was successfully resent');
    }else{
      callback('Unknown error occured');
    }
  }
  xhr.send();
}
