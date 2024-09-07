const joi = require('joi')

const registrationValidation = (data) => {
    const schema = joi.object({
        username: joi.required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        confirmPassword: joi.ref('password'),
        age: joi.required(),
        gender: joi.string().required(),
        phone: joi.required()
    })
    return schema.validate(data)
}

loginValidation = (data) => {
    const schema = joi.object({
        email: joi.required(),
        pwd: joi.required(),
    })
    return schema.validate(data)
}

module.exports = { registrationValidation, loginValidation }