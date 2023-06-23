import {Router} from "express";
import {methods as profileController} from '../controllers/profile.controller.js';
import pool from "../database/database.js";

const router=Router();

router.get("/",profileController.getUsers);
router.get("/:id",profileController.getUserById);
router.put("/:id",profileController.updateUser);
router.get("/:userId/factores",profileController.getAllFactoresByUserId);
router.get("/:userId/practicas",profileController.getAllPracticasByUserId);
router.get("/:userId/diagnostico",profileController.getDiagnosticoByUserId);
router.delete("/:userId/diagnostico",profileController.deleteDiagnosticoByUserId);

export default router;