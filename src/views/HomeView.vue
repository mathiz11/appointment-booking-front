<template>
  <main>
    <n-spin :show="!store">
      <h1>{{ store?.name }}</h1>
    </n-spin>
  </main>
</template>

<script setup lang="ts">
import { ERROR_MESSAGE_OPTIONS } from '@/services/globalService';
import storeService from '@/services/storeService';
import { USER_ROLE } from '@/services/userService';
import { useStoreStore } from '@/stores/store';
import { useMessage } from 'naive-ui';
import { onBeforeMount, toRefs } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const message = useMessage()
const storeStore = useStoreStore()
const { store } = toRefs(storeStore)

onBeforeMount(async () => {
  if (userStore.user?.role === USER_ROLE.PRO && !store.value) {
    try {
      const result = await storeService.getByUserId(userStore.user.id)
      if (result.data) {
        storeStore.setStore(result.data)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message, ERROR_MESSAGE_OPTIONS)
      }
    }
  }
})
</script>
