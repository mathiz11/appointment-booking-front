<template>
    <n-spin :show="false">
        <h2>Horaires plannifié(s)</h2>
        <n-date-picker :value="props.timestamp"
            @update:value="(value: number | null) => $emit('update:timestamp', value)" type="date" class="mb-m" />

        <n-empty v-if="!props.timeRanges.length" description="Aucun horaire n'a été trouvé pour ce jour" class="py-m">
            <template #icon>
                <n-icon :component="TimeOutline" />
            </template>
        </n-empty>
        <n-space v-else v-for="timeRange in props.timeRanges" :key="timeRange.id" justify="center" align="center">
            <span>{{ dateUtil.formatTimeFromString(timeRange.startDate) }}</span>
            <n-icon size="18" :component="ArrowForwardOutline" />
            <span>{{ dateUtil.formatTimeFromString(timeRange.endDate) }}</span>
        </n-space>

        <n-space justify="center" class="pt-m">
            <n-button type="primary" @click="modal.show = true">Ajouter</n-button>
        </n-space>
        <time-range-creation-modal :show="modal.show" :is-submitting="modal.isSubmitting" @close="modal.show = false"
            @confirm="createTimeRange" :timestamp="timestamp" />
    </n-spin>

</template>

<script setup lang="ts">
import TimeRangeCreationModal from '@/components/TimeRangeCreationModal.vue';
import { ERROR_MESSAGE_OPTIONS } from '@/services/globalService';
import type { TimeRange } from '@/services/timeRangeService';
import timeRangeService from '@/services/timeRangeService';
import { useStoreStore } from '@/stores/store';
import dateUtil from '@/utils/dateUtil';
import { ArrowForwardOutline, TimeOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import { ref } from 'vue';
type CustomCalendarProps = {
    timeRanges: TimeRange[],
    timestamp: number,
}

defineExpose({ dateUtil })
const emits = defineEmits(['update:timestamp', 'updateTimeRanges'])
const props = defineProps<CustomCalendarProps>()
const modal = ref({ show: false, isSubmitting: false })
const { store } = useStoreStore()
const message = useMessage()

async function createTimeRange(timeRange: { startDate: number, endDate: number }) {
    try {
        modal.value.isSubmitting = true
        await timeRangeService.create({
            startDate: new Date(timeRange.startDate),
            endDate: new Date(timeRange.endDate),
            storeId: store ? store.id : null,
            reservationId: null
        } as TimeRange)
        emits('updateTimeRanges')
    } catch (error) {
        if (error instanceof Error) {
            message.error(error.message, ERROR_MESSAGE_OPTIONS)
        }
    } finally {
        modal.value = {
            show: false,
            isSubmitting: false
        }
    }
}
</script>

