<template>
    <n-modal :show="props.show" @close="$emit('close')" preset="card" title="Ajouter horaire">
        <n-space align="center" justify="space-between" class="mt-m">
            <n-time-picker v-model:value="timeRange.startDate" format="HH:mm" :actions="['confirm']"></n-time-picker>
            <n-icon size="18" :component="ArrowForwardOutline"></n-icon>
            <n-time-picker v-model:value="timeRange.endDate" format="HH:mm" :actions="['confirm']">
            </n-time-picker>
        </n-space>
        <n-space justify="end" class="mt-m">
            <n-button type="primary" @click="$emit('confirm', timeRange)" :loading="props.isSubmitting" class="ml-auto">
                Ajouter</n-button>
        </n-space>
    </n-modal>
</template>

<script setup lang="ts">
import { ArrowForwardOutline } from "@vicons/ionicons5";
import { ref } from 'vue';

type TimeRangeCreationModalProps = {
    show: boolean
    isSubmitting: boolean
    timestamp: number
}

defineEmits(['close', 'confirm'])
const props = defineProps<TimeRangeCreationModalProps>()
const date = new Date(props.timestamp)
const timeRange = ref({
    startDate: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        9,
        0
    ).valueOf(),
    endDate: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
        0
    ).valueOf()
})
</script>