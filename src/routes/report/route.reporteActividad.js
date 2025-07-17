import { Router } from "express";
import { reportarActividadExcel } from '../../controllers/report/actividad/controller.reporteActividad.js';

const router = Router();

router.get('/reporte-actividad-excel', reportarActividadExcel);

export default router;


