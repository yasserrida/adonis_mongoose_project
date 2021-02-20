'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').middleware('guest')

Route.get('login', 'AuthController.login').middleware('guest')
Route.post('login', 'AuthController.login_check').middleware('guest')

Route.get('register', 'AuthController.register').middleware('guest')
Route.post('register', 'AuthController.register_save').middleware('guest')


Route.resource('stagiaire', 'StagiaireController')//.middleware('auth')

//api
Route.get('api/load_stagiaires', 'ApiController.get_stagiaires')//.middleware('auth')

