const axios = require('axios')
const ResponseHelper = require('../http/response')
const GithubApiUrl = process.env.githubUrl

/**
 * 
 * @param {string} user - the repo owners user name
 * @param {string} repo - the repo name
 * @returns {array} all open pull requests for the provided user and repo name
 */
module.exports.fetchPRs = async ({ user, repo }) => {
  const url = [GithubApiUrl, user, repo, 'pulls'].join('/')
  const { data } = await axios.get(url)
  return data
}

/**
 * 
 * @param {string} commitsUrl - the url to get all commits for a given pull request
 * @returns {number} total number of commits on a specific pull request
 */
module.exports.fetchCommits = async (commitsUrl) => {
  const commits = await axios.get(commitsUrl)
  return commits.data.length
}