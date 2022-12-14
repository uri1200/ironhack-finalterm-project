<template>
  <header class="bg-slate-700">
    <nav class="py-3 px-4 flex m-0 justify-between items-center align-center">
      <div class="w-16">
        <!-- Welcome -->
        <!-- <p class="hidden md:block font-dosis text-lg text-white">Hello, {{mailWithoutClient[0]}}!</p> -->
        <img class="rounded-full" src="..\assets\logo.png" alt="" />
      </div>
      <div
        class="flex flex-row text-slate-700 text-4xl font-bold bg-slate-100 p-3 rounded-3xl"
      >
        <h1>ToDoApp</h1>
      </div>
      <div class="">
        <!-- Logout button -->
        <!-- <button class="font-dosis text-lg py-2 px-5 rounded-lg self-center 
        text-center hover:text-white hover:bg-red-500 duration-200 border-lg
        border-transparent hover:border-white bg-gray-200 text-gray-700" @click="signOut">Log out</button> -->
        <div class="flex flex-row font-dosis text-lg px-2 rounded-lg duration-200 bg-slate-100 items-center hover:bg-slate-300 text-slate-700">
          <button
            class=" mr-1 pb-2 hover:bg-slate-300 rounded-full text-center h-5"
            @click="signOut"
          >
            <fa icon="angle-down" />
          </button>
          <img class="w-10 p-1 rounded-full" src="..\assets\profile.webp" alt="" />
        </div>
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
const userFullEmail = useUserStore().user.email;

// constant that saves the user email and cleans out the @client from the user
const mailWithoutClient = userFullEmail.split("@");

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
  errorMsg.value = "error";
};
</script>
