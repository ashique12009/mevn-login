<template>
<div class="bg-green-300 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-lightgreen-700 mb-6">Login</h2>
        <form action="#" method="POST">
            <div class="mb-4">
                <label for="email" class="block text-lightgreen-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lightgreen-400 focus:outline-none">
            </div>
            <div class="mb-4">
                <label for="password" class="block text-lightgreen-700 font-medium mb-2">Password</label>
                <input type="password" id="password" name="password" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lightgreen-400 focus:outline-none">
            </div>
            <div class="mb-4">
                <button type="submit" 
                    class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-lightgreen-700 focus:ring-2 focus:ring-lightgreen-400">
                    Login
                </button>
            </div>
        </form>
        <p class="text-center text-sm text-lightgreen-600">
            Don't have an account? <a href="#" class="text-lightgreen-700 font-medium hover:underline">Sign up</a>
        </p>
    </div>
</div>
</template>

<script setup>

</script>