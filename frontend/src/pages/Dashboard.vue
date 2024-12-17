<template>
    <div class="inner-pages">
        <nav>
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/" @click="logout">Logout</router-link>
        </nav>
        <h1>Dashboard</h1>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    }
</script>

<style lang="scss" scoped>

</style>