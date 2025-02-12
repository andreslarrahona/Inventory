<template>
  <div id="app">
    <header>
      <h1>Inventario general de equipamiento</h1>
    </header>
    
    <TablaInstrumentos />
  </div>
</template>

<script>
  
// Importa el componente TablaInstrumentos
import TablaInstrumentos from './components/TablaInstrumentos.vue';

export default {
  name: 'App',
  components: {
    TablaInstrumentos  // Aquí registras el componente para usarlo
  },
};
</script>

