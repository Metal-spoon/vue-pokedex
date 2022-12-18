<script async setup lang="ts">
const props = defineProps({
    pokemonId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'response-received', response: Response, caller: number): void
    (e: 'start-spinner', caller: number): void
}>()

async function deletePokemon() {
    emit('start-spinner', props.pokemonId)
    await fetch('http://localhost:5000/api/Pokemon/' + props.pokemonId + '/pokedex', {method: 'DELETE'}).then(res => emit('response-received', res, props.pokemonId));
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