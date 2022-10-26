<template>
  <n-config-provider :locale="frFR" :date-locale="dateFrFR">
    <n-message-provider>
      <TopBar v-if="route.name !== 'login'" />
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { frFR, dateFrFR } from 'naive-ui';
import { useRoute } from 'vue-router';
import TopBar from './components/TopBar.vue';

const route = useRoute()
</script>
