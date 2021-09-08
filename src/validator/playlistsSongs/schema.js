const Joi = require('joi')

const playlistsSongsSchema = Joi.object({
  songId: Joi.string().required()
})

module.exports = playlistsSongsSchema
