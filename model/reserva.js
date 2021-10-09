'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservaSchema = Schema({
        tiempo : String,
        visible : Boolean,
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'},
        id_clase : {type : Schema.ObjectId, ref : 'Clase'}
});

module.exports = mongoose.model('Reserva', ReservaSchema);
