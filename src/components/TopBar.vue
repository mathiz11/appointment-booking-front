<template>
    <n-space justify="space-between" align="center" class="navbar">
        <n-space :internal-use-gap="false">
            <RouterLink v-for="menuItem in menuItems" :key="menuItem.to.name" :to="menuItem.to" class="navbar-link">
                <n-icon size="22" :component="menuItem.icon" />
                <span>{{ menuItem.text }}</span>
            </RouterLink>
        </n-space>
        <button class="logout-button" @click="logout">
            <n-icon size="22" :component="LogOutOutline" />
        </button>
    </n-space>
</template>

<script setup lang="ts">
import localStorageService from '@/services/localStorageService';
import { HomeOutline, LogOutOutline, SettingsOutline } from '@vicons/ionicons5';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()
const menuItems = [
    {
        to: { name: 'home' },
        text: "Accueil",
        icon: HomeOutline
    },
    {
        to: { name: 'settings' },
        text: "Réglages",
        icon: SettingsOutline
    },
]

const logout = () => {
    localStorageService.removeUser()
    router.push({ name: 'login' })
}

</script>

<style>
.navbar {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0.5rem 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: white;
}

.navbar-link {
    display: flex;
    align-items: center;
    color: #000;
    text-decoration: none;
    padding: 0.5rem 1rem;
}

.navbar-link>span {
    margin-left: 0.5rem;
}

.logout-button {
    border: none;
    background-color: #fff;
    color: #d03050;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
}
</style>