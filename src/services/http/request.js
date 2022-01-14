module.exports.extractParameters = ({ url }) => {
  const [,,, user, repo] = url.split('/')
  return {
    user,
    repo
  }
}