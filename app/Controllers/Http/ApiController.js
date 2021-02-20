'use strict'

const stagiaireModel = use('App/Models/stagiaire');

class ApiController {
    async get_stagiaires(request, response){
        var stagiaires = await stagiaireModel.find({}).lean();
        return JSON.stringify(stagiaires)
    }


}
module.exports = ApiController