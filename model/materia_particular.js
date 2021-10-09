'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MateriaParticularSchema = Schema({
        nombre_materia : String,
        descripcion : String,
        visible : Boolean,
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'}
});

module.exports = mongoose.model('Materia_Particular', MateriaParticularSchema);