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

function loadJobs()
{
  console.log("Load jobs");
  $.getJSON( "http://recruit.parably.co:8091/jobs.php", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<option value='" + val['uid'] + "'>" + val['title'] + "</option>" );
    });

    $("#jobs").append(items.join( "" ));
  });
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

  loadJobs();
  
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
