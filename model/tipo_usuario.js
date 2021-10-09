'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TipoUsuarioSchema = Schema({
        nombre : String,
        visible : Boolean
});

module.exports = mongoose.model('Tipo_Usuario', TipoUsuarioSchema);