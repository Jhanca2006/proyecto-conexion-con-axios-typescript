import {
  obtenerTiposSensores,
  obtenerTipoSensorPorId,
  registrarTipoSensor,
  actualizarTipoSensor,
  eliminarTipoSensor
} from '../services/tipoSensorService';

export async function renderTiposSensores() {
  const contenedor = document.querySelector<HTMLDivElement>('#listaTiposSensores')!;
  const tipos = await obtenerTiposSensores();

  contenedor.innerHTML = `
    <h3 class="seccion-titulo">Tipos de Sensores</h3>
    <div class="tarjetas-sensores">
      ${tipos.map((t: any) => `
        <div class="tarjeta">
          <h4>${t.nombre_tipo_sensor}</h4>
          <div class="acciones">
            <button class="btn btn-editar" onclick="editarTipoSensor(${t.id_tipo_sensor_pk})">Editar</button>
            <button class="btn btn-eliminar" onclick="borrarTipoSensor(${t.id_tipo_sensor_pk})">Eliminar</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function iniciarTipoSensor() {
  const form = document.querySelector<HTMLFormElement>('#formTipoSensor')!;
  const inputId = document.querySelector<HTMLInputElement>('#id_tipo_sensor_pk')!;
  const inputNombre = document.querySelector<HTMLInputElement>('#nombre_tipo_sensor')!;
  const boton = form.querySelector('button')!;

  let modoEditar = false;
  let idEditando: number | null = null;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const datos = {
      id_tipo_sensor_pk: parseInt(inputId.value),
      nombre_tipo_sensor: inputNombre.value
    };

    try {
      if (modoEditar && idEditando !== null) {
        await actualizarTipoSensor(idEditando, { nombre_tipo_sensor: datos.nombre_tipo_sensor });
        modoEditar = false;
        idEditando = null;
        boton.textContent = 'Guardar Tipo Sensor';
        inputId.disabled = false;
      } else {
        await registrarTipoSensor(datos);
      }

      form.reset();
      await renderTiposSensores();
    } catch (error) {
      console.error('Error registrando/actualizando tipo de sensor:', error);
      alert('❌ Error registrando/actualizando tipo de sensor');
    }
  };

  (window as any).borrarTipoSensor = async (id: number) => {
    try {
      await eliminarTipoSensor(id);
      await renderTiposSensores();
    } catch (error) {
      console.error('Error eliminando tipo sensor:', error);
      alert('❌ Error eliminando tipo sensor');
    }
  };

  (window as any).editarTipoSensor = async (id: number) => {
    try {
      const tipo = await obtenerTipoSensorPorId(id);

      if (!tipo || !tipo.nombre_tipo_sensor) {
        alert('❌ No se encontró el tipo de sensor');
        return;
      }

      inputId.value = tipo.id_tipo_sensor_pk;
      inputNombre.value = tipo.nombre_tipo_sensor;
      inputId.disabled = true;

      modoEditar = true;
      idEditando = id;
      boton.textContent = 'Actualizar Tipo Sensor';
    } catch (error) {
      console.error("Error editando tipo sensor:", error);
      alert('❌ Error cargando tipo de sensor');
    }
  };
}
