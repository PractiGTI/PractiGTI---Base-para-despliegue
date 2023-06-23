import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/authentication.js';
import factores from './routes/factor.js';
import practicas from './routes/practica.js';
import diagnosticos from './routes/diagnostico.js';
import universidades from './routes/universidad.js';
import users from './routes/profile.js';
import tratamientos from './routes/tratamiento.js';

const app=express();
const PORT =5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE, OPTIONS")
    next();
  });

//app.use('/users',usersRoutes);

/* app.get('/',(req,res)=>{
    res.send("Hello from Homepage");
}); */

app.use('',auth);

app.use('/factores',factores);
app.use('/practicas',practicas);
app.use('/diagnosticos',diagnosticos);
app.use('/universidades',universidades);
app.use('/users',users);
app.use('/tratamientos',tratamientos);

app.listen(PORT,()=>{console.log(`Server Running on port: http://localhost:${PORT}`)});