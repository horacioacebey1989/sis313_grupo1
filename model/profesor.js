'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfesorSchema = Schema({
        visible : Boolean,
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'}
});

module.exports = mongoose.model('profesors', ProfesorSchema);

