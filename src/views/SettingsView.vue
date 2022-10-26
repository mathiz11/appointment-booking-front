<template>
    <main>
        <h1>Emploi du temps</h1>
        <custom-calendar :timeRanges="timeRanges" v-model:timestamp="timestamp" @updateTimeRanges="updateTimeRanges" />
    </main>
</template>

<script setup lang="ts">
import CustomCalendar from '@/components/CustomCalendar.vue';
import { ERROR_MESSAGE_OPTIONS } from '@/services/globalService';
import timeRangeService, { type TimeRange } from '@/services/timeRangeService';
import { useStoreStore } from '@/stores/store';
import { useMessage } from 'naive-ui';
import { onBeforeMount, ref, watch } from 'vue';

const { store } = useStoreStore()
const message = useMessage()
const timestamp = ref(Date.now())
const timeRanges = ref<TimeRange[]>([])

async function updateTimeRanges() {
    if (store) {
        try {
            const result = await timeRangeService.getAllByDate(
                new Date(timestamp.value),
                { storeId: store.id }
            )
            if (result.data) {
                timeRanges.value = result.data
            }
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message, ERROR_MESSAGE_OPTIONS)
            }
        }
    }
}

onBeforeMount(async () => {
    await updateTimeRanges()
})

watch(timestamp, async () => {
    await updateTimeRanges()
})
</script>