const uploadSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const uploadValidator = {
  uploadValidate: (headers) => {
    const result = uploadSchema.validate(headers)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = uploadValidator
