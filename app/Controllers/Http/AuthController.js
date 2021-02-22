'use strict'

const userModel = use('App/Models/users');
const stagiaireModel = use('App/Models/stagiaire');
const Hash = use('Hash')

class AuthController {
    async login ({ request, response, view }) {
        return view.render('auth/login')
    }

    async login_check ({ request, response, view }) {
        const { email, password } = request.all()
        /*const user = await userModel.findOne({ email : email }).lean()

        if(await Hash.verify(password, user.password)){
            const nb_s = await stagiaireModel.countDocuments()  
            return view.render('stagiaire.index', {user : user, nb_s : nb_s})
        }
        return response.redirect('back')*/
        
        try {
            if(await auth.attempt(email, password)){
                let user = await userModel.findOne({ email : email }).lean()
                const nb_s = await stagiaireModel.countDocuments()  
                let token = await auth.generate(user)
                Object.assign(user, token)
                return view.render('stagiaire.index', {user : user, nb_s : nb_s})
            }
        }catch (error) {
            return response.send(error.message)
        }
    }

    async register ({ request, response, view }) {
        return view.render('auth/register')
    }

    async register_save ({ request, response, view }) {
        const { name, email, password } = request.all()
        try {
            var new_user = new userModel({ name: name, email:email, password: Hash.generate(password) })
            await new_user.save(function (err) { 
                if (err) console.log(err) 
            })
        }catch (error) { console.log(error) }
        return view.render('auth/login')
    }
}

module.exports = AuthController
