import {
  obtenerSensores,
  obtenerSensorPorId,
  registrarSensor,
  actualizarSensor,
  eliminarSensor
} from '../services/sensoresService';

// Función para formatear fechas en formato legible
function formatearFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export async function renderSensores() {
  const contenedor = document.querySelector<HTMLDivElement>('#listaSensores')!;
  const sensores = await obtenerSensores();

  contenedor.innerHTML = `
    <h3 class="seccion-titulo">Sensores</h3>
    <div class="tarjetas-sensores">
      ${sensores.map((s: any) => `
        <div class="tarjeta">
          <h4>${s.nombre_sensor}</h4>
          <p><strong>Cultivo:</strong> ${s.id_cultivo_fk} | <strong>Tipo:</strong> ${s.id_tipo_sensor_fk}</p>
          <p><strong>Inicio:</strong> ${formatearFecha(s.fecha_inicio_sensor)} - <strong>Fin:</strong> ${formatearFecha(s.fecha_fin_sensor)}</p>
          <div class="acciones">
            <button class="btn btn-editar" onclick="editarSensor(${s.id_sensor_pk})">Editar</button>
            <button class="btn btn-eliminar" onclick="borrarSensor(${s.id_sensor_pk})">Eliminar</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function iniciarSensor() {
  const form = document.querySelector<HTMLFormElement>('#formSensor')!;
  const inputNombre = document.querySelector<HTMLInputElement>('#nombre_sensor')!;
  const inputCultivo = document.querySelector<HTMLInputElement>('#id_cultivo_fk')!;
  const inputTipo = document.querySelector<HTMLInputElement>('#id_tipo_sensor_fk')!;
  const inputInicio = document.querySelector<HTMLInputElement>('#fecha_inicio')!;
  const inputFin = document.querySelector<HTMLInputElement>('#fecha_fin')!;
  const boton = form.querySelector('button')!;

  let modoEditar = false;
  let idEditando: number | null = null;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre_sensor: inputNombre.value,
      id_cultivo_fk: parseInt(inputCultivo.value),
      id_tipo_sensor_fk: parseInt(inputTipo.value),
      fecha_inicio_sensor: inputInicio.value,
      fecha_fin_sensor: inputFin.value
    };

    try {
      if (modoEditar && idEditando !== null) {
        await actualizarSensor(idEditando, datos);
        modoEditar = false;
        idEditando = null;
        boton.textContent = 'Guardar Sensor';
      } else {
        await registrarSensor(datos);
      }

      form.reset();
      await renderSensores();
    } catch (err) {
      console.error('❌ Error registrando/actualizando sensor:', err);
      alert('❌ Error registrando/actualizando sensor');
    }
  };

  (window as any).borrarSensor = async (id: number) => {
    try {
      await eliminarSensor(id);
      await renderSensores();
    } catch (err) {
      console.error('❌ Error eliminando sensor:', err);
      alert('❌ Error eliminando sensor');
    }
  };

  (window as any).editarSensor = async (id: number) => {
    try {
      const sensor = await obtenerSensorPorId(id);

      if (!sensor || !sensor.nombre_sensor) {
        alert('❌ No se encontró el sensor con ID ' + id);
        return;
      }

      inputNombre.value = sensor.nombre_sensor;
      inputCultivo.value = String(sensor.id_cultivo_fk);
      inputTipo.value = String(sensor.id_tipo_sensor_fk);
      inputInicio.value = sensor.fecha_inicio_sensor.split('T')[0];
      inputFin.value = sensor.fecha_fin_sensor.split('T')[0];

      modoEditar = true;
      idEditando = id;
      boton.textContent = 'Actualizar Sensor';
    } catch (error) {
      console.error("❌ Error cargando sensor para edición:", error);
    }
  };
}
