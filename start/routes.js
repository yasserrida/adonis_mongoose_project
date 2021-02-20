'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').middleware('guest')
Route.get('login', 'AuthController.login').middleware('guest')
Route.post('login', 'AuthController.login_check').middleware('guest')
Route.get('register', 'AuthController.register').middleware('guest')
Route.post('register', 'AuthController.register_save').middleware('guest')


Route.resource('stagiaire', 'StagiaireController')//.middleware('auth')
Route.get('stagiaire/delete/:id', 'StagiaireController.destroy')//.middleware('auth')
Route.get('stagiaire/update/:id', 'StagiaireController.update')//.middleware('auth')

//api
Route.group(() => {
    Route.get('load_stagiaires', 'ApiController.get_stagiaires')//.middleware('auth')
}).prefix('api')

