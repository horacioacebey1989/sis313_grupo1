'use strict'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addUsuario', usuarioController.addUsuario);
api.post('/loginUsuario', usuarioController.loginUsuario);
api.post('/getUsuarioByName', usuarioController.getUsuarioByName);
api.get('/getUsuario', usuarioController.getUsuario);
api.get('/getUsuario2/:id', usuarioController.getUsuario2);
api.get('/getUsuarios/:page?', usuarioController.getUsuarios);
api.put('/updateUsuario/:id', auth.ensureAuthGeneral, usuarioController.updateUsuario);
api.delete('/deleteUsuario/:id', auth.ensureAuthAdministrador, usuarioController.deleteUsuario);

module.exports = api;