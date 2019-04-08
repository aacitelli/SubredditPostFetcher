const authData = require("./authData");
const btoa = require("btoa")
const opn = require("opn");
const http = require("http");
const fs = require("fs");

// Listens for the redirect once authenticated and extracts data from its URL to give us the access token 
function setupRedirectServer()
{
    // Listens for the access code redirect
    http.createServer(function(req, res)
    {
        let codeIndex = req.url.indexOf("code=");
        let accessCode = req.url.substring(codeIndex + 5, req.url.length);
        appOnlyAuth(accessCode);
        return;
    }).listen(4000);
}

// Gets an access token by taking the user to a webpage and having them allow access to it 
function getAccessToken()
{
    let client_id = authData.data.id;
    let response_type = "code";
    let state = "RANDOMSTRING";
    let redirect_uri = "http://127.0.0.1:4000";
    let duration = "temporary";
    let scope = "identity+read";

    // Getting Auth Token
    fetch("https://www.reddit.com/api/v1/authorize?client_id=" + client_id + 
        "&response_type=" + response_type + 
        "&state=" + state + 
        "&redirect_uri=" + redirect_uri + 
        "&duration=" + duration + 
        "&scope=" + scope)
    .then(function(response)
    {
        // Opens the user's browser to the redirect page so they can enable access
        opn(response.url);
    })
    .catch(function(err)
    {
        console.log(err);
    });
}

// Uses client ID and secret to get an access token
function appOnlyAuth()
{
    fetch("https://www.reddit.com/api/v1/access_token", 
    { 
        method: "POST",
        headers: 
        {
            "Authorization": "Basic " + btoa(authData.id + ":" + authData.secret),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    })
    .then(response =>
    {
        return response.json();
    })
    .then(json =>
    {
        getSubredditName(json.access_token);
    })
    .catch(err => 
    {
        console.log("Error getting data: " + err);
    });
}