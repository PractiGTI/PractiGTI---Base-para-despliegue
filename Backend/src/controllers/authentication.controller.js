import pool from "../database/database.js";
import helpers from "../lib/helpers.js";
import jwt from "jsonwebtoken";
import config from '../config.js';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(config.SENDGRID_API_KEY);

const signUp=async (req,res)=>{
    console.log(req.body);

    const{CUniversidad,NUsuario,NUsuarioApellido,TUsuarioImagen,TUsuarioCorreo,
        TUsuarioContrasena,DUsuarioFechaUnion}=req.body;

    const rows=await pool.query('SELECT * FROM usuario WHERE TUsuarioCorreo=?',[TUsuarioCorreo]);
   
    if(rows.length==0){
        const user={
            CUniversidad,NUsuario,NUsuarioApellido,TUsuarioImagen,TUsuarioCorreo,
            TUsuarioContrasena,DUsuarioFechaUnion
        }
    
        user.TUsuarioContrasena=await helpers.encryptPassword(TUsuarioContrasena);
    
        const result=await pool.query('INSERT INTO usuario SET ?', user);
        user.CUsuario=result.insertId;
        res.send(user);
    }

    else{
        res.status(403);
        res.send("Ya existe una cuenta con este correo: "+TUsuarioCorreo)
    }
    

    
}

const signIn=async (req,res)=>{
    console.log(req.body);

    const rows=await pool.query('SELECT * FROM usuario WHERE TUsuarioCorreo=?',[req.body.TUsuarioCorreo]);
    console.log(rows);
    if(rows.length>0){
        const user=rows[0];
        console.log(user)
        console.log(user.TUsuarioContrasena);
        console.log(req.body.TUsuarioContrasena);
        const validPassword=await helpers.matchPassword(req.body.TUsuarioContrasena,user.TUsuarioContrasena);
        console.log(validPassword);
        if(validPassword){
            res.send(user)
        }
        else{
            res.status(401);
            res.send("Invalid login credentials")
        }
    }
    else{
        res.status(401);
        res.send("Invalid login credentials")
    }

}

const forgotPassword=async(req,res)=>{
    const {TUsuarioCorreo}=req.body;

    const message='Check email';

    const user=await pool.query('SELECT * FROM usuario WHERE TUsuarioCorreo=?',[TUsuarioCorreo]);
    const payload={
        id:user[0].CUsuario,
        email:user[0].TUsuarioCorreo
    }
    const token=jwt.sign(payload,config.jwtSecretReset,{expiresIn:'20m'});
    console.log(token)
    const verificationLink=`http:localhost:5000/new-password/${token}`;
    
    const userResetToken=await pool.query('UPDATE usuario SET TResetToken=? WHERE CUsuario=?',[token,payload.id]);

    const msg = {
        to: 'ldlmhm@gmail.com', // Change to your recipient
        from: 'lhm2001@hotmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: verificationLink
      }
      
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })


    res.send({verificationLink:verificationLink});
}

const newPassword=async(req,res)=>{
    const {newPassword}=req.body;
    const resetToken=req.headers.reset;

    let jwtPayload;

    jwtPayload=jwt.verify(resetToken,config.jwtSecretReset);

    const rows= await pool.query('SELECT * FROM usuario WHERE TResetToken=?',[resetToken]);
    const user= rows[0];

    const hashPassword=await helpers.encryptPassword(user.TUsuarioContrasena);
    console.log(hashPassword);
    console.log(user.CUsuario)
    const result=await pool.query('UPDATE usuario SET TUsuarioContrasena=? WHERE CUsuario=?',[hashPassword,user.CUsuario]);

    res.json({message:"Password Changed",result:result})
    
}

export const methods={
    signUp,
    signIn,
    forgotPassword,
    newPassword
}