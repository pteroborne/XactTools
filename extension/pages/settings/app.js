window.addEventListener('DOMContentLoaded', function(){
  //Add Navigation
  const paths = document.querySelectorAll('.sidebar li');
  for(let i = 0; i < paths.length; i++){
    paths[i].addEventListener('click', navigate);
  }

  //Load first component
  if(window.location.hash){
    const hash = location.hash.replace('#', '');
    if(document.querySelector('li[data-component='+hash+']')){
      document.querySelector('li[data-component='+hash+']').click();
    }
  }else{
    location.hash = paths[0].getAttribute('data-component');
  }
});

//History function
window.addEventListener('hashchange', function(e){
  const hash = location.hash.replace('#', '');
  if(document.querySelector('li[data-component='+hash+']')){
    document.querySelector('li[data-component='+hash+']').click();
  }
});

function navigate(){
  const comp = this.getAttribute('data-component');
  const body = document.querySelector('.body');

  //Update hash
  location.hash = this.getAttribute('data-component');

  //Add active class to Navigation
  if(document.querySelector('.sidebar li.active')){
    document.querySelector('.sidebar li.active').classList.remove('active');
  }

  this.classList.add('active');

  //Load new component
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/pages/settings/components/'+comp+'/index.html', true);
  xhr.onload = function(){

    //Remove existing component
    while(body.firstChild){
      body.firstChild.remove();
    }
    if(document.getElementById('comp_js')){
      document.getElementById('comp_js').remove();
    }

    body.innerHTML = this.response;

    //Load script
    const js = document.createElement('script');
    js.id = 'comp_js';
    js.src = '/pages/settings/components/'+comp+'/app.js';
    document.body.appendChild(js);
  }
  xhr.send();
}

function message(msg){
  const m = document.createElement('div');
  m.classList.add('message', 'hide');
  const mT = document.createTextNode(msg);
  m.append(mT);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'viewBox', '0 0 24 24');

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttributeNS(null, 'x1', 18);
  line1.setAttributeNS(null, 'y1', 6);
  line1.setAttributeNS(null, 'x2', 6);
  line1.setAttributeNS(null, 'y2', 18);
  svg.append(line1);
  m.append(svg);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttributeNS(null, 'x1', 6);
  line2.setAttributeNS(null, 'y1', 6);
  line2.setAttributeNS(null, 'x2', 18);
  line2.setAttributeNS(null, 'y2', 18);
  svg.append(line2);
  m.append(svg);

  document.querySelector('.wrap').insertBefore(m, document.querySelector('.wrap').firstChild);
  m.addEventListener('click', function(){
    m.classList.add('hide');
    setTimeout(function(){
      m.remove();
    }, 1000);
  });

  setTimeout(function(){
    m.classList.remove('hide');
  }, 50);

  setTimeout(function(){
    m.classList.add('hide');
  }, 6000);

  setTimeout(function(){
    m.remove();
  }, 7000);
}
