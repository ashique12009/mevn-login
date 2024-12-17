<template>
    <div class="bg-green-300 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-lightgreen-700 mb-6">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="block text-lightgreen-700 font-medium mb-2">Email</label>
                    <input type="email" id="email" name="email" v-model="email" 
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lightgreen-400 focus:outline-none">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-lightgreen-700 font-medium mb-2">Password</label>
                    <input type="password" id="password" name="password" v-model="password" 
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lightgreen-400 focus:outline-none">
                </div>
                <div class="mb-4">
                    <span v-if="isLoading">Logging in...</span>
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400">
                        Login
                    </button>
                </div>
            </form>
            <p class="text-center text-sm text-lightgreen-600">
                Don't have an account? <a href="#" class="text-green-700 font-medium hover:underline">Sign up</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = ""; // Clear previous error message

    try {
        const response = await fetch("http://localhost:5001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const responseStatus = response.status;

        const data = await response.json();

        if (responseStatus === 200) {
            // Store the authentication token in local storage
            localStorage.setItem("authToken", data.token);

            // Redirect to the Dashboard page on successful login
            router.push("/dashboard");
        } else {
            // Handle errors like invalid credentials or user not found
            errorMessage.value = data.message || "Login failed. Please try again.";
        }
    } catch (error) {
        // Handle server errors
        errorMessage.value = "An error occurred. Please try again later.";
    } finally {
        isLoading.value = false; // Stop loading spinner
    }
};
</script>