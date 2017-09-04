//Load stored usernames
chrome.storage.local.get(['xid', 'bt'], function(i){
  if(i.xid){
    if(i.xid.user){
      document.getElementById('xid_user').value = i.xid.user;
    }
  }

  if(i.bt){
    if(i.bt.user){
      document.getElementById('bt_user').value = i.bt.user;
    }
  }
});

//Save XID
document.getElementById('xid_save').addEventListener('click', function(){
  chrome.storage.local.set({xid: {
    user: document.getElementById('xid_user').value.trim(),
    pass: document.getElementById('xid_pass').value.trim()
  }}, message('changes saved'));
});

//Save Blue Tool
document.getElementById('bt_save').addEventListener('click', function(){
  chrome.storage.local.set({bt: {
    user: document.getElementById('bt_user').value.trim(),
    pass: document.getElementById('bt_pass').value.trim()
  }}, message('changes saved'));
});
