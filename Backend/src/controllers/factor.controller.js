import pool from "../database/database.js";

const getPreguntasByFactores=async (req,res)=>{
    try {
        const factores=await pool.query('SELECT TFactorPregunta FROM factor');
        console.log(factores)
        res.json(factores);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getFactores=async (req,res)=>{
    try {
        const factores=await pool.query('SELECT * FROM factor');
        console.log(factores)
        res.json(factores);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getFactorById=async (req,res)=>{

    try {
        const {id} = req.params;
        const factor=await pool.query("SELECT * FROM factor WHERE CFactor = ?" , id);
        console.log(factor)
        res.json(factor);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getPracticasByFactorId=async (req,res)=>{

    console.log("pepe")
    try {
        console.log(req.params)
        const {factorId,userId} = req.params;
        console.log(factorId)
        console.log(userId)
        const fid=await pool.query("SELECT CPractica FROM diagnostico WHERE CFactor = ? and CUsuario = ?" , [factorId, userId]);
        console.log(fid)
        //const prac=await pool.query("SELECT * FROM practica WHERE CPractica = ?" , fid);
       // console.log(prac)
        res.json(fid);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods={
    getFactores,
    getPreguntasByFactores,
    getPracticasByFactorId,
    getFactorById
}