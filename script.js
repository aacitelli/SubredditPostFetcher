// Lets us get user input, basically
const readline = require("readline");
const authData = require("./authData");
const btoa = require("btoa")
const opn = require("opn");

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

// Need to authenticate before we can do anything
authenticate();

/*
rl.question("Enter subreddit name: ", (answer) =>
{
    // Passing in the user's subreddit into the function that does everything
    processSubreddit(answer);

    // Closing the readline object
    rl.close();
});
*/

function authenticate()
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

    /*
    fetch("https://www.reddit.com/api/v1/access_token", 
    { 
        method: "POST",
        headers: 
        {
            "Authorization": "Basic " + btoa(authData.data.secret) + ":",
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
    */
}

