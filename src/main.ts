import './style.css';
import { iniciarSensor, renderSensores } from './controladores/controladorSensor';
import { iniciarTipoSensor, renderTiposSensores } from './controladores/controladorTipoSensor';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Elemento #app no encontrado en el DOM.');
    return;
  }

  app.innerHTML = `
    <section>
      <h2>Crear Sensor</h2>
      <form id="formSensor" class="formulario">
        <div class="flex-container">
          <input type="text" id="nombre_sensor" placeholder="Nombre del sensor" required />
          <input type="number" id="id_cultivo_fk" placeholder="ID Cultivo" required />
          <input type="number" id="id_tipo_sensor_fk" placeholder="ID Tipo Sensor" required />
          <input type="date" id="fecha_inicio" required />
          <input type="date" id="fecha_fin" required />
        </div>
        <button type="submit" class="guardar">Guardar Sensor</button>
      </form>
      <div id="listaSensores" class="lista-contenedor"></div>
    </section>

    <section>
      <h2>Crear Tipo de Sensor</h2>
      <form id="formTipoSensor" class="formulario">
        <div class="flex-container">
          <input type="number" id="id_tipo_sensor_pk" placeholder="ID del Tipo de Sensor" required />
          <input type="text" id="nombre_tipo_sensor" placeholder="Nombre del Tipo de Sensor" required />
        </div>
        <button type="submit" class="guardar">Guardar Tipo Sensor</button>
      </form>
      <div id="listaTiposSensores" class="lista-contenedor"></div>
    </section>
  `;

  iniciarSensor();
  iniciarTipoSensor();
  renderSensores();
  renderTiposSensores();
});
