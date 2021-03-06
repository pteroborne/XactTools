(function() {

  //Check if on search pages
  function checkPage(){
    //If search page is loaded
    if(location.pathname.match(/\/kcm\/search/) && document.querySelector('fieldset')){
      addSearchInput();

    //If KCM page is loaded
    }else if(location.pathname.match(/\kcm\/company\/([0-9]*)/) && document.querySelector('.panel-heading')){
      addLicenseAdmin();
    }

    setTimeout(checkPage, 50);
  }

  setTimeout(checkPage, 50);

  //Adds search bar to form
  function addSearchInput(){
    const elmt = document.querySelector('fieldset');

    if(document.getElementById('xacttools_xna')){
      return;
    }

    const container = document.createElement('div');
    container.classList.add('form-group', 'form-group-sm');

    const label = document.createElement('label');
    label.classList.add('col-sm-3', 'control-label');
    label.htmlFor = 'xacttools_xna';
    label.innerHTML = 'XactNet Address';

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('col-sm-6');

    const input = document.createElement('input');
    input.id = 'xacttools_xna';
    input.type = 'text';
    input.classList.add('form-control');
    input.placeholder = 'XactNet Address';
    input.addEventListener('keydown', function(e){
      if(e.code === 'Enter' || e.key === 'Enter' || e.which === 13){
        if(document.getElementById('xacttools_xna').value){
          e.stopPropagation();
          submit();
        }
      }
    });

    inputContainer.append(input);
    container.append(label);
    container.append(inputContainer);
    elmt.insertBefore(container, elmt.lastChild);

    //Adds event listener to default search button
    elmt.querySelector('button').addEventListener('click', function(e){
      if(document.getElementById('xacttools_xna').value){
        console.log(e.preventDefault());
        console.log(e.stopPropagation());
        submit();
      }
    })
  }

  //Add license admin link
  function addLicenseAdmin(){
    if(document.getElementById('license_admin')){
      return;
    }

    const btnContainer = document.createElement('a');
    btnContainer.classList.add('btn-group', 'pull-right');
    btnContainer.id = 'license_admin';
    btnContainer.target = '_blank';
    btnContainer.rel = 'noopener noreferrer';
    btnContainer.href = 'https://apps.xactware.com/apps/shared/licenseAdmin.jsp?fcoid='+location.pathname.match(/\kcm\/company\/([0-9]*)/)[1];
    //Prevent drop down from expanding
    btnContainer.addEventListener('click', function(e){
      e.stopPropagation();
    })

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-link', 'ng-scope');
    btn.type = 'button';
    btn.innerHTML = 'License Admin';

    btnContainer.appendChild(btn);
    document.querySelector('.panel-heading').appendChild(btnContainer);
  }

  //Send api request
  function submit(){
    const xna = document.getElementById('xacttools_xna').value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.tregan.io/xw/getAccount/xna/'+xna, true);

    xhr.onerror = function(){

      //Remove alert if it exists
      while(document.querySelector('.alert')){
        document.querySelector('.alert').remove();
      }

      //Add new alert
      const alert = document.createElement('div');
      alert.classList.add('alert', 'alert-danger');
      alert.role = 'alert';

      const alertIcon = document.createElement('i');
      alertIcon.classList.add('fa', 'fa-exclamation-circle');
      alert.append(alertIcon);

      const alertText = document.createTextNode(' An error occured while fetching XactNet Address');
      alert.append(alertText);

      document.querySelector('fieldset').insertBefore(alert, document.querySelector('fieldset').firstChild);
    }

    xhr.onload = function(){

      //Parse response
      let response;
      try{
        response = JSON.parse(this.response);
      }catch(e){
        xhr.onerror();
        throw new Error('Failed to parse reponse.', this.response);
      }

      //If no XNA exists
      if(!response.success){
        //Remove alert if it exists
        while(document.querySelector('.alert')){
          document.querySelector('.alert').remove();
        }

        //Add new alert
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-warning');
        alert.role = 'alert';

        const alertIcon = document.createElement('i');
        alertIcon.classList.add('fa', 'fa-exclamation-triangle');
        alert.append(alertIcon);

        const alertText = document.createTextNode(' XactNet Address Not Found');
        alert.append(alertText);

        document.querySelector('fieldset').insertBefore(alert, document.querySelector('fieldset').firstChild);
        return;
      }

      //Navigate to company page
      window.location = '/kcm/company/'+response.data.account;
    }

    xhr.send();
  }
})();
