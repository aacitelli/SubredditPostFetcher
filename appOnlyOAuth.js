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
appOnlyAuth();

/*
rl.question("Enter subreddit name: ", (answer) =>
{
    // Passing in the user's subreddit into the function that does everything
    processSubreddit(answer);

    // Closing the readline object
    rl.close();
});
*/

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
        console.log(json);
    })
    .catch(err => 
    {
        console.log("Error getting data: " + err);
    });
}

