const { map } = require('ramda')
const GithubApi = require('../github-api')

/**
 * 
 * @param {array} prData - open pull requests data to map
 * @returns {array} pull request payloads
 */
const mapPullRequestData = (prData) => {
  return Promise.all(
    map(mapPullRequest, prData)
  )
}

const mapPullRequest = async ({ id, user, title, commits_url }) => {
  const totalCommits = await GithubApi.fetchCommits(commits_url)
  return buildPRPayload(id, user, title, totalCommits)
}

/**
 * 
 * @param {number} id - pull request id
 * @param {string} user - user that created the pull request
 * @param {string} title - title of the pull request
 * @param {number} totalCommits - total number of commits on the provided pull request
 * @returns {object} formatted pull request payload
 */
const buildPRPayload = (id, user, title, totalCommits) => ({
  id,
  user: user.login,
  title,
  totalCommits
})

const mapBranchName = (branch) => branch.name

module.exports = {
  mapPullRequestData,
  buildPRPayload,
  mapBranchName,
}