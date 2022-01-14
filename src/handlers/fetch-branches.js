const { pipe, andThen, map } = require('ramda')
const RequestHelper = require('../services/http/request')
const ResponseHelper = require('../services/http/response')
const GithubApi = require('../services/github-api')

/**
 * Uses the url provided in the request to return all branches for the given repository.
 * 
 * @param {object} request 
 * @returns {object} httpResponse { statusCode, body: { branches } }
 */
module.exports.handler = async (request) => {
  try {
    const branches = await fetchBranches(request)
    return {
      statusCode: 200,
      body: JSON.stringify({
        branches
      })
    }
  } catch (error) {
    return {
      statusCode: error.response && error.response.status || 500,
      body: JSON.stringify({
        message: error.message || error.errorMessage
      })
    }
  }
}

const fetchBranches = (request) => {
  return pipe(
    RequestHelper.extractParameters,
    GithubApi.fetchBranches,
    andThen(map(ResponseHelper.mapBranchName))
  )(request.queryStringParameters)
}