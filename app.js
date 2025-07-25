import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 

const servidor = express(); // solo uno, no app y servidor

// Middlewares
servidor.use(cors());
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(express.static('public'));

// Vistas
servidor.set('views engine', 'ejs');
servidor.set('views', 'src/views');

servidor.get('/documents', (req, res) => {
  res.render('documents.ejs');
});




// felipe
import sublote from "./src/routes/cultivo/route.sublote.js";
import lote from "./src/routes/cultivo/route.lote.js";
import tipoCultivo from "./src/routes/cultivo/route.tipocultivo.js";
import cultivo from "./src/routes/cultivo/route.cultivo.js";
import pdfKit from "./src/routes/route.pdf.js";
import excel from "./src/routes/route.excel.js";
import reporteActividad from "./src/routes/report/route.reporteActividad.js";

// dario
import almacen from "./src/routes/inventario/route.almacen.js";
import categoria from "./src/routes/inventario/route.categoria.js";
import insumo from "./src/routes/inventario/route.insumo.js";

// kevin
import tipo_actividad from "./src/routes/actividad/route.tipoactividad.js";
import actividad from "./src/routes/actividad/route.actividad.js";
import evidencia from "./src/routes/actividad/route.evidencia.js";

// mayeli
import usuario from "./src/routes/usuario/route.usuario.js";
import rol from "./src/routes/usuario/route.roles.js";
import usuarioActividad from "./src/routes/actividad/route.usuario_actividad.js";

// jean
import sensores from "./src/routes/iot/route.sensores.js";
import tipo_sensores from "./src/routes/iot/route.tipos_sensores.js";

// oscar
import cultivo_actividad from "./src/routes/actividad/route.cultivo_actividades.js";
import proveedores from "./src/routes/inventario/route.proveedores.js";
import insumo_proveedores from "./src/routes/inventario/route.insumo_proveedores.js";
import epa from "./src/routes/cultivo/route.epa.js";
import tipoepa from "./src/routes/cultivo/route.tipoepa.js";
import movimiento_insumo from "./src/routes/inventario/route.movimiento_insumo.js";

// finanzas
import producto from "./src/routes/finanzas/route.productos.js";
import ventas from "./src/routes/finanzas/route.ventas.js";
import movimientoProducto from "./src/routes/finanzas/rout.movimiento_producto.js";
import finanzas from "./src/routes/finanzas/route.finanzas.js";


// felipe
servidor.use('/sublote', sublote);
servidor.use('/lote', lote);
servidor.use('/tipocultivo', tipoCultivo);
servidor.use('/cultivo', cultivo);
servidor.use('/pdf', pdfKit);
servidor.use('/excel', excel);
servidor.use('/reporteActividad', reporteActividad);

// dario
servidor.use('/almacen', almacen);
servidor.use('/categoria', categoria);
servidor.use('/insumo', insumo);

// kevin
servidor.use('/tipo_actividad', tipo_actividad);
servidor.use('/actividad', actividad);
servidor.use('/evidencia', evidencia);

// mayeli
servidor.use('/usuario', usuario);
servidor.use('/rol', rol);
servidor.use('/usuarioActividad', usuarioActividad);

// jean
servidor.use('/sensores', sensores);
servidor.use('/tipo_sensores', tipo_sensores);

// oscar
servidor.use('/cultivo_actividad', cultivo_actividad);
servidor.use('/proveedores', proveedores);
servidor.use('/insumo_proveedor', insumo_proveedores);
servidor.use('/epa', epa);
servidor.use('/tipoepa', tipoepa);
servidor.use('/movimientoinsumo', movimiento_insumo);

// finanzas
servidor.use('/productos', producto);
servidor.use('/ventas', ventas);
servidor.use('/movimientoProducto', movimientoProducto);
servidor.use('/finanzas', finanzas);

// --------------------------------------------
// INICIAR SERVIDOR
// --------------------------------------------
servidor.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
