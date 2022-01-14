const { expect } = require('chai')
const { pullRequestData, prWithTotalCommits } = require('../__fixtures__/pull-requests-data')
const ResponseHelper = require('../../src/services/http/response')

describe('Response Helper Service:', () => {
  describe('#mapPullRequestData', () => {
    it('should map through the array pull requests, get all commits for each, and build a new pull request payload.', async () => {
      const mappedPRData = await ResponseHelper.mapPullRequestData(pullRequestData)
      return mappedPRData.map((prPayload) => {
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
  })

  describe('#buildPayload', () => {
    it('should build a new pull request payload with an id, user, title, and totalCommits.', () => {
      const { id, user, title } = prWithTotalCommits
      const prPayload = ResponseHelper.buildPayload(id, user, title, 7)
      
      expect(prPayload).to.have.all.keys([
        'id',
        'user',
        'title',
        'totalCommits'
      ])
      expect(prPayload.id).to.equal(id)
      expect(prPayload.user).to.equal(user.login)
      expect(prPayload.title).to.equal(title)
      expect(prPayload.totalCommits).to.equal(7)
    })
  })
})