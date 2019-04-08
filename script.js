// Lets us get user input, basically
const readline = require("readline");

// Initializes a new readline object and gives it the data streams it uses
const rl = readline.createInterface
(
    {
        input: process.stdin,
        output: process.stdout
    }
)

rl.question("Enter subreddit name: ", (answer) =>
{
    // Passing in the user's subreddit into the function that does everything
    processSubreddit(answer);

    // Closing the readline object
    rl.close();
});

