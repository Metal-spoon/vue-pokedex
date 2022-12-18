<script setup lang="ts">
import { overlay } from '../models/overlay';

const props = defineProps({
    overlay: {
        type: overlay
        
    }
})

const emit = defineEmits(['close-overlay'])
</script>

<template>
    <div class="overlay" v-if="props.overlay">
        <font-awesome-icon :class="{ spin: props.overlay.icon === 'fa-spinner' }" size="4x" :icon="props.overlay.icon" />
        <span>{{ props.overlay.message }}</span>
        <div class="overlay-close-button" v-if="props.overlay.removeable" @click="emit('close-overlay')">
            <font-awesome-icon @click="emit('close-overlay')" size="2x" icon="fa-solid fa-xmark" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    position: absolute;
    top: -1px;
    left: -1px;
    background-color: rgba(black, 0.7);
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 10px;
    border: 1px solid rgba(black, 0.7);
    flex-direction: column;
    text-align: center;
}

.overlay-close-button {
    position: absolute;
    top: 0;
    right: 10px;
    &:hover {
        cursor: pointer;
        color: darken(white, 20);
    }

}
</style>