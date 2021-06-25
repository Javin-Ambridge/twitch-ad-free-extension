console.log("Now here!");

// Listener for newly loaded pages
function onMsgListener(request, sender) {
  console.log("HERE: ", request);
}

// Register listener
chrome.runtime.onMessage.addListener(onMsgListener);