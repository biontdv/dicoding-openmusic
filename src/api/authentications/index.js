const routes = require('./routes')
const Handler = require('./handler')

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register: async (server, { userService, authService, validator, tokenManager }) => {
    const handler = new Handler(userService, authService, validator, tokenManager)
    server.route(routes(handler))
  }
}
