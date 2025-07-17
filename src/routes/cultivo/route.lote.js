import { Router } from "express";
import { verificarToken } from '../../middlewares/authentication.js';
import {
    listarLotes,
    buscarLotePorId,
    registrarLote,
    actualizarLote,
    eliminarLote
} from '../../controllers/cultivo/controller.lote.js';

const router = Router();

router.get('/listar', verificarToken, listarLotes);
router.get('/buscar/:id_lote_pk', verificarToken, buscarLotePorId);
router.post('/registrar', verificarToken, registrarLote);
router.put('/actualizar/:id_lote_pk', verificarToken, actualizarLote);
router.delete('/eliminar/:id_lote_pk', verificarToken, eliminarLote);


export default router;
