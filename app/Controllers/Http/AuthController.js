'use strict'

const userModel = use('App/Models/users');

class AuthController {
    async login ({ request, response, view }) {
        return view.render('auth/login')
    }

    async login_check ({ request, response, view }) {
        const { email, password } = request.all()
        var query = userModel.find(null)
        query.where('email', email)
        query.where('password', password)
        query.exec(function (err, users) {
            if (err) throw err; 
            else
                if(users.length > 0)
                    return view.render('stagiaire.index')
        });
        return "alert('incorrect');";
    }

    async register ({ request, response, view }) {
        return view.render('auth/register')
    }

    async register_save ({ request, response, view }) {
        const { name, email, password } = request.all()
        try {
            var new_user = new userModel({ name: name, email:email, password:password });
            await new_user.save(function (err) { if (err) console.log(err); });
        }catch (error) { console.log(error); }
        return view.render('auth/login')
    }
}

module.exports = AuthController
