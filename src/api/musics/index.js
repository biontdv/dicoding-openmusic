const MusicHanler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'musics',
  version: '1.0.0',
  register: async function (server, { service, validator }) {
    const musicHanler = new MusicHanler(service, validator)
    server.route(routes(musicHanler))
  }
}
