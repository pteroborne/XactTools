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

  document.querySelector('.body').insertBefore(m, document.querySelector('.body').firstChild);
  m.addEventListener('click', function(){
    m.classList.add('hide');
    setTimeout(function(){
      m.remove();
    }, 1000);
  });

  setTimeout(function(){
    m.classList.remove('hide');
  }, 1);

  setTimeout(function(){
    m.classList.add('hide');
  }, 6001);

  setTimeout(function(){
    m.remove();
  }, 7000);
}
