import { Router } from "express";
import { verificarToken } from '../../middlewares/authentication.js'
import {
    listartipoSensores,
    buscartipoSensorid,
    registrartiposSensores,
    actualizartipoSensor,
    eliminartipoSensor
} from '../../controllers/iot/controller.tipos_sensores.js';

const router = Router();

router.get('/listartipo', listartipoSensores);
router.get('/buscar/:id_tipo_sensor_pk', buscartipoSensorid);
router.post('/registrar', registrartiposSensores);
router.put('/actualizar/:id_tipo_sensor_pk', actualizartipoSensor);
router.delete('/eliminar/:id_tipo_sensor_pk', eliminartipoSensor);

export default router;