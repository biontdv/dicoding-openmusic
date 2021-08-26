const InvariantError = require('../../exceptions/InvariantError')
const { UserPayloadSchema } = require('./schema')

const UserValidator = {
  validateUserPayload: (payload) => {
    const result = UserPayloadSchema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = UserValidator
