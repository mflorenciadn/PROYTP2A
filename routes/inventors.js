let express = require('express');
let router = express.Router();

// listado de todos los inventors
// http://localhost:3000/api/inventors/
router.get('/', (req, res) =>{
    res.send('Lista de todos los inventors');
});

// http://localhost:3000/api/inventors/8
router.get('/:id', (req, res) =>{
    res.send('Un inventor especifico');
});

router.post('/', (req, res) => {
    res.send('Aca se hace un alta');
});

router.put('/:id', (req, res) =>{
    res.send('Acá se hace una modificacion');
});

router.delete('/:id', (req,res) => {
    res.send('Acá se hace la eliminacion');
});


module.exports = router;