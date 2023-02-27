<script setup lang="ts">
import { reactive } from 'vue';
import { overlay } from '../models/overlay';
import PokedexAddButton from './PokedexAddButton.vue';
import PokedexDeleteButton from './PokedexDeleteButton.vue';
import PokemonCard from './PokemonCard.vue';
import CardOverlay from './CardOverlay.vue';

const props = defineProps({
    pokedata: {
        type: Array<any>,
        required: true
    },
    pokedex: {
        type: Array<number>,
        required: false,
        default: []
    },
    showAddButton: {
        type: Boolean,
        required: false,
        default: false
    },
    showDeleteButton: {
        type: Boolean,
        required: false,
        default: false
    },
    showCaughtOverlay: {
        type: Boolean,
        required: false,
        default: false
    },
    showEmptyCard: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emit = defineEmits<{
    (e: 'pokedex-update', value: any): void
    (e: 'empty-card-click'): void
}>()

let data = reactive({
    cardsWithOverlay: Array<overlay>()
})

async function handleUpdate(newDex: Array<number>, caller: number) {
    removeOverlay(caller);
    emit('pokedex-update', newDex);
}

function isInDex(pokemonId: number) {
    return props.pokedex.some((x) => x === pokemonId)
}

function addOverlay(pokemonId: number, message: string, icon: string, removeable: boolean) {
    data.cardsWithOverlay.push(new overlay(pokemonId, message, icon, removeable));
}

function showOverlay(pokemonId: number) {
    return data.cardsWithOverlay.some((x) => x.id === pokemonId)
}

function removeOverlay(pokemonId: number) {
    data.cardsWithOverlay = data.cardsWithOverlay.filter((x) => x.id != pokemonId)
}

function getOverlay(pokemonId: number) {
    return data.cardsWithOverlay.find((x) => x.id === pokemonId)
}

/*
* To make the animations smoother, elements that are leaving need to be taken out of the document flow with position absolute.
* Position absolute defaults to the top left of the parent container, in this case: the grid
* This function gets called when an element is leaving and sets its absolute position to where it was when it was still in the document flow, ensuring a smooth animation
*/
function beforeLeave(el: any) {
    const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)
    el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`
    el.style.width = width
    el.style.height = height
}

const caughtOverlay: overlay = new overlay(0, 'Caught!', 'fa-check', false)

</script>

<template>

    <transition-group name="grid" tag="div" class="pokemon-grid" @before-leave='beforeLeave'>
        <pokemon-card :pokemon="pokemon" v-for="pokemon in pokedata" :key="pokemon.id">
            <template v-slot:controls>
                <pokedex-add-button v-if="showAddButton" @response-received="handleUpdate"
                    @start-spinner="addOverlay(pokemon.id, '', 'fa-spinner', false)" :pokemon-id="pokemon.id" />
                <pokedex-delete-button v-if="showDeleteButton" @response-received="handleUpdate"
                    @start-spinner="addOverlay(pokemon.id, '', 'fa-spinner', false)" :pokemon-id="pokemon.id" />
                <card-overlay :overlay="caughtOverlay" v-if="isInDex(pokemon.id) && showCaughtOverlay" />
                <card-overlay v-else-if="showOverlay(pokemon.id)" :overlay="getOverlay(pokemon.id)"
                    @close-overlay="removeOverlay(pokemon.id)" />
            </template>
        </pokemon-card>
        <div v-if="showEmptyCard" class="empty-card" @click="emit('empty-card-click')" :key="'empty-card'">
            <font-awesome-icon size="4x" icon="fa-solid fa-plus" />
        </div>

    </transition-group>

</template>

<style scoped lang="scss">
.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 170px);
    width: 100%;
    justify-content: center;
    gap: 10px;
    align-items: start;
    align-content: start;
    position: relative;
}

.empty-card {
    display: flex;
    background-color: rgba(gray, 0.5);
    border: 4px solid lighten(rgba(gray, 0.5), 20);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 254px;

    &:hover {
        cursor: pointer;
        background-color: lighten(rgba(gray, 0.5), 10);
        ;
    }
}

.grid-move,
.grid-enter-active,
.grid-leave-active {
    transition: all 0.5s ease;
}

.grid-enter-from,
.grid-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.grid-leave-active {
    position: absolute;
}
</style>