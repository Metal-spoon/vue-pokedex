<script setup lang="ts">
import { onErrorCaptured, reactive, ref } from 'vue';
import Pokedex from './components/Pokedex.vue';
import Spinner from './components/Spinner.vue';

let data = reactive({
  showError: false,
  errorMessage: ''
})

onErrorCaptured((e: Error) => {
  data.showError = true
  data.errorMessage = e.message;
})
</script>

<template>
<div class="overlay" v-if="data.showError"> 
  <font-awesome-icon size="4x" icon="fa-solid fa-triangle-exclamation" />
  <span>Something went wrong</span>
  <span>{{data.errorMessage}}</span>
</div>
<Suspense v-else>
  <Pokedex />
  <template #fallback>
    <Spinner/>
  </template>
</Suspense>

</template>

<style>
  .overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>