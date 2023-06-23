import {Router} from "express";
import pool from "../database/database.js";
import helpers from "../lib/helpers.js";
import jwt from "jsonwebtoken";
import config from '../config.js';
import sgMail from '@sendgrid/mail';
import {methods as authenticationController} from "../controllers/authentication.controller.js";

sgMail.setApiKey(config.SENDGRID_API_KEY);

const router=Router();


router.post('/signup',authenticationController.signUp)

router.post('/signin',authenticationController.signIn)

router.post("/forgot-password",authenticationController.forgotPassword)

router.put("/new-password",authenticationController.newPassword)

export default router;