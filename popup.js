document.addEventListener('DOMContentLoaded', function() {

  const TWITCH_TV_URL = "https://www.twitch.tv/";
  const TWITCH_AD_FREE_URL = "https://twitchls.com/";
  const ON_TWITCH_TEXT = "Get an Ad Free Twitch Experience";
  const NOT_ON_TWITCH_TEXT = "Please Navigate to a Twitch.Tv Stream First";

  function getTAB(cb) {
    chrome.tabs.query({ active: true, currentWindow: true }, cb);
  }

  function isTwitchStream(url) {
    var startsWith = url.startsWith(TWITCH_TV_URL);
    if (!startsWith) {
      return null;
    }

    var streamName = url.replace(TWITCH_TV_URL, "");
    if (streamName.length > 0) {
      return streamName;
    }

    return null;
  }

  function toggleView(onTwitch) {
    var title = document.querySelector('.popup-title');
    if (onTwitch) {
      title.textContent = ON_TWITCH_TEXT;
    } else {
      title.textContent = NOT_ON_TWITCH_TEXT;
    }
  }

  function redirectWindow(url) {
    chrome.tabs.update({url: url});
    window.close();
  }

  function handleRedirectBtn(onTwitchStream) {
    var checkPageButton = document.getElementById('redirectButton');
    checkPageButton.addEventListener('click', function() {
      if (onTwitchStream) {
        getTAB(function(tabs) {
          var currentTab = tabs[0];
          var streamName = isTwitchStream(currentTab.url);

          redirectWindow(TWITCH_AD_FREE_URL + streamName);
        });
      } else {
          redirectWindow(TWITCH_TV_URL);
      }
    }, false);
  }

  // Initialize the view if we aren't on Twitch.tv
  getTAB(function(tabs) {
    var currentTab = tabs[0];
    
    var onTwitchStream = true;
    if (isTwitchStream(currentTab.url) === null) {
      toggleView(false);
      onTwitchStream = false;
    }

    handleRedirectBtn(onTwitchStream);
  });
}, false);