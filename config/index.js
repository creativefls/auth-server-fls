let allowedOrigin = () => {
  let whiteList = [
    /\.futureleadersummit\.org$/,
    /\.nusantaramuda\.org$/
  ]
  if (process.env.ENV == 'dev') whiteList.push('http://localhost:3000')
  return whiteList
}

module.exports = {
  env: process.env.ENV || 'prod',
  allowedOrigin: allowedOrigin()
}
