const ExportsPayload = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const exportsValidator = {
  exportsValidate: (payload) => {
    const result = ExportsPayload.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}
module.exports = exportsValidator
