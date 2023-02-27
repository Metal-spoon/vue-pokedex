<script setup lang="ts">
import ModalDialog from './ModalDialog.vue';
import { computed, reactive, ref } from 'vue';
import PokemonGrid from './PokemonGrid.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Spinner from './Spinner.vue';

const showPickerModal = ref(false);
let isLoading = ref(true);

let data = reactive({
    pokedex: Array<number>()
});

let pokedata: Array<any> = [];

if (!localStorage.getItem("pokedex")) {
  localStorage.setItem("pokedex", "[]")
}

data.pokedex = JSON.parse(localStorage.getItem("pokedex") || "[]")

useQuery(gql`
      query pokedataQuery {
  pokemon: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-i"}}}, order_by: {id: asc}) {
    name
    id
    pokemon_v2_pokemons {
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          name
        }
        value: base_stat
      }
      weight
    }
  }
}
    `).onResult((result) => {
      result.data.pokemon.forEach((pokemon: any) => {
        pokemon.pokemon_v2_pokemons[0].sprites[0].sprites = JSON.parse(pokemon.pokemon_v2_pokemons[0].sprites[0].sprites)
      })
      pokedata = result.data.pokemon
      isLoading.value = false
    }
      
    )

function updatePokedex(newdex: any): void {
  
    data.pokedex = newdex;
}

const pokedexPokemonDetails = computed(
    () => { return pokedata.filter(x => data.pokedex.some(y => y === x.id)) },
);
</script>

<template>
  <spinner v-if="isLoading"/>
  <template v-else>
    <h2>Your pokedex</h2>
    <b>Click the grey card to add some more!</b>
    <pokemon-grid @pokedex-update="updatePokedex" :pokedata="pokedexPokemonDetails" :show-delete-button="true"
        :show-empty-card="true" @empty-card-click="showPickerModal = true">
    </pokemon-grid>
    <modal-dialog :showModal="showPickerModal" @close-modal="showPickerModal = false">
        <template #header>
            <h1>Pick some pokemon</h1>
        </template>
        <pokemon-grid @pokedex-update="updatePokedex" :pokedata="pokedata" :pokedex="data.pokedex"
            :show-add-button="true" :show-caught-overlay="true">
        </pokemon-grid>
    </modal-dialog>
  </template>
</template>

<style lang="scss">

</style>