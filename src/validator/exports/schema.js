const Joi = require('joi')

const ExportsPayload = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required()
})

module.exports = ExportsPayload
