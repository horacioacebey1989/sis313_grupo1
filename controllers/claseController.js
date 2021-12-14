'use strict'

var clase = require('../model/clase');
var materia_particular = require('../model/materia_particular');

function addClase(req, res){
    var params = req.body;
    var claseNew = new clase();
    
    if(params.limite, params.costo_hora, params.direccion, params.descripcion, params.id_usuario, params.id_materia_particular){
        
        claseNew.limite = params.limite;
        claseNew.costo_hora = params.costo_hora;
        claseNew.direccion = params.direccion;
        claseNew.descripcion = params.descripcion;
        claseNew.visible = true;
        claseNew.id_usuario = params.id_usuario;
        claseNew.id_materia_particular = params.id_materia_particular;

        claseNew.save((err, claseGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(claseGet){
                res.status(200).send({
                    clase: claseGet
                });
            }
            else {
                return res.status(500).send({ message: 'Error en la peticion' });
            }
        });

    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

// function getClase2(req, res) {
//     var idClase = req.params.id;

//     clase.findOne({_id: idClase, visible: true}, (err, ClaseGet) => {
//         if(err) {
//             return res.status(500).send({ message: 'Error en la peticion' });
//         }
//         if(ClaseGet) {
//             res.status(200).send({
//                 Clase : ClaseGet
//             });
//         }
//         else {
//             return res.status(500).send({ message: 'Error en la peticion' });
//         }
//     });
// }

function getClase2(req, res) {
    var idClase = req.params.id;

    clase.findOne({_id: idClase, visible: true}, (err, ClaseGet) => {
        console.log(ClaseGet);
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion 1' });
        }
        if(ClaseGet) {
            materia_particular.findOne({_id: ClaseGet.id_materia_particular, visible: true}, (err, materiaGet) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion 2' });
                }
                
                if(materiaGet) {
                    res.status(200).send({
                        Clase : ClaseGet,
                        MateriaParticular : materiaGet
                    });
                }
            })
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion 3' });
        }
    });
}

/* GET MANY */
// function getClases(req, res) {
//     clase.find({ visible: true }, (err, ClasesGet) => {
//         if(err) {
//             return res.status(500).send({ message: 'Error en la peticion' });
//         }
//         if(ClasesGet) {
//             res.status(200).send({
//                 Clases : ClasesGet
//             });
//         }
//         else {
//             return res.status(500).send({ message: 'Error en la peticion' });
//         }
//     });
// }

function getClases(req, res) {
    clase.find({visible: true}).populate('id_materia_particular').exec((err,clasesMaterias) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(clasesMaterias) {
            res.status(200).send({
                Clases : clasesMaterias
            });
        }
    });
}

function getClasesMateriasNombre(req, res) {
    var nombreMateria = req.params.id;
    console.log(nombreMateria);
    var clasesMaterias1 = [];

    clase.find({visible: true}).populate('id_materia_particular').exec((err,clasesMaterias) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(clasesMaterias) {
            clasesMaterias.forEach(claseMateria => {
                console.log(claseMateria.id_materia_particular.nombre_materia);
                if(claseMateria.id_materia_particular.nombre_materia == nombreMateria) {
                    clasesMaterias1.push(claseMateria);
                }
            });
            res.status(200).send({
                Clases : clasesMaterias1
            });
        }
    });
}

// function getClasesProfesor(req, res) {
//     var idUsuario = req.params.id;
//     var ClasesMateriasProfesor = [];

//     materia_particular.find({id_usuario: idUsuario, visible: true}, async (err, materiasProfesor) => {
//         if(err) {
//             return res.status(500).send({ message: 'Error en la peticion' });
//         }
//         if(materiasProfesor) {
//             await materiasProfesor.forEach(async materiaProfesor => {
//                 var clases = await clase.find({id_materia_particular: materiaProfesor._id, visible: true}).exec().then(function(doc) {
//                     if(doc) {
//                         return doc;
//                     }
//                 });
//                 console.log({materia: materiaProfesor, clases: clases});
//                 ClasesMateriasProfesor.push({materia: materiaProfesor, clases: clases});
//             });
//             res.status(200).send({
//                 ClasesMateriasProfesor: ClasesMateriasProfesor
//             });
//         }
//     });
// }

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

function getClasesProfesor(req, res) {
    var idUsuario = req.params.id;

    materia_particular.find({id_usuario: idUsuario, visible: true}, async (err, materiasProfesor) => {
        var idMateriasProfesor = materiasProfesor.map(function(materiaProfesor) { return materiaProfesor._id; });
        clase.find({id_materia_particular: {$in: idMateriasProfesor}}, async (err, clasesMateriaProfesor) => {
            if(clasesMateriaProfesor) {
                var materias = [];
                await asyncForEach(materiasProfesor, async (materiaProfesor) => { 
                    var clases = [];
                    await asyncForEach(clasesMateriaProfesor, async (clase) => {
                        if (clase.id_materia_particular+'' === materiaProfesor._id+'') {
                            clases.push(clase);
                        }
                    });
                    materias.push({materia: materiaProfesor, clases: clases});
                });
                res.status(200).send({
                    ClasesMateriasProfesor: materias
                });
            }
        });
    });
}

function updateClase(req, res) {
    var idClase = req.params.id;
    var update = req.body;

    delete update['visible'];

    clase.findOneAndUpdate({_id: idClase, visible: true}, update, { new: true }, (err, ClaseUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClaseUpdate) {
            res.status(200).send({
                Clase: ClaseUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    });
}

function deleteClase(req, res) {
    var idClase = req.params.id;
    var update;

    clase.findById({_id: idClase, visible: true}, (err, ClaseGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClaseGet) {
            update = ClaseGet;
            update.visible = false;
            clase.findByIdAndUpdate(idClase, update, { new: true }, (err, ClaseUpdate) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(ClaseUpdate) {
                    res.status(200).send({
                        Clase: ClaseUpdate
                    });
                }
                else {
                    return res.status(404).send({ message: 'No se pudo actualizar' });
                }
            });
        }
        else {
            return res.status(404).send({ message: 'Error en la peticion' });
        }
    });
}

module.exports = {
    addClase,
    getClase2,
    getClases,
    updateClase,
    deleteClase,
    getClasesMateriasNombre,
    getClasesProfesor
}

