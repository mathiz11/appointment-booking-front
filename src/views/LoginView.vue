<template>
    <main>
        <h1 class="text-center">Connexion</h1>
        <n-form ref="formRef" :model="formValues" :rules="rules" @keydown.enter="handleSubmit"
            class="form-container mx-auto">
            <n-form-item label="Email" path="email">
                <n-input v-model:value="formValues.email" placeholder="" />
            </n-form-item>
            <n-form-item label="Mot de passe" path="password">
                <n-input type="password" v-model:value="formValues.password" placeholder="" />
            </n-form-item>
            <n-space justify="center">
                <n-button type="primary" @click="handleSubmit" :loading="isSubmitting">
                    Se connecter
                </n-button>
            </n-space>
        </n-form>
    </main>
</template>

<script setup lang="ts">
import { ERROR_MESSAGE_OPTIONS } from "@/services/globalService";
import authService from "@/services/userService";
import { useUserStore } from "@/stores/user";
import { NButton, NForm, NFormItem, NInput, useMessage, type FormInst, type FormItemRule, type FormRules } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const message = useMessage()
const router = useRouter()
const { setUser } = useUserStore();
const isSubmitting = ref(false)
const formRef = ref<FormInst | null>(null)
const formValues = ref({
    email: '',
    password: ''
})
const rules: FormRules = {
    email: {
        required: true,
        validator: (_: FormItemRule, value: string) => {
            if (!value) {
                return new Error("Ce champ est obligatoire.")
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
                return new Error("L'email n'est pas valide.")
            }

            return true;
        },
        trigger: 'blur'
    },
    password: {
        required: true,
        message: 'Ce champ est obligatoire.',
        trigger: 'blur'
    }
}

function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            isSubmitting.value = true
            try {
                const { email, password } = formValues.value
                const result = await authService.login(email, password)
                if (result.data) {
                    setUser(result.data)
                    router.push({ name: 'home' })
                }
            } catch (error) {
                if (error instanceof Error) {
                    message.error(error.message, ERROR_MESSAGE_OPTIONS)
                }
            } finally {
                isSubmitting.value = false
            }
        }
    })
}

</script>
