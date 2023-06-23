import {Router} from "express";
import {methods as diagnosticoController} from '../controllers/diagnostico.controller.js';
import pool from "../database/database.js";

const router=Router();

router.post("/",diagnosticoController.createDiagnostico);

export default router;