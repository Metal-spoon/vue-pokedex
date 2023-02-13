<script setup lang="ts">
import ModalDialog from './ModalDialog.vue';
import { computed, reactive, ref, watch } from 'vue';
import PokemonGrid from './PokemonGrid.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const showPickerModal = ref(false);
let data = reactive({
    pokedex: Array<any>()
});

let pokedata: Array<any> = [];

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
      console.log(result.data.pokemon)
      result.data.pokemon.forEach((pokemon: any) => {
        pokemon.pokemon_v2_pokemons[0].sprites[0].sprites = JSON.parse(pokemon.pokemon_v2_pokemons[0].sprites[0].sprites)
      });
      console.log(result.data.pokemon)
      pokedata = result.data.pokemon
    })

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

<style lang="scss">

</style>