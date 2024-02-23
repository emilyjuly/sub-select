<template>
  <div class="map">
    <LMap
        v-if="store.location.length > 0"
        ref="map"
        :center="store.location"
        :zoom="zoom"
    >
      <LTileLayer
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LMarker :lat-lng="store.location">
        <LIcon :icon-size="iconSize" :icon-url="'/favicon.ico'"/>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useSubSelectStore} from "~/store/subSelect";

const zoom = ref(15)
const store = useSubSelectStore()
const iconSize = [60, 60]
const map = ref(true)

onMounted(() => {
  store.changeLocation()
})
</script>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
</style>
