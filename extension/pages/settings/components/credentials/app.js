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
