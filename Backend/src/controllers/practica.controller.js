import pool from "../database/database.js";


const getPracticaById=async (req,res)=>{

    try {
        const {id} = req.params;
        const practica=await pool.query("SELECT * FROM practica WHERE CPractica = ?" , id);
        console.log(practica)
        res.json(practica);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getFactoresByPracticaId=async (req,res)=>{

    try {
        console.log(req.params)
        const {practicaId,userId} = req.params;
        const pid=await pool.query("SELECT CFactor FROM diagnostico WHERE CPractica = ? and CUsuario = ?" , [practicaId, userId]);
        res.json(pid);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getFactoresByPracticaIdversion2=async (req,res)=>{

    let factores=[];

    try {
        console.log(req.params)
        const {practicaId,userId} = req.params;
        const pid=await pool.query("SELECT CFactor FROM diagnostico WHERE CPractica = ? and CUsuario = ?" , [practicaId, userId]);
        pid.map(el=>{
            factores.push(el.CFactor)
        })
        res.json(factores);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateEstado=async (req,res)=>{

    console.log("pepe")
    try {     
        const {NPracticaEstado}=req.body;
        
        console.log(NPracticaEstado)
        const {practicaId,userId} = req.params;
/*         const user={
            CUniversidad,NUsuario,NUsuarioApellido,TUsuarioImagen,TUsuarioCorreo,
            TUsuarioContrasena,DUsuarioFechaUnion}; */
        
        console.log(practicaId,userId)
        const update=await pool.query("UPDATE diagnostico SET NPracticaEstado=? WHERE CPractica = ? and CUsuario=?" , [NPracticaEstado, practicaId,userId]);
        
        console.log(update)
        res.json(update);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
}

export const methods={
    getPracticaById,
    getFactoresByPracticaId,
    getFactoresByPracticaIdversion2,
    updateEstado
}