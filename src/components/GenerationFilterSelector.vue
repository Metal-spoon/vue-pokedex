<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { reactive } from 'vue';
import DropDownSelector from './DropDownSelector.vue';


let data = reactive({
    filterOptions: Array<any>()
})

useQuery(gql`
    query generationQuery {
        generations: pokemon_v2_generation {
        name
        id
}
    }
`).onResult((result) => {
    data.filterOptions = result.data.generations.map((generation: any) => {
        const filterOption = 
            {
            id: generation.id, 
            label: generation.name
            }
        return filterOption;
    });
})
</script>

<template>
    <DropDownSelector :options="data.filterOptions" label="Generations"/>
</template>

<style lang="scss">

</style>