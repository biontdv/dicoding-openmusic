const Joi = require('joi')

const PostAuthenticationShema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

const PutAuthenticationShema = Joi.object({
  refreshToken: Joi.string().required()
})

const DeleteAuthenticationShema = Joi.object({
  refreshToken: Joi.string().required()
})

module.exports = {
  PutAuthenticationShema,
  PostAuthenticationShema,
  DeleteAuthenticationShema
}
