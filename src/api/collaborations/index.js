const routes = require('./routes')
const CollaborationsHandler = require('./handler')

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { service, validator, playlistService }) => {
    const handler = new CollaborationsHandler(service, validator, playlistService)
    server.route(routes(handler))
  }
}
