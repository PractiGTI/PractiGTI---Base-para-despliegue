import {Router} from "express";
import {methods as universidadController} from '../controllers/universidad.controller.js';

const router=Router();

router.get("/",universidadController.getUniversidades);
router.get("/:id",universidadController.getUniversidadById);

export default router;