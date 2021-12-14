'use strict'

var express = require('express');
var tipo_usuarioController = require('../controllers/tipo_usuarioController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addTipoUsuario', tipo_usuarioController.addTipoUsuario);
api.get('/getTipoUsuario', tipo_usuarioController.getTipoUsuario);
api.get('/getTipoUsuario2/:id', tipo_usuarioController.getTipoUsuario2);
api.get('/getTiposUsuario', tipo_usuarioController.getTiposUsuario);
api.get('/updateTipoUsuario/:id', auth.ensureAuthAdministrador, tipo_usuarioController.updateTipoUsuario);
api.get('/deleteTipoUsuario/:id', auth.ensureAuthAdministrador, tipo_usuarioController.deleteTipoUsuario);

module.exports = api;