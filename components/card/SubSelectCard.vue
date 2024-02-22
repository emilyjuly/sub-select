<script setup lang="ts">
import {ref} from "vue";
import {useSubSelectStore} from "~/store/subSelect";

const store = useSubSelectStore()
const userSelect = ref()
const showSelectCity = ref(false)

onMounted(() => {
    store.getUsersWithFilters()
})
</script>

<template>
    <Card class="w-5">
        <template #title>Sub-Select</template>
        <template #content>
            <Divider layout="horizontal"/>
            <div class="flex flex-column">
                <span class="mb-5">Deseja escolher alguma característica do usuário?</span>
                <div class="flex mb-5">
                    <Checkbox v-model="showSelectCity" :binary="true"/>
                    <label for="cidade" class="ml-2"> Cidade </label>
                </div>
                <Dropdown v-model="store.filters.city" v-if="showSelectCity" :options="store.city" optionLabel="name" placeholder="Cidade" class="w-full mb-3" @change="store.getUsersWithFilters"/>
                <Dropdown v-model="userSelect" :options="store.filteredUsers" optionLabel="name" placeholder="Selecione um usuário" class="w-full"/>
            </div>
        </template>
    </Card>
</template>
