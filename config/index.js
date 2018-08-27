let allowedOrigin = () => {
  // list origin yang diijinkan
  let whiteList = [
    /\.futureleadersummit\.org$/,
    /\.nusantaramuda\.org$/
  ]
  if (process.env.ENV == 'dev') whiteList.push('http://localhost:3000')
  return whiteList
}

module.exports = {
  env: process.env.ENV || 'prod',

  // settingan untuk options cors.
  // edit whiteList di atas untuk memasukkan list origin yang diijinkan
  corsOptions: {
    origin: function (origin, callback) {
      if (allowedOrigin().indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
