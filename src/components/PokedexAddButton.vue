<script async setup lang="ts">
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

async function addPokemon() {
    emit('start-spinner', props.pokemonId)
    let dex: Array<number> = JSON.parse(localStorage.getItem("pokedex") || "");
    dex.push(props.pokemonId);
    localStorage.setItem("pokedex", JSON.stringify(dex))
    emit('response-received', dex, props.pokemonId)
}
</script>

<template>
    <div class="add-button" @click="addPokemon()">
        <font-awesome-icon icon="fa-solid fa-plus" />
    </div>
</template>

<style scoped lang="scss">
    .add-button {
        display: flex;
        background-color: #dbf8d7;
        color: darken(#dbf8d7, 30);
        border: 1px solid darken(#dbf8d7, 20);
        padding: 10px;
        border-radius: 5px;
        &:hover {
            cursor: pointer;
            background-color: darken(#dbf8d7, 10);
        }
        >svg {
            width: 1em;
            height: 1em;
        }
    }
</style>