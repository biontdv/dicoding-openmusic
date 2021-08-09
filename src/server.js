require('dotenv').config()
const Hapi = require('@hapi/hapi')
const musics = require('./api/musics')
const MusicService = require('./services/musicService')
const init = async () => {
  const musicService = new MusicService()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: musics,
    options: {
      service: musicService
    }
  })

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
