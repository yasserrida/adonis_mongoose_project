'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('Mongoose')

class users extends BaseModel {
  static boot ({ schema }) {

  }

  static get schema () {
    const userSchema = mongoose.Schema({
      name: String,
      email: String,
      password: String
    })
    return userSchema
  }
}

module.exports = users.buildModel('users')
