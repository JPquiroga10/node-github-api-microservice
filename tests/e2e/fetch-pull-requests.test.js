const { expect } = require('chai')
const axios = require('axios')

const fetchPRs = (url = 'https://github.com/colinhacks/zod') => {
  return axios.get('https://5x2sp8me41.execute-api.us-east-1.amazonaws.com/dev/open-prs', {
    params: {
      url
    }
  })
} 

describe('Fetch Pull Requests GET Endpoint: ', () => {
    it('should extract the url from the request and return an array of all open pull requests with a total number of commits for each open prs.', async () => {
      const { data, status } = await fetchPRs()
      const { pullRequests } = data

      expect(status).to.not.be.undefined
      expect(status).to.equal(200)

      expect(pullRequests).to.not.be.undefined
      expect(pullRequests).to.an('array')

      return pullRequests.map((prPayload) => {
        expect(prPayload).to.have.all.keys([
          'id',
          'user',
          'title',
          'totalCommits'
        ])
        expect(prPayload.id).to.not.be.undefined
        expect(prPayload.id).to.be.a('number')

        expect(prPayload.user).to.not.be.undefined
        expect(prPayload.user).to.be.a('string')

        expect(prPayload.title).to.not.be.undefined
        expect(prPayload.title).to.be.a('string')

        expect(prPayload.totalCommits).to.not.be.undefined
        expect(prPayload.totalCommits).to.be.a('number')
      })
    })

    it('should return a 404 error code if the url is not an existing repo.', async () => {
      try {
        const url = 'https://github.com/colincks/zee'
        await fetchPRs(url)
      } catch (error) {
        const { status, data } = error.response
        expect(status).to.not.be.undefined
        expect(status).to.equal(404)
  
        expect(data.message).to.not.be.undefined
        expect(data.message).to.equal('Request failed with status code 404')
      }
    })
})