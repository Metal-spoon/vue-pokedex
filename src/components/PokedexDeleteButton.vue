<script async setup lang="ts">
import { json } from 'stream/consumers';

const props = defineProps({
    pokemonId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'response-received', response: Array<number>, caller: number): void
    (e: 'start-spinner', caller: number): void
}>()

async function deletePokemon() {
    emit('start-spinner', props.pokemonId)
    let dex: Array<number> = JSON.parse(localStorage.getItem("pokedex") || "");
    const updatedDex: Array<number> = dex.filter(x => x !== props.pokemonId)
    localStorage.setItem("pokedex", JSON.stringify(updatedDex))
    emit('response-received', updatedDex, props.pokemonId)
}
</script>

<template>
    <div class="delete-button" @click="deletePokemon()">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
    </div>
</template>

<style scoped lang="scss">
    .delete-button {
        display: flex;
        background-color: #F8D7DA;
        color: darken(#F8D7DA, 30);
        border: 1px solid darken(#F8D7DA, 20);
        padding: 10px;
        border-radius: 5px;
        &:hover {
            cursor: pointer;
            background-color: darken(#F8D7DA, 10);
        }
        >svg {
            width: 1em;
            height: 1em;
        }
    }
</style>