<template>

<div>
  <h3>Babylon Test</h3>
  <canvas></canvas>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicScene } from '@/Babylon/BasicScene';

export default defineComponent({
  name: 'babylonTest',
  mounted(){
    const canvas = document.querySelector('canvas')!;
    new BasicScene(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  width: 70%;
  height: 70%;
  border: 1px solid black;
}
</style>
