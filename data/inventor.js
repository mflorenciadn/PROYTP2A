// mongodb+srv://admin:tp2a@cluster0.uak9i.mongodb.net/sample_betp2?retryWrites=true&w=majority

const fs = require('fs').promises;
const PATHMOCINVENTORS = __dirname + '/mocInventor.json'; //Constante '__dirname' devuelve el directorio donde estoy 
const connection = require('./conexionMongo'); //importo la conexion a la BD

//Esto no se usa si tengo una BD, se usa sólo en el caso de que tenga los datos sólo en el archivo a leer
async function readMocInventor(){  //siempre que uso await, colocar el async adelante de la function. Todas las funciones que llamen a esta funcion también deberán incluir en cadena AWAIT y ASYNC
   return JSON.parse(await fs.readFile(PATHMOCINVENTORS, 'utf8')); //PROMESA: hasta que no me devuelva lo que contiene el archivo, no va a hacer el parseo (AWAIT)
}

async function writeMocInventor(inventors){
    await fs.writeFile(PATHMOCINVENTORS, JSON.stringify(inventors, null, ' '));
}


async function getAllInventors(){
    //return await readMocInventor();
    const connectionmongo = await connection.getConnection();

    const inventors = await connectionmongo //AWAIT porque el find devuelve una promesa, 
                        .db('sample_betp2') //nombre de la BD en Mongo
                        .collection('inventors') // coleccion dentro de mi BD
                        .find()// como quiero que me traiga todo, no le paso ningun filtro
                        .toArray(); // devuelve un array de objetos
    
    return inventors;
}

async function getInventor(id){
    // let data = await getAllInventors();
    // let inventor = data.inventors.find(inventor => inventor._id == id);
    // return  inventor;
    const connectionmongo = await connection.getConnection();

    const inventor = await connectionmongo
                            .db('sample_betp2')
                            .collection('inventors')
                            .findOne({_id: parseInt(id)}); //busco mediante un id: paso un objeto js con un '_id'(porque asi se llama la propiedad),'id' (es lo que viene por parametro)
    return inventor;
}

async function pushInventor(inventor){
    // let data = await getAllInventors();
    // data.inventors.push(inventor);
    // await writeMocInventor(data);
    const connectionmongo = await connection.getConnection();

    const result = await connectionmongo
                            .db('sample_betp2')
                            .collection('inventors')
                            .insertOne(inventor); //envia UN documento como parametro. Con inserteMany() podría pasarse un array
    return result;
}

async function updateInventor(inventor){ // el objeto inventor va a poseer el id para buscar el objeto, y las propiedades que se van a modificar 
    // const data  = await getAllInventors();
    // const index = data.inventors.findIndex(value => value._id == inventor._id);
    // data.inventors[index].first = inventor.first;
    // data.inventors[index].last = inventor.last;
    // data.inventors[index].year = inventor.year;
    // data.inventors[index].img = inventor.img;

    // await writeMocInventor(data);
    const connectionmongo = await connection.getConnection();
    const query = {_id: parseInt(inventor._id)}; //filtrado para obtener el documento que quiero actualizar
    const newvalues = { $set : { // comando SET y valores a cambiar
            first: inventor.first,
            last: inventor.last,
            year: inventor.year,
            img: inventor.img            
        }
    };

    const result = await connectionmongo
                            .db('sample_betp2')
                            .collection('inventors')
                            .updateOne(query, newvalues); //el updateOne recibe 2 parámetros: el objeto a cambiar, los nuevos valores del set
    return result; 
}

async function deleteInventor(id){
    // const data = await getAllInventors();
    // data.inventors.splice(
    //     data.inventors.findIndex(value => value._id == id), 
    //     1
    // );
    // await writeMocInventor(data);
    const connectionmongo = await connection.getConnection();
    const result = await connectionmongo
                            .db('sample_betp2')
                            .collection('inventors')
                            .deleteOne({_id: parseInt(id)}); //filtro por ID
    return result;
}

module.exports = {getAllInventors, getInventor, pushInventor, updateInventor, deleteInventor} //exporto todos los métodos que se van a usar desde afuera de este archivo
