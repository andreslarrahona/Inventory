<template>
  <div id="app">
    <header>
      <h1>Inventario general de equipamiento</h1>
    </header>
    
    <TablaInstrumentos />
  </div>
</template>

<script>
  
// Importamos el componente TablaInstrumentos
import TablaInstrumentos from './components/TablaInstrumentos.vue';

export default {
  name: 'App',
  components: {
    TablaInstrumentos
  },
};
</script>

