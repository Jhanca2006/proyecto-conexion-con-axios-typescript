import { Router } from "express";
import { generarExcel } from '../libs/excel.js';

const router = Router();

router.get("/generar-excel", generarExcel);

export default router;
