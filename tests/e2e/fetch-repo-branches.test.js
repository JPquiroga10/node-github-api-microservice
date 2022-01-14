const { expect } = require('chai')
const HttpTestHelper = require('../services/http-helper')

describe('Fetch All Branches GET Endpoint: ', () => {
    it('should extract the url from the request and return an array of branch names for the given repo.', async () => {
      const { data, status } = await HttpTestHelper.fetch('https://github.com/colinhacks/zod', 'branches')
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