<script setup lang="ts">
import {ref} from "vue";
import {useSubSelectStore} from "~/store/subSelect";

const store = useSubSelectStore()
const showSelectState = ref(false)
const showSelectRegion = ref(false)

onMounted(() => {
    store.getCities()
})
</script>

<template>
    <Card class="card">
        <template #title>Sub-Select</template>
        <template #content>
            <div class="flex flex-column">
                <span class="mb-5">Deseja escolher alguma característica da cidade?</span>
                <div class="flex mb-5 w-full justify-content-between">
                    <div class="flex flex-column w-5">
                        <span class="flex mb-3">
                            <Checkbox v-model="showSelectState" :binary="true"/>
                            <label for="state" class="ml-2"> Estado </label>
                        </span>
                        <Dropdown v-model="store.filters.state" v-if="showSelectState" :options="store.states" placeholder="Estado" class="mb-3" @change="store.getCities"/>
                    </div>
                    <div class="flex flex-column w-5">
                        <span class="flex mb-3">
                            <Checkbox v-model="showSelectRegion" :binary="true"/>
                            <label for="region" class="ml-2"> Região </label>
                        </span>
                        <Dropdown v-model="store.filters.region" v-if="showSelectRegion" :options="store.regions" placeholder="Região" class="mb-3" @change="store.getCities"/>
                    </div>
                </div>
                <Dropdown v-model="store.citySelect" :options="store.filteredCities" option-label="nome" placeholder="Selecione uma cidade" class="w-full" @change="store.changeLocation"/>
            </div>
        </template>
    </Card>
</template>

<style scoped>

.card {
    width: 50vw;
    position: absolute;
    z-index: 2;
}

@media (max-width: 500px) {
    .card {
        width: 80vw;
        font-size: 12px;
    }
}

</style>