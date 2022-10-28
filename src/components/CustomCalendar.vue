<template>
    <n-spin :show="false">
        <n-date-picker :value="props.timestamp"
            @update:value="(value: number | null) => $emit('update:timestamp', value)" type="date" class="mb-s" />

        <n-empty v-if="!props.timeRanges.length" description="Aucun horaire n'a été trouvé pour ce jour" class="py-m">
            <template #icon>
                <n-icon :component="TimeOutline" />
            </template>
        </n-empty>
        <n-space v-else v-for="timeRange in props.timeRanges" :key="timeRange.id" justify="center" align="center"
            style="position: relative;" class="py-s">
            <span class="font-m">{{ dateUtil.formatTimeFromString(timeRange.startDate) }}</span>
            <n-icon size="18" :component="ArrowForwardOutline" class="mx-s" />
            <span class="font-m">{{ dateUtil.formatTimeFromString(timeRange.endDate) }}</span>
            <n-button tertiary circle type="error" @click="() => deleteTimeRange(timeRange)" class="delete-button ml-m">
                <template #icon>
                    <n-icon size="16" :component="TrashOutline"></n-icon>
                </template>
            </n-button>
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
import { ERROR_MESSAGE_OPTIONS, SUCCESS_MESSAGE_OPTIONS } from '@/services/globalService';
import type { TimeRange } from '@/services/timeRangeService';
import timeRangeService from '@/services/timeRangeService';
import { useStoreStore } from '@/stores/store';
import dateUtil from '@/utils/dateUtil';
import { ArrowForwardOutline, TimeOutline, TrashOutline } from '@vicons/ionicons5';
import { useDialog, useMessage } from 'naive-ui';
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
const dialog = useDialog()

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
        message.success("L'horaire a bien été créé.", SUCCESS_MESSAGE_OPTIONS)
    }
}

function deleteTimeRange(timeRange: TimeRange) {
    dialog.error({
        title: 'Suppression',
        content: `Voulez-vous vraiment supprimer l'horaire de ${dateUtil.formatTimeFromString(timeRange.startDate)} à ${dateUtil.formatTimeFromString(timeRange.endDate)} ?`,
        positiveText: 'Oui',
        negativeText: 'Annuler',
        onPositiveClick: async () => {
            try {
                modal.value.isSubmitting = true
                await timeRangeService.remove(timeRange.id!)
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
                message.success("L'horaire a bien été supprimé.", SUCCESS_MESSAGE_OPTIONS)
            }
        },
    })
}
</script>

<style>
.delete-button {
    position: absolute;
    top: 0.25rem;
    right: 0;
}
</style>
