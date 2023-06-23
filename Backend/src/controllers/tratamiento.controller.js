import pool from "../database/database.js";

const getPracticasByFactorId=async (req,res)=>{

    try {
        console.log(req.params)
        const {factorId} = req.params;
        console.log(factorId)
        const fid=await pool.query("SELECT CPractica FROM tratamiento WHERE CFactor = ? " , [factorId]);
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
    getPracticasByFactorId
}