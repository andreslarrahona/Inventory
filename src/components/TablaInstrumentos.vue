<template>
  <div id="cont-tabla-pci">
    <input
      type="text"
      v-model="busqueda"
      placeholder="Buscar en la tabla..."
      class="buscador" 
      id="buscador"
    />

    <table class="tabla" id="tabla-pci">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>N° de serie</th>
          <th>Ubicación</th>
          <th>Auditor</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iteramos sobre cada grupo filtrado -->
        <template v-for="(grupo, nombreGrupo) in instrumentosAgrupadosFiltrados" :key="nombreGrupo">
          <tr class="grupo-header" @click="toggleGroup(nombreGrupo)">
            <td colspan="7">
              <span class="icono-colapse">
                {{ instrumentosEscondidos[nombreGrupo] ? '▼' : '▲' }}
              </span>
              {{ nombreGrupo }}
            </td>
          </tr>
          <tr
            v-for="instrumento in grupo"
            :key="instrumento.id_interno"
            v-if="!instrumentosEscondidos[nombreGrupo]"
            class="fila"
          >
            <td>{{ instrumento.id_interno }}</td>
            <td>{{ instrumento.descripcion }}</td>
            <td>{{ instrumento.marca }}</td>
            <td>{{ instrumento.modelo }}</td>
            <td>{{ instrumento.nro_serie }}</td>
            <td>{{ instrumento.ubicacion }}</td>
            <td>{{ instrumento.auditor }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/api/axios'; // Importa la configuración de Axios

export default {
  data() {
    return {
      instrumentos: [], // Datos obtenidos de la API
      instrumentosEscondidos: {}, // Estado de colapso de cada grupo
      busqueda: "" // Valor del input de búsqueda
    };
  },
  async mounted() {
    try {
      const response = await api.get('src/api/axios');
      this.instrumentos = response.data;
      // Inicializa todos los grupos como colapsados
      for (const instrumento in this.instrumentosAgrupados) {
        this.instrumentosEscondidos[instrumento] = true;
      }
    } catch (error) {
      console.error('Error al obtener los instrumentos:', error);
    }
  },
  computed: {
    instrumentosAgrupados() {
      return this.instrumentos.reduce((instrumentosEnGrupo, instrumento) => {
        const prefix = instrumento.id_interno.slice(0, 2);
        let nombreGrupo = '';

        switch (prefix) {
          case '01': nombreGrupo = '01 - IUG | Activos de uso general'; break;
          case '02': nombreGrupo = '02 - LSE | Activos del Laboratorio de Ensayo y Seguridad Eléctrica'; break;
          case '03': nombreGrupo = '03 - LDC | Activos del Laboratorio de Metrología y Calibraciones'; break;
          case '04': nombreGrupo = '04 - DON | Activos donados'; break;
          case '05': nombreGrupo = '05 - INST | Equipamiento de instalaciones'; break;
          case '06': nombreGrupo = '06 - TC | Termocuplas'; break;
          case '07': nombreGrupo = '07 - GASES | Instrumental y consumibles para la calibración de detectores de gases'; break;
          case '08': nombreGrupo = '08 - CAP | Activos de Centro de capacitación'; break;
          default: nombreGrupo = 'Otros';
        }

        if (!instrumentosEnGrupo[nombreGrupo]) {
          instrumentosEnGrupo[nombreGrupo] = [];
        }
        instrumentosEnGrupo[nombreGrupo].push(instrumento);
        return instrumentosEnGrupo;
      }, {});
    },

    // Filtro los instrumentos según la búsqueda
     instrumentosAgrupadosFiltrados() {
    if (!this.busqueda.trim()) {
      return this.instrumentosAgrupados;
    }

    const busquedaLower = this.busqueda.toLowerCase();
    const filtrados = {};

    for (const instrumento in this.instrumentosAgrupados) {
      const instrumentosFiltrados = this.instrumentosAgrupados[instrumento].filter(inst =>
        JSON.stringify(inst).toLowerCase().includes(busquedaLower)
      );

      if (instrumentosFiltrados.length) {
        filtrados[instrumento] = instrumentosFiltrados;
      }
    }

    return filtrados;
  }
  },
  methods: {
    toggleGroup(nombreGrupo) {
      this.collapsedGroups[nombreGrupo] = !this.collapsedGroups[nombreGrupo];
    }
  }
};
</script>