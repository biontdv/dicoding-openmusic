require('dotenv').config()
const Hapi = require('@hapi/hapi')
const musics = require('./api/musics')
const MusicService = require('./services/musicService')
const MusicsValidator = require('./validator/')
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
      service: musicService,
      validator: MusicsValidator
    }
  })

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
