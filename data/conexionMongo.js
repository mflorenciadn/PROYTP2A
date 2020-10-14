 //instalar Mongo con 'npm mongodb'
 
const chalk = require('chalk');
const mongoclient = require('mongodb').MongoClient; //si hiciera solo const mongoclient = require('mongodb'), se importa TODO el modulo. El '.MongoClient' hace que se descargue especificamente lo que necesito
//const dotenv = requiere('dotenv').config();

const uriMongodb = 'mongodb+srv://admin:tp2a@cluster0.uak9i.mongodb.net/sample_betp2?retryWrites=true&w=majority'; //cadena de conexion que me dio MONGO. OJO! No deberia estar hardcodeada con el user y pass. Se soluciona con las VARIABLES DE ENTORNO, que permiten no subir los secrets en el repositorio, y se configuran al deployarlo en la nube

//const uriMongodb =  process.env.URIMONGO; //Busca en la variable de entorno, si no lo encuentra lo busca en el archivo local, y si no lo encuentra da error. En www el port lo toma como algo parecido: 'process.env.PORT'

const client = new mongoclient(uriMongodb, {useUnifiedTopology: true, useNewUrlParser: true}); // useUnifiedTopology: true --> vinculado a la nube // useNewUrlParser: true --> es mas opcional, por si el usario del connection string tiene algun caracter especial

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.read(err))); //el connect devuelve una promesa: si hay un error tal cosa, si no tal otra
}

module.exports = {getConnection};