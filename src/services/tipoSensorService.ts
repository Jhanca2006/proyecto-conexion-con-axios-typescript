import axios from 'axios';

export const obtenerTiposSensores = async () => {
  const res = await axios.get('http://localhost:3000/tipo_sensores/listartipo');
  return res.data;
};

export const obtenerTipoSensorPorId = async (id: number) => {
  const res = await axios.get(`http://localhost:3000/tipo_sensores/buscar/${id}`);
  return res.data; 
};


export const registrarTipoSensor = async (datos: any) => {
  return await axios.post('http://localhost:3000/tipo_sensores/registrar', datos);
};

export const actualizarTipoSensor = async (id: number, datos: any) => {
  return await axios.put(`http://localhost:3000/tipo_sensores/actualizar/${id}`, datos);
};



export const eliminarTipoSensor = async (id: number) => {
  return await axios.delete(`http://localhost:3000/tipo_sensores/eliminar/${id}`);
};
