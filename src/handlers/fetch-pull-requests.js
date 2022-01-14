const { pipe, andThen } = require('ramda')
const RequestHelper = require('../services/http/request')
const ResponseHelper = require('../services/http/response')
const GithubApi = require('../services/github-api')

/**
 * 
 * @param {object} request 
 * @returns {object} httpResponse { statusCode, body: { pullRequests } }
 */
module.exports.handler = async (request) => {
  try {
    const pullRequests = await fetchOpenPRs(request)
    return {
      statusCode: 200,
      body: JSON.stringify({
        pullRequests
      })
    }
  } catch (error) {
    console.log('The ERRRrror: ', error)
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({
        message: error.message || error.errorMessage
      })
    }
  }
}

const fetchOpenPRs = (request) => {
  return pipe(
    RequestHelper.extractParameters,
    GithubApi.fetchPRs,
    andThen(ResponseHelper.mapPullRequestData)
  )(request.queryStringParameters)
}