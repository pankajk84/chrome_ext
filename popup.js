var extractedProfiles = "";

function showExtractedProfiles()
{
    $("#data").show();
}

function sendProfiles()
{
  console.log("sending to backend : " + extractedProfiles);
  $.post( "http://tippnybackend.pankaj/exten", extractedProfiles, function(data, textStatus) {
    console.log(data);
  }, "json");

    
}


chrome.extension.onRequest.addListener(function(profiles) {
  for (var index in profiles) 
  {
      $("#data").append("<tr><td>"+profiles[index].name+"</td><td>"+profiles[index].currentcompany+"</td></tr>");
  }
  
  extractedProfiles = JSON.stringify(profiles);
  console.log(extractedProfiles);
});

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {

  document.getElementById('extract').onclick = showExtractedProfiles;
  document.getElementById('process').onclick = sendProfiles;
  
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      //chrome.tabs.executeScript(activeTabs[0].id, {file: 'send_links.js', allFrames: true});

      chrome.tabs.executeScript(null, { file: "jquery.min.js", allFrames: true }, function() {
          chrome.tabs.executeScript(null, { file: "extract.js", allFrames: true });
      });

    });
  });
};
