// Lets us get user input, basically
const readline = require("readline");
const authData = require("./authData");
const btoa = require("btoa")
const opn = require("opn");
const http = require("http");
const fs = require("fs");

// Fetch isn't implemented by default in Node so we have to use a wrapper, basically
global.fetch = require("node-fetch");

// Initializes a new readline object and provides it with the correct I/O streams
const rl = readline.createInterface
(
    {
        input: process.stdin,
        output: process.stdout
    }
)



// Creating the server at the redirect URL so we can do things with the retrieved access code 
// Need to authenticate before we can do anything
setupRedirectServer();
getAccessToken();

/*
rl.question("Enter subreddit name: ", (answer) =>
{
    // Passing in the user's subreddit into the function that does everything
    processSubreddit(answer);

    // Closing the readline object
    rl.close();
});
*/

// Listens for the redirect once authenticated and extracts data from it
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

function appOnlyAuth(accessToken)
{
    console.log("Access Token: " + accessToken);
    console.log("Client Secret: " + authData.data.secret);

    fetch("https://www.reddit.com/api/v1/access_token", 
    { 
        method: "POST",
        headers: 
        {
            "Authorization": "Basic " + btoa(accessToken + ":" + authData.data.secret),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    })
    .then(function(response)
    {
        console.log(response);
    })
    .catch(function(err)
    {
        console.log("Error getting data: " + err);
    });
}

