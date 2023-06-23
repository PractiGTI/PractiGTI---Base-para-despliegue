import {Router} from "express";
import {methods as tratamientoController} from '../controllers/tratamiento.controller.js';
import pool from "../database/database.js";

const router=Router();

router.get("/factores/:factorId/practicas",tratamientoController.getPracticasByFactorId);

export default router;