const {
  PutAuthenticationShema,
  PostAuthenticationShema,
  DeleteAuthenticationShema
} = require('./schema')

const InvariantError = require('../../exceptions/InvariantError')

const AuthVAlidator = {
  PostAuthValidate: (payload) => {
    const result = PostAuthenticationShema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  },

  PutAuthValidate: (payload) => {
    const result = PutAuthenticationShema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  },

  DeleteAuthValidate: (payload) => {
    const result = DeleteAuthenticationShema.validate(payload)
    if (result.error) {
      throw new InvariantError(result.error.message)
    }
  }
}

module.exports = AuthVAlidator
