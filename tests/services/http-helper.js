
const axios = require('axios')

module.exports.fetch = (url = 'https://github.com/colinhacks/zod', path = 'open-prs') => {
  const gatewayUrl = ['https://5x2sp8me41.execute-api.us-east-1.amazonaws.com/dev', path].join('/')
  return axios.get(gatewayUrl, {
    params: {
      url
    }
  })
} 