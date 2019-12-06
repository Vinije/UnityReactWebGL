let jsonResponse = null;
let objUrl = null;

let loadClient = function(apiKey, apiUrl) {
    gapi.client.setApiKey(apiKey);  
    return gapi.client.load(apiUrl)
    .then(function() { 
        clientLoaded = true;
    },
    function(err) { console.error("GAPI client not loaded properly", err); });    
}

let search = function(apiKey, apiUrl, engineId, queryElement){
    let whatToSearch = document.getElementById(queryElement).value;
    return executeSearch(apiKey, apiUrl, engineId, whatToSearch);
}

let executeSearch = function(apiKey, apiUrl, engineId, whatToSearch) {
    return loadClient(apiKey, apiUrl)
    .then(function(){
        return gapi.client.search.cse.list({
        "q": whatToSearch,
        "cx": engineId,
        "pretty-print": "true"
    })}, 
    function(err){ console.error("Load client error", err)});
}

let searchAndDisplay = function(apiKey, apiUrl, engineId, queryElement, resultElement){
    search(apiKey, apiUrl, engineId, queryElement)
    .then(response => {
        jsonResponse = response;
        displaySearch(response, resultElement);
    })
}

let displaySearch = function(response, contentElement){
    let contentHTML = "";
    var jsonobj = JSON.parse(response.body);

    if(jsonobj.items){
        document.getElementById(SAVE_ELEMENT).disabled = false;

        for (let i = 0; i < jsonobj.items.length; i++) {
            var item = jsonobj.items[i];
            contentHTML +=  "<br><a href=" +item.link+">" + (i+1) + ") " + item.htmlTitle + "</a>";
            if (item.cse_image) {
                contentHTML += "<br><img src = "+item.cse_image+"/>";   
            }
            if (item.snippet) {
                contentHTML += "<br><a>"+item.snippet+"</a>";   
            }
            contentHTML+="<br>";
        }
    }
    else{
        document.getElementById(SAVE_ELEMENT).disabled = true;
    }      
    document.getElementById(contentElement).innerHTML = contentHTML;
}

let saveSearchResult = function(queryElement){
    if(jsonResponse){
        if (objUrl) {
            window.URL.revokeObjectURL(objUrl);
        }
        
        var jsonstring = JSON.stringify(jsonResponse.body);
        let data = new Blob([jsonstring], {type: 'text/json'});
        let fileName = document.getElementById(queryElement).value;

        objUrl = window.URL.createObjectURL(data);

        var a = document.createElement("a");
        a.href = objUrl;
        a.download = fileName+".json";
        a.click();
    }
}

let init = function(saveElement){
    document.getElementById(saveElement).disabled = true;
    jsonResponse = null;
}

gapi.load("client");