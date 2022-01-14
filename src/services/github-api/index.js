const axios = require('axios')
const GithubApiUrl = process.env.githubUrl

/**
 * 
 * @param {string} user - the repo owners user name
 * @param {string} repo - the repo name
 * @returns {array} all open pull requests for the provided user and repo name
 */
const fetchPRs = async ({ user, repo }) => {
  try {
    const url = [GithubApiUrl, user, repo, 'pulls'].join('/')
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw error
  }
}

/**
 * 
 * @param {string} commitsUrl - the url to get all commits for a given pull request
 * @returns {number} total number of commits on a specific pull request
 */
const fetchCommits = async (commitsUrl) => {
  try {
    const commits = await axios.get(commitsUrl)
    return commits.data.length
  } catch (error) {
    throw error
  }
}

/**
 * 
 * @param {string} user - the repo owners user name
 * @param {string} repo - the repo name
 * @returns {array} all branches for the provided user and repo name
 */
const fetchBranches = async ({ user, repo }) => {
  try {
    const url = [GithubApiUrl, user, repo, 'branches'].join('/')
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw error
  }
}

module.exports = { 
  fetchPRs,
  fetchCommits,
  fetchBranches
}