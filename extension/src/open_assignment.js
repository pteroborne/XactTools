function openAssignment(mfn, callback){
  if(!mfn.trim()){
    callback('MFN cannot be empty');
    throw new Error('MFN cannot be null');
  }

  mfn = mfn.trim().toUpperCase();

  chrome.tabs.create({url: 'https://apps.xactware.com/apps/xactanalysis/detail.jsp?src=&ddid='+mfn+'#d_assignment'});
}
