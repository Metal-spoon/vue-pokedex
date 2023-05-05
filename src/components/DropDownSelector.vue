<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';

const props = defineProps({
    options: {
        required: true,
        type: Array<any>
    },
    label: {
        required: true,
        type: String
    }
})

let showOptions = ref(false);

</script>

<template>
<div class="dropdown-container">
<div class="dropdown" @click="showOptions = !showOptions ">
    <span>{{props.label}}</span>
    <font-awesome-icon :class="[showOptions ? 'dropdown-shown' : 'dropdown-hidden', 'dropdown-icon'] " icon="fa-solid fa-circle-arrow-right"/>
</div>
<transition name="dropdown-list">
<ul class="dropdown-options" v-show="showOptions">
    <li class="dropdown-option" v-for="option in props.options">
        <span>{{option.label}}</span>
        <input type="checkbox"/>
    </li>
</ul>
</transition>
</div>
</template>

<style lang="scss">

    .dropdown-shown {
        transform: rotate(90deg);
        transition: all 0.3s linear;
    }

    .dropdown-hidden {
        transform: rotate(0deg);
    }


    .dropdown-list-enter-active {
        transition: all 0.3s linear;
        transform-origin: top center;
    }


    .dropdown-list-enter-from,
    .dropdown-list-leave-to {
        transform: scaleY(0);
    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        &:hover {
            cursor: pointer;
        }
        gap: 10px;
        padding: 5px;
        background-color: gray;
        color: white;
        border: 2px solid lightgray
    }

    .dropdown-options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        list-style: none;
        background-color: gray;
        color: white;
        display: flex;
        flex-direction: column;
        z-index: 999;
        margin: 0;
        padding: 0;
    }

    .dropdown-container {
        position: relative;
    }

    .dropdown-option {
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>