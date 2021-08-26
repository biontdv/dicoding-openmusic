const InvariantError = require('../../exceptions/InvariantError')
const playlistsPayloadSchema = require('./schema')

const PlaylistValidator = {
  playlistsPayloadValidate: (payload) => {
    const result = playlistsPayloadSchema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = PlaylistValidator
