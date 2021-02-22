'use strict'

const stagiaireModel = use('App/Models/stagiaire');

class StagiaireController {
  async index ({ request, response, view }) {
    const nb_s = await stagiaireModel.countDocuments()   
    return view.render('stagiaire/index', {nb_s : nb_s})
  }

  async create ({ request, response, view }) {
    return view.render('stagiaire/create')
  }

  async store ({ request, response }) {
    const { cin, name, prenom, email, ln, dn ,tele, adress, sexe } = request.all()
    var stagiaire = new stagiaireModel({ cin:cin, name:name, prenom:prenom, email:email, ln:ln, dn:dn ,tele:tele, adress:adress, sexe:sexe })
    await stagiaire.save(function (err) { 
      if (err) console.log(err) 
    })
  }

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {
    const stagiaire = await stagiaireModel.findOne({'_id' : params.id}).lean()
    return view.render('stagiaire/edit', { stagiaire : stagiaire })
  }

  async update ({ params, request, response }) {
    const { cin, name, prenom, tele, email } = request.all()
    await stagiaireModel.findOneAndUpdate({'_id' : params.id}, {cin:cin, name:name, prenom:prenom, tele:tele, email:email})
  }

  async destroy ({ params, request, response }) {
    stagiaireModel.deleteOne({ '_id': params.id }, function (err) {
  		if (err) console.log(error)
  	});
  }
}

module.exports = StagiaireController
