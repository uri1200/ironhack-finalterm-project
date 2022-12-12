<template>
    <p>{{counterStore.count}}</p>
    <!-- Hace exactamente lo mismo que la línea anterior -->
    <!-- <p>{{useCounterStore().count}}</p> -->
    <button @click="counterStore.decrease">-</button>
    <button @click="counterStore.increase">+</button>
    <p>Lo mismo pero con una sola función en la store</p>
    <button @click="counterStore.changeCount(-1)">-</button>
    <button @click="counterStore.changeCount(1)">+</button>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();

</script>

<style>

</style>