const express = require('express');

const app = express();

//rutas
app.get('/',(req,res)=>{
    res.send('¡Firee!');
});

app.listen(4000,()=>{
    console.info('El server On Fire');
});