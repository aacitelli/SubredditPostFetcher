# SubredditPostFetcher

## What Is This?

This is a small script built in Node.js that accepts the name of a subreddit and will output the top 10 current posts on that subreddit, giving a title and the full text for each. 

## What Did I Learn From This?

### Fetch (POST) 

In the past, I had only really used fetch() for pure GET requests with no sort of authentication or anything like that. Although I didn't end up actually using it in the end product (because the end product didn't need authentication) it was great practice with authenticating via POST request and something I'll definitely use in the future. 

### Node.js

This was intended to be a way for me to get more comfortable with Node.js. I used a lot of fetch() in this, but also implemented a server in Node that would listen for a redirect from Reddit's API and extract the access token from that. It was my first experience actually using Node serverside, and it was far easier than I expected.

## Future Work

I think I've gotten most of what I'm going to out of this project, but at some point in the future when I get the time I'd like to build in support for image posts (as opposed to the current only-text-post model) and output more information about the posts themselves, like upvotes/downvotes and the user account that posted them. 
