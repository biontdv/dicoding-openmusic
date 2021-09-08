const InvariantError = require('../../exceptions/InvariantError')
const collaborationsPayloadSchema = require('./schema')

const collaborationsValidator = {
  collaborationsValidate: (payload) => {
    const result = collaborationsPayloadSchema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = collaborationsValidator
