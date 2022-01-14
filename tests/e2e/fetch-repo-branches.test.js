const { expect } = require('chai')
const axios = require('axios')

const fetchBranches = (url = 'https://github.com/colinhacks/zod') => {
  return axios.get('https://5x2sp8me41.execute-api.us-east-1.amazonaws.com/dev/branches', {
    params: {
      url
    }
  })
} 

describe('Fetch All Branches GET Endpoint: ', () => {
    it('should extract the url from the request and return an array of branch names for the given repo.', async () => {
      const { data, status } = await fetchBranches()
      const { branches } = data

      expect(status).to.not.be.undefined
      expect(status).to.equal(200)

      expect(branches).to.not.be.undefined
      expect(branches).to.an('array')

      return branches.map((branch) => {
        expect(branch).to.not.be.undefined
        expect(branch).to.an('string')
      })
    })
})