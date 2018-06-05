var profiles = [];

$("#firstTupCont div.tuple").each(function( index, userrow ) 
{
    //var profile = [];
    var profile = {name: '', currentcompany: '', salary: '', location: '', workexp: '', skills:'', mayknow:''};

    //username
    var pname = $(userrow).find("a.userName.name")[0];
    pname = $(pname).html();
    profile.name = pname;

    //current company
    var currentcompany = $(userrow).find("div.currInfo a.employer")[0];
    currentcompany = $(currentcompany).html();
    profile.currentcompany = currentcompany;

    //salary
    var salary = $(userrow).find("div.mtxt span.sal")[0];
    salary = $(salary).text();
    profile.salary = salary;

    //location
    var location = $(userrow).find("div.mtxt span.loc")[0];
    location = $(location).html();
    profile.location = location;

    //work experience
    var workexp = $(userrow).find("div.mtxt span.exp")[0];
    workexp = $(workexp).html();
    profile.workexp = workexp;

    //skilss
    var skills = $(userrow).find("div.prefSkill a.skillkey");
    var skillsArr=[]; 
    skills.each(function( index ) {
      skillsArr.push( $.trim($(this).text()) ) ;
    });
    profile.skills = skillsArr;
    
    //may know skills
    var myKnwInfo = $(userrow).find("div.myKnwInfo")[0];
    myKnwInfo = $.trim($(myKnwInfo).text());

    console.log("b4: " + myKnwInfo);
    myKnwInfo = myKnwInfo.replace("May Also Know","");
    console.log("after: " + myKnwInfo);
    myKnwInfo = myKnwInfo.replace("...More","");
    
    profile.mayknow = myKnwInfo;
    

    profiles.push(profile);
});

//console.log(profiles);
chrome.extension.sendRequest(profiles);
