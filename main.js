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
getSubredditName()
{

}

function getSubredditName(accessToken)
{
    rl.question("Enter subreddit name: ", (answer) =>
    {
        // Passing in the user's subreddit into the function that does everything
        getSubredditInformation(answer, accessToken);

        // Closing the readline object
        rl.close();
    });
}

async function getSubredditInformation(name, accessToken)
{
    let info = await getSubredditInfo(name);
    console.log("Subreddit Information: ");
    console.log(info);
}

async function getSubredditInfo(name)
{
    return fetch("https://reddit.com/r/" + name + "/top.json")
    .then(response =>
    {
        return response.json();
    })
    .then(json =>
    {
        console.log("Parsed JSON: ");
        console.log(json);

        for (let key in json.data.children[0])
        {
            console.log(key);
        }

        return json;
    })
    .catch(err =>
    {
        console.log(err);
    })
}

