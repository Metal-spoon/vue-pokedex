<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    },
})

let showStats = ref(false)

function format(text: string) {
    text = text.replace(/[-]/g, ' ');
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
}

function parseSpriteUri(spriteUri: string) {
    //TODO: move into environment variable
    spriteUri = spriteUri.replace(/\/media\//g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/");
    return spriteUri;
}
</script>

<template>
        <div class="pokemon-card">
            <span class="pokemon-id">#{{pokemon.id}}</span>
            <img :src="parseSpriteUri(pokemon.pokemon_v2_pokemons[0].sprites[0].sprites.front_default)" width="96" />
            <b>Info</b>
            <table class="pokemon-info">
                <tr>
                    <td>Name:</td>
                    <td>{{ format(pokemon.name) }}</td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td>{{ pokemon.weight }}</td>
                </tr>
            </table>
            <div class="stats-header" @click="showStats = !showStats">
                <span>Stats</span>
                <font-awesome-icon :icon="showStats ? 'fa-angle-down' : 'fa-angle-right'" />
            </div>
            <table v-show="showStats" class="pokemon-info">
                <tr v-for="stat in pokemon.stats">
                    <td>{{ format(stat.stat.name) }}</td>
                    <td>{{ stat.base_stat }}</td>
                </tr>
            </table>
            <slot name="controls"></slot>
        </div>

</template>

<style scoped lang="scss">
.pokemon-card {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    color: rgb(75, 75, 75);
    border: 1px solid rgb(129, 126, 126);
    align-items: center;
    min-width: 150px;
    position: relative;
}

.pokemon-id {
    position: absolute;
    top: 5px;
    right: 10px;
    font-weight: bold;
}

.pokemon-info {
    text-align: left;
    border-spacing: 0px;
    >tr:nth-child(odd) {
        background-color: darken(white, 30);
        >td {
            padding: 0;
        }
    }
    >tr {
        >td:nth-child(2) {
            text-align: right;
        }
    }
    width: 100%;
}

.stats-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        color: lighten(rgb(75, 75, 75), 20);
    }
}

</style>