const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;


app.get('/', async (req, res) => {
    try {
        const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';
        console.log('Realizando solicitud a:', url);

        const response = await axios.get(url);
        console.log('Recibida respuesta con código de estado:', response.status);

        const $ = cheerio.load(response.data);

        
        const promesas = [];

        
        $('#mw-pages a').each((index, element) => {
            const paginaURL = $(element).attr('href');
            console.log('Solicitando página:', paginaURL);

            const paginaPromise = axios.get(`https://es.wikipedia.org${paginaURL}`);
            promesas.push(paginaPromise);
        });

        

        
        console.log('Datos recopilados:', datosMusicosRap);
        res.json(datosMusicosRap);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

