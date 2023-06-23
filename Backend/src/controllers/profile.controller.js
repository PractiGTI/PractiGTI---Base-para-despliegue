import e from "express";
import pool from "../database/database.js";
import helpers from "../lib/helpers.js";

const getUsers= async (req,res)=>{

    try {
        const users=await pool.query('SELECT * FROM usuario');
        console.log(users)
        res.json(users);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUserById=async (req,res)=>{

    try {
        const {id} = req.params;
        const user=await pool.query("SELECT * FROM usuario WHERE CUsuario = ?" , id);
        console.log(user)
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getAllFactoresByUserId=async (req,res)=>{

    let factores=[];
    let factoresData=[];
    try {
        const {userId} = req.params;
        const factoresDB=await pool.query("SELECT CFactor FROM diagnostico WHERE CUsuario = ?" , [userId]);

        factoresDB.map(el=>{
            factores.push(el.CFactor)
        })
        //console.log(factores)
        let dup=[...new Set(factores)];

      /*   dup.map(async el=>{
            const factorData=await pool.query("SELECT * FROM factor WHERE CFactor = ?" , [el]);
           // console.log(factorData[0])
            factoresData.push(factorData[0]);
           // console.log(factoresData)
        })

        console.log(factoresData)
 */

        //const prac=await pool.query("SELECT * FROM practica WHERE CPractica = ?" , fid);
       // console.log(prac)
        res.json(dup);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getAllPracticasByUserId=async (req,res)=>{

    let practicas=[];
    let practicasData=[];
    try {
        const {userId} = req.params;
        const practicasDB=await pool.query("SELECT CPractica,NPracticaEstado FROM diagnostico WHERE CUsuario = ?" , [userId]);

        console.log(practicasDB);
/*         practicasDB.map(el=>{
            practicas.push(el.CPractica)
        }) */
        //console.log(factores)
       /*  let dup=[...new Set(practicasDB.map(el=>el.CPractica))]; */

       let dup=[...new Map(practicasDB.map(el=>[el['CPractica'],el])).values()];

       console.log(dup)


      /*   dup.map(async el=>{
            const factorData=await pool.query("SELECT * FROM factor WHERE CFactor = ?" , [el]);
           // console.log(factorData[0])
            factoresData.push(factorData[0]);
           // console.log(factoresData)
        })

        console.log(factoresData)
 */

        //const prac=await pool.query("SELECT * FROM practica WHERE CPractica = ?" , fid);
       // console.log(prac)
        res.json(dup);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getDiagnosticoByUserId=async (req,res)=>{

    try {
        const {userId} = req.params;
        const user=await pool.query("SELECT * FROM diagnostico WHERE CUsuario = ?" , userId);
        console.log(user)
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteDiagnosticoByUserId=async (req,res)=>{

    try {
        const {userId} = req.params;
        const user=await pool.query("DELETE FROM diagnostico WHERE CUsuario = ?" , userId);
        console.log(user)
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const updateUser=async (req,res)=>{

    try {     
        const {
            CUniversidad,NUsuario,NUsuarioApellido,TUsuarioImagen,TUsuarioCorreo,
            TUsuarioContrasena,DUsuarioFechaUnion}=req.body;
        
        const {id} = req.params;
        const user={
            CUniversidad,NUsuario,NUsuarioApellido,TUsuarioImagen,TUsuarioCorreo,
            TUsuarioContrasena,DUsuarioFechaUnion};
        console.log(user)
        const rows=await pool.query("SELECT * from usuario WHERE CUsuario =?",[id])
        const oldUser=rows[0]
        const oldPass=oldUser.TUsuarioContrasena
        console.log("pepe")
        console.log(user.TUsuarioContrasena)
        if(user.TUsuarioContrasena!=oldPass){
            console.log("es una nueva contrasena")
            user.TUsuarioContrasena=await helpers.encryptPassword(TUsuarioContrasena);
        }
        
        const users=await pool.query("UPDATE usuario SET ? WHERE CUsuario = ?" , [user, id]);
        
        res.json(users);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
}

export const methods={
    getUsers,
    getUserById,
    updateUser,
    getAllFactoresByUserId,
    getAllPracticasByUserId,
    getDiagnosticoByUserId,
    deleteDiagnosticoByUserId
}