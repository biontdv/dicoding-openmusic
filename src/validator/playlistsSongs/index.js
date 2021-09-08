const playlistsSongsSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const PlaylistsSongsValidator = {
  PlayListsSongsValidate: (payload) => {
    const result = playlistsSongsSchema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = PlaylistsSongsValidator
