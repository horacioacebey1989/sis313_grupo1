'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
        nombre : String,
        fecha_nacimiento : Date,
        contacto : String,
        username : String,
        password : String,
        visible : Boolean,
        id_tipo_usuario : {type : Schema.ObjectId, ref : 'Tipo_Usuario'},
});

module.exports = mongoose.model('Usuario', UsuarioSchema);