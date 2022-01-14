# Project node-code-challenge

## Project Details
**Serverless Framework Version**: 2

**Node Version**: 12.x

## Lambda Functions

### FetchPullRequests (GET)

FetchPullRequests is used to retrieve all open pull request for a given repository url. The url should be passed as query string parameter. It will extract the user and repo name to get all pull request data from github as well as the total number of commits for each pull request. Each Payload returns should have the following attributes:
- id
- user (the user that created the pull request)
- title
- totalCommits

### FetchBranches (GET)

FetchBranches is used to retrieve all existing branches for a given repository url. The url should be passed as a query string parameter. It will extract the user and repo name to get all open branch name.