// Lets us get user input, basically
const readline = require("readline");
const util = require("util");

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

getSubredditName();

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
    console.log("Subreddit: /r/" + name);

    let posts = await getSubredditPosts(name)

    console.log("Calling outputPosts with posts object.");
    outputPosts(posts);

    // Outputs entire JSON tree 
    // console.log(util.inspect(posts, {showHidden: false, depth: null}));
}

async function getSubredditPosts(name)
{
    return fetch("https://reddit.com/r/" + name + "/hot.json?limit=10")
    .then(response =>
    {
        return response.json();
    })
    .then(json =>
    {
        console.log("Posts retrieved.");
        return json;
    })
    .catch(err =>
    {
        console.log(err);
    });
}

async function outputPosts(json)
{
    // Loops through each post itself 
    for (let i = 0; i < json.data.children.length; i++)
    {
        /*
        console.log("Post: ");
        console.log(json.data.children[i]);
        */

        console.log("Post Title: ");
        console.log(json.data.children[i].data.title + "\n");

        console.log("Post Content: ");
        console.log(json.data.children[i].data.selftext);

        // Adds a divider in between posts - Conditional is so that it doesn't happen after the last one
        if (i != json.data.children.length - 1)
        {
            console.log("\n-------------------------------\n")
        }
    }
}

