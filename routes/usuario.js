'use strict'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addUsuario', usuarioController.addUsuario);
api.post('/loginUsuario', usuarioController.loginUsuario);
api.post('/getUsuarioByName', auth.ensureAuthGeneral, usuarioController.getUsuarioByName);
api.get('/getUsuario', auth.ensureAuthGeneral, usuarioController.getUsuario);
api.get('/getUsuario2/:id', auth.ensureAuthGeneral, usuarioController.getUsuario2);
api.get('/getUsuarios', auth.ensureAuthGeneral, usuarioController.getUsuarios);
api.put('/updateUsuario/:id', auth.ensureAuthGeneral, usuarioController.updateUsuario);
api.delete('/deleteUsuario/:id', auth.ensureAuthAdministrador, usuarioController.deleteUsuario);

module.exports = api;