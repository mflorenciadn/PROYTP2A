const express = require('express');
const router = express.Router();
const dataInventors = require('./../data/inventor'); //Importa los datos
const jwt = require('jsonwebtoken');
const config = require('../config');
const validarToken = require('./validarToken'); //no estoy segura

const userid = 555;

//Autonticación con JWT: para cada llamada a un endpoint, se debe enviar un token válido
// generar Token y utilizarlo en el HEADER en Postman para llamar al resto de las rutas
router.get('/createToken',  (req, res) => {
    const userid = 555; 
    const token = jwt.sign({ id: userid }, config.secret);
    res.json({ 
        auth: true, 
        token: token 
    });
});
 

//Conjunto de Endpoints que constituyen un CRUD básico

// Listar todos los inventores 
// http://localhost:3000/api/inventors
router.get('/', validarToken, async (req, res)  => { //el ASYNC se coloca en el callback!
    if (req.userid != userid) {  
        res.status(404).json({
            auth: false,
            message: 'No user found'
        });
    }
    res.json(await dataInventors.getAllInventors()); //para enviar la información, se debe esperar a que llegue (AWAIT)
});

// Traer un inventor 
// http://localhost:3000/api/inventors/8
router.get('/:id', validarToken, async  (req, res)  => {
    if (req.userid != userid) {
        res.status(404).json({
            auth: false,
            message: 'No user found'
        });
    }
    res.json(await dataInventors.getInventor(req.params.id)); //cuando se envia el response, se debe parsear a json
});

//Crear un inventor (ALTA)
router.post('/',validarToken, async (req, res) => {
    if (req.userid != userid) {
        res.status(404).json({
            auth: false,
            message: 'No user found'
        });
    }
    const inventor = req.body;
    await dataInventors.pushInventor(inventor);
    const inventorPersistido = await dataInventors.getInventor(inventor._id); 
    res.json(inventorPersistido);
});

//Modificar un inventor (MODIFICACIÓN)
router.put('/:id',validarToken, async (req, res) => {
    if (req.userid != userid) {
        res.status(404).json({
            auth: false,
            message: 'No user found'
        });
    }
    const inventor = req.body;
    inventor._id = req.params.id;
    await dataInventors.updateInventor(inventor);

    res.json(await dataInventors.getInventor(req.params.id)); //id es el parámetro que se pasa primero '/:id' 
});

//Eliminar un inventor (BAJA)
router.delete('/:id',validarToken, async (req, res) => {
    if (req.userid != userid) {
        res.status(404).json({
            auth: false,
            message: 'No user found'
        });
    }
    console.log('Delete');
    await dataInventors.deleteInventor(req.params.id);
    res.send('Inventor eliminado');
});


// EXPORTS: Siempre que se va a usar este archivo desde algún otro lugar del documento, debo hacer la exportación
module.exports = router;  //router es el objeto que se va a exportar (enviar) cuando se invoque a este archivo en una importación en otro archivo