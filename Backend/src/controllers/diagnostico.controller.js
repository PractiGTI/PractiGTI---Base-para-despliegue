import pool from "../database/database.js";

const createDiagnostico=async (req,res)=>{
    try {
        const {CUsuario,CFactor,CPractica,NPracticaEstado}=req.body;
        const diagnostico={
            CUsuario,CFactor,CPractica,NPracticaEstado
        };
        const result=await pool.query('INSERT INTO diagnostico SET ?', diagnostico);
        console.log(req.body)
        res.json(result)
    } catch (error) { 
        res.status(500);
        res.send(error.message);    
    }
}




export const methods={
    createDiagnostico
}