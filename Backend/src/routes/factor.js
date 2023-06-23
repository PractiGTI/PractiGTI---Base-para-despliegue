import {Router} from "express";
import {methods as factorController} from '../controllers/factor.controller.js';
import pool from "../database/database.js";

const router=Router();

router.get("/",factorController.getFactores);

router.get("/:id",factorController.getFactorById);

router.get("/preguntas",factorController.getPreguntasByFactores);

router.get("/:factorId/users/:userId/practicas",factorController.getPracticasByFactorId);

export default router;