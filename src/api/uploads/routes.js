const path = require('path')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.postUploadsHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000
      }
    }
  },
  {
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/pictures')
      }
    }
  }
]

module.exports = routes
