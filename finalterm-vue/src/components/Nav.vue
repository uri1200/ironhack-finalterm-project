<template>

  <header class="bg-violet-800 w-screen">
    
    <nav class="w-screen border-none py-5 px-4 flex m-0 justify-between items-center align-center">
      <div>
        <!-- Welcome -->        
        <p class="hidden md:block font-dosis text-lg text-white">Hello, {{mailWithoutClient[0]}}!</p>
      </div>
      <div class="text-white">
        <!-- Welcome -->        
        <h1> TodoApp </h1>
      </div>
      <div class="" >
        <!-- Logout button -->
        <button class="font-dosis text-lg py-3 px-8 rounded-lg self-center 
        text-center text-white bg-green-600 duration-200 border-lg
        border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700" @click="signOut">Log out</button>
      </div>
    
    </nav>

  </header>

</template>

<script setup>

import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, computed } from "vue";

// Error Message
const errorMsg = ref("");

//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();

// constant that calls user email from the useUserStore
const userFullEmail = useUserStore().user.email

// constant that saves the user email and cleans out the @client from the user
const mailWithoutClient = userFullEmail.split("@")

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = async () => {
    try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signOut();
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
    return;
  }
  errorMsg.value = 'error';
};

</script>