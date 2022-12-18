<script setup lang="ts">
    const props = defineProps({
        showModal: {
            type: Boolean,
            required: true
        }
    }) 

    const emit = defineEmits(['close-modal'])
</script>

<template>
<transition tag="div" name="modal" >
<div v-show="showModal" class="modal-wrapper">
<div @click="emit('close-modal')" class="close-button">
    <font-awesome-icon :fixedWidth="true" size="2x" icon="fa-solid fa-xmark" />
</div>
<div class="modal-header"></div>
    <div class="modal-content">
        <slot name="header"></slot>
        <slot></slot>
    </div>
</div>
</transition>

</template>

<style scoped lang="scss">
    .close-button {
        position: absolute;
        top: 10px;
        right: 20px;
        background-color: red;
        padding: 10px;
        border-radius: 100%;
        z-index: 999;
        display: flex;
        >svg {
            width: 1.25em;
            height: 1.25em;
        }
        &:hover {
            background-color: lighten(red, 30);
            cursor: pointer;
        }
    }
    .modal-wrapper {
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        background-color:#242424;
        top: 0;
        left: 0;
        max-height: 100vh;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: auto;
        align-items: center;
    }

    .modal-header {
        display: flex;
        align-self: flex-end;
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.5s ease;
        transform-origin: left top;
    }

    .modal-enter-from,
    .modal-leave-to {
        transform-origin: left top;
        transform: translateY(-100vh);
    }

    
</style>