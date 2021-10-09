'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservaSchema = Schema({
        tiempo : String,
        costo_total : Number,
        visible : Boolean,
        id_clase : {type : Schema.ObjectId, ref : 'Clase'},
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'}
});

module.exports = mongoose.model('Reserva', ReservaSchema);