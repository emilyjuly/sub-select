<script setup lang="ts">
import SubSelectCard from "~/components/card/SubSelectCard.vue";
import LeafletMap from "~/components/map/LeafletMap.vue";
</script>

<template>
    <header class="flex justify-content-center">
        <sub-select-card/>
    </header>
    <section class="relative z-1">
        <LeafletMap/>
    </section>
</template>