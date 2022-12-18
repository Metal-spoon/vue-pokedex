<script setup lang="ts">
import ModalDialog from './ModalDialog.vue';
import { computed, reactive, ref } from 'vue';
import PokemonGrid from './PokemonGrid.vue';

const showPickerModal = ref(false);
let data = reactive({
    pokedex: Array<any>()
});

const pokedata: Array<any> = await fetch('http://localhost:5000/api/Pokemon').then(response => response.json());
data.pokedex = await fetch('http://localhost:5000/api/Pokemon/Pokedex').then(response => response.json())

function updatePokedex(newdex: any) {
    data.pokedex = newdex;
}

const pokedexPokemonDetails = computed(
    () => { return pokedata.filter(x => data.pokedex.some(y => y.id === x.id)) },
);
</script>

<template>
<h2>Your pokedex</h2>
<b>Click the grey card to add some more!</b>
    <pokemon-grid @pokedex-update="updatePokedex" :pokedata="pokedexPokemonDetails" :show-delete-button="true" :show-empty-card="true" @empty-card-click="showPickerModal = true">
    </pokemon-grid>
    <modal-dialog :showModal="showPickerModal" @close-modal="showPickerModal = false">
    <template #header>
        <h1>Pick some pokemon</h1>
    </template>
        <pokemon-grid @pokedex-update="updatePokedex" :pokedata="pokedata" :pokedex="data.pokedex" :show-add-button="true" :show-caught-overlay="true">
        </pokemon-grid>
    </modal-dialog>
</template>

<style lang="scss">

</style>