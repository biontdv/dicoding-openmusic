require('dotenv').config()
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')
const musics = require('./api/musics')
const MusicService = require('./services/musicService')
const MusicsValidator = require('./validator/')
const users = require('./api/users')
const UserService = require('./services/UserService')
const userValidator = require('./validator/users')
const authentication = require('./api/authentications')
const AuthService = require('./services/AuthenticationService')
const tokenManager = require('./tokenizer')
const authValidator = require('./validator/authentications')
const playlists = require('./api/playlists')
const PlaylistsService = require('./services/PlaylistService')
const playlistsValidator = require('./validator/playlists')

const init = async () => {
  const musicService = new MusicService()
  const authService = new AuthService()
  const userService = new UserService()
  const playlistsService = new PlaylistsService()
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
    plugin: Jwt
  })

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      plugin: musics,
      options: {
        service: musicService,
        validator: MusicsValidator
      }
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: userValidator
      }
    },
    {
      plugin: authentication,
      options: {
        userService, authService, validator: authValidator, tokenManager
      }
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: playlistsValidator
      }
    }
  ])

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
