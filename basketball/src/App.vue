<template>
  <babylonTest />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import babylonTest from './components/test.vue';

export default defineComponent({
  name: 'App',
  components: {
    babylonTest
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
