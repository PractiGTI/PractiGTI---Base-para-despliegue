import pool from "../database/database.js";

const getUniversidades=async (req,res)=>{
    try {
        const universidades=await pool.query('SELECT * FROM universidad');
        console.log(universidades)
        res.json(universidades);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUniversidadById=async (req,res)=>{

    try {
        const {id} = req.params;
        const universidad=await pool.query("SELECT * FROM universidad WHERE CUniversidad = ?" , id);
        console.log(universidad)
        res.json(universidad);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods={
    getUniversidades,
    getUniversidadById
}