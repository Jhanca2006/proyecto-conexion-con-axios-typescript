import { pool } from '../../../database/conexion.js';

import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';
import path from 'path';


export const reportarActividadExcel = async (req, res) => {
    try {


        const query = `
            SELECT
                ta.nombre_tipo_actividad AS actividad,
                EXTRACT(DAY FROM a.fecha_actividad)::INT AS dia,
                SUM(CAST(a.tiempo_actividad AS INT)) AS tiempo_minutos
            FROM actividades a
            JOIN tipos_actividades ta ON a.id_tipo_actividad_fk = ta.id_tipo_actividad_pk
            GROUP BY actividad, dia
            ORDER BY actividad, dia;
        `;

        const { rows } = await pool.query(query);

        const folder = path.join(process.cwd(), 'private', 'excel');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

        const filePath = path.join(folder, 'Reporte_Actividad.xlsx');
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);

        // Encabezados
        sheet.cell('A1').value('ACTIVIDAD');
        for (let d = 1; d <= 31; d++) {
            sheet.cell(1, d + 1).value(d);
        }
        sheet.cell(1, 33).value('TOTAL TIEMPO');

        // Agrupar datos por actividad
        const agrupados = {};
        rows.forEach(({ actividad, dia, tiempo_minutos }) => {
            if (!agrupados[actividad]) agrupados[actividad] = Array(31).fill(0);
            agrupados[actividad][dia - 1] = tiempo_minutos;
        });

        // Llenar la hoja
        let row = 2;
        for (const [actividad, tiempos] of Object.entries(agrupados)) {
            sheet.cell(row, 1).value(actividad);
            let total = 0;
            tiempos.forEach((min, idx) => {
                sheet.cell(row, idx + 2).value(min || '');
                total += min;
            });
            sheet.cell(row, 33).value(total);
            row++;
        }

        // Totales generales
        sheet.cell(row, 1).value('TOTAL TIEMPO');
        for (let col = 2; col <= 32; col++) {
            const colLetter = sheet.cell(1, col).address().replace(/[0-9]/g, '');
            const formula = `SUM(${colLetter}2:${colLetter}${row - 1})`;
            sheet.cell(row, col).formula(formula);
        }
        sheet.cell(row, 33).formula(`SUM(AG2:AG${row - 1})`);

        // Guardar
        await workbook.toFileAsync(filePath);

        res.download(filePath, (e) => {
            if (e) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).json({ message: 'Error al descargar el archivo', status: 500 });
            }
        });
    } catch (e) {
        console.error('Error al generar el reporte:', e);
        res.status(500).json({ message: 'Error al generar el reporte: ' + e.message, status: 500 });
    }
};
