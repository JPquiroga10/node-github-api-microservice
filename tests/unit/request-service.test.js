const { expect } = require('chai')
const RequestHelper = require('../../src/services/http/request')

describe('Request Helper Service: #extractParameters', () => {
    it('should extract and return an object containing the user and repo name from the provided url.', async () => {
      const request = {
        queryStringParameters: {
          url: 'https://github.com/colinhacks/zod'
        }
      }
      const queryParams = RequestHelper.extractParameters(request.queryStringParameters)

      expect(queryParams).to.have.all.keys([
        'user',
        'repo'
      ])
      expect(queryParams.user).to.not.be.undefined
      expect(queryParams.user).to.be.a('string')
      expect(queryParams.user).to.equal('colinhacks')

      expect(queryParams.repo).to.not.be.undefined
      expect(queryParams.repo).to.be.a('string')
      expect(queryParams.repo).to.equal('zod')
    })
})