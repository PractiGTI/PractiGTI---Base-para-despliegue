import {Router} from "express";
import {methods as practicaController} from '../controllers/practica.controller.js';
import pool from "../database/database.js";

const router=Router();

router.get("/:id",practicaController.getPracticaById);
router.get("/:practicaId/users/:userId/factores",practicaController.getFactoresByPracticaId);
router.get("/:practicaId/users/:userId/factores/2",practicaController.getFactoresByPracticaIdversion2);
router.patch("/:practicaId/users/:userId",practicaController.updateEstado);

export default router;