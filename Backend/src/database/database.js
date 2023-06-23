import mysql from 'mysql'
import config from './../config.js';
import {promisify} from 'util';


const pool=mysql.createPool({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password
});


pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error("DATABASE HAS TOO MANY CONNECTIONS");
        }
        if(err.code==='ECONNREFUSED'){
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }

    if(connection) connection.release();
    console.log("DB IS CONECTED");
    return;
})

pool.query= promisify(pool.query);

export default pool;
