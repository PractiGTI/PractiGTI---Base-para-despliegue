import {config} from "dotenv";

config();

export default{
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    jwtSecret:'jwtsecret',
    jwtSecretReset:'jwtsecretreset',
    SENDGRID_API_KEY:process.env.SENDGRID_API_KEY
};