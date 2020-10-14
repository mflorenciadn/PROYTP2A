const fetch = require('node-fetch');

//Llamar a una API ya construida
//RAPIDAPI: Plataforma con miles de APIs listas para utilizar
async function getTotals(){
    const options = {
        headers: {
            "x-rapidapi-key": "97b813e2bcmsha53207007bed6f1p165ad8jsn0179f34668f3" //key que me da rapidapi al suscribirme a una api en particular
        }
    };
    //node-fetch: modulo npm para consumir una api externa desde mi propia api
    let data = await fetch("https://covid-19-data.p.rapidapi.com/totals?format=json", options);  //configurar las options previamente (en este caso, |me pide una key)
    data = await data.json();

    return data;
}

module.exports = {getTotals}