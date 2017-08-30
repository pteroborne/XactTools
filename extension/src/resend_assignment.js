chrome.omnibox.onInputEntered.addListener(function(text){
  var reg = /resend (.+)/;

  if(text.match(reg)){
    var mfn = reg.exec(text)[1].toUpperCase();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://apps.xactware.com/apps/xactanalysis/request.jsp?ddid='+mfn+'&type=resend&submitted=yes&isqr=&can=no&notify=no', true);
    xhr.onerror = function(){
      alert('An error occured');
    }

    xhr.onload = function(){
      const response = document.createElement('html');
      response.innerHTML = this.response;

      if(response.querySelector('.alert b')){
        window.alert('Unauthorized Access')
      }else if(response.querySelector('#login-container')){
        window.alert('Not Logged In')
      }else if(response.querySelector('td.wrap')){
        window.alert('Assignment was successfully resent');
      }else{
        window.alert('Unknown error occured');
      }
    }

    xhr.send();
  }
})
