'use strict'

const stagiaireModel = use('App/Models/stagiaire');

class StagiaireController {
  async index ({ request, response, view }) {
    return view.render('stagiaire/index')
  }

  async create ({ request, response, view }) {
    return view.render('stagiaire/create')
  }

  async store ({ request, response }) {
    const { cin, name, prenom, email, ln, dn ,tele, adress, sexe } = request.all()
    var stagiaire = new stagiaireModel({ cin:cin, name:name, prenom:prenom, email:email, ln:ln, dn:dn ,tele:tele, adress:adress, sexe:sexe });
    await stagiaire.save(function (err) { if (err) console.log(err); });
  }

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {
    var stagiaire = await stagiaireModel.findOne({'_id' : params.id}).lean();
    return view.render('stagiaire/edit', { stagiaire : stagiaire })
  }

  async update ({ params, request, response }) {
    const { cin, name, prenom, tele, email } = request.all()
    try {
      const stagiaire = await stagiaireModel.findOne({'_id' : params.id}).lean();
      stagiaire.cin = cin;
      stagiaire.name = name;
      stagiaire.prenom = prenom;
      stagiaire.tele = tele;
      stagiaire.email = email;
      await stagiaire.save();
    }catch (error) { console.log(error); }
  }

  async destroy ({ params, request, response }) {
    stagiaireModel.deleteOne({ '_id': params.id }, function (err) {
  		if (err) console.log(error);
  	});
  }
}

module.exports = StagiaireController
