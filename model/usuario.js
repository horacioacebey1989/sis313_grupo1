'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
        nombre : String,
        password: String,
        estado : Boolean,
        tipoUsuario : {type : Schema.ObjectId, ref : 'Tipo_usuario'} 
});

module.exports = mongoose.model('Usuario', UsuarioSchema);