import { Router } from "express";
import { verificarToken } from '../../middlewares/authentication.js'
import {
    listarSensores,
    buscarSensorporid,
    registrarSensores,
    actualizarSensor,
    eliminarSensor
} from '../../controllers/iot/controller.sensores.js';

const router = Router();

router.get('/listar',listarSensores);
router.get('/buscar/:id_sensor_pk', buscarSensorporid);
router.post('/registrar', registrarSensores);
router.put('/actualizar/:id_sensor_pk', actualizarSensor);
router.delete('/eliminar/:id_sensor_pk', eliminarSensor);


export default router;