'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('Mongoose')

class stagiaire extends BaseModel {
  static boot ({ schema }) {
  
  }

  static get schema () {
    const stagiaireSchema = mongoose.Schema({
      cin: String,
      name: String,
      prenom: String,
      ln: String,
      dn: String,
      email: String,
      tele: String,
      adress: String,
      sexe: String
    })
    return stagiaireSchema
  }
}

module.exports = stagiaire.buildModel('stagiaire')
