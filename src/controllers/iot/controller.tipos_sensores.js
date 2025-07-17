import { pool } from '../../database/conexion.js';

export const listartipoSensores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipos_sensores');
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'no se encontraron tipos de sensores registrados', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'error al realizar la búsqueda: ' + e.message, status: 500 });
    }
};

export const buscartipoSensorid = async (req, res) => {
    try {
        const id_tipo_sensor_pk = req.params.id_tipo_sensor_pk;
        const result = await pool.query('SELECT * FROM tipos_sensores WHERE id_tipo_sensor_pk = $1', [id_tipo_sensor_pk]);
        if (result.rows.length > 0) {
           res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'no se encontró el tipo de sensor', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'error al realizar la búsqueda: ' + e.message, status: 500 });
        console.log(e)
    }
};

export const registrartiposSensores = async (req, res) => {
    try {
        console.log('Cuerpo recibido:', req.body);
        const { id_tipo_sensor_pk, nombre_tipo_sensor } = req.body;
        const sql = `INSERT INTO tipos_sensores (id_tipo_sensor_pk, nombre_tipo_sensor)
                    VALUES ($1, $2)`;
        const result = await pool.query(sql, [id_tipo_sensor_pk, nombre_tipo_sensor]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'se registró el tipo de sensor', status: 200 });
        } else {
            res.status(404).json({ message: 'no se registró el tipo de sensor', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'error al realizar el registro: ' + e.message, status: 500 });
    }
};

export const actualizartipoSensor = async (req, res) => {
  try {
    const { nombre_tipo_sensor } = req.body;
    const id_tipo_sensor_pk = req.params.id_tipo_sensor_pk;

    const sql = `
      UPDATE tipos_sensores 
      SET nombre_tipo_sensor = $1 
      WHERE id_tipo_sensor_pk = $2
    `;

    const result = await pool.query(sql, [nombre_tipo_sensor, id_tipo_sensor_pk]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Se actualizó el tipo de sensor', status: 200 });
    } else {
      res.status(404).json({ message: 'No se actualizó el tipo de sensor', status: 404 });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar: ' + e.message, status: 500 });
  }
};

export const eliminartipoSensor = async (req, res) => {
    try {
        const id_tipo_sensor_pk = req.params.id_tipo_sensor_pk;

        const sql = 'DELETE FROM tipos_sensores WHERE id_tipo_sensor_pk = $1';
        const result = await pool.query(sql, [id_tipo_sensor_pk]);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'se eliminó el tipo de sensor', status: 200 });
        } else {
            res.status(404).json({ message: 'no se eliminó el tipo de sensor', status: 404 });
        }
    } catch (e) {
        res.status(500).json({ message: 'error al eliminar: ' + e.message, status: 500 });
    }
};

