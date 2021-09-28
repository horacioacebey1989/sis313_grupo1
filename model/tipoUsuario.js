'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tipoUsuarioSchema = Schema({
    nombre : String,
    estado : Boolean
});

module.exports = mongoose.model('Tipo_usuario',tipoUsuarioSchema);