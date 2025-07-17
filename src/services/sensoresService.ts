import axios from 'axios';

export const obtenerSensores = async () => {
  const res = await axios.get('http://localhost:3000/sensores/listar');
  return res.data;
};

export const obtenerSensorPorId = async (id: number) => {
  const res = await axios.get(`http://localhost:3000/sensores/buscar/${id}`);
  return res.data; 
};



export async function registrarSensor(datos: any) {
  const res = await axios.post('http://localhost:3000/sensores/registrar', datos);
  return res.data;
}

export const actualizarSensor = async (id: number, datos: any) => {
  return await axios.put(`http://localhost:3000/sensores/actualizar/${id}`, datos);
};


export const eliminarSensor = async (id: number) => {
  return await axios.delete(`http://localhost:3000/sensores/eliminar/${id}`);
};
