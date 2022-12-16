<template>

  <div class="h-screen flex imagen">
    <div
      class="flex p-16 justify-center items-center rounded-xl bg-white m-auto"
    >
      <form class="bg-white">
        <h1 class="text-gray-800 text-center font-bold text-2xl mb-4">
          TodoApp
        </h1>
        <p class="text-sm font-normal text-center text-gray-600 mb-7">
          Welcome Back :)
        </p>
        <p v-show="errorMsg" class="error-msg text-red-500 text-center">
          {{ errorMsg }}
        </p>
        <form @submit.prevent="signIn" class="form-sign-in">
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              class="input-field pl-2 outline-none border-none"
              type="email"
              placeholder="Email Address"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              :type="passwordFieldType"
              class="input-field pl-2 outline-none border-none"
              placeholder="Password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-blue-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
        </form>
        <span class="text-sm ml-2 mb-7 hover:text-blue-500 cursor-pointer"
          >Forgot Password ?</span
        >
        <p class="text-center mt-4">Dont have an account?</p>
        <p class="text-center text-lg">
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link hover:text-blue-500"
          />
        </p>
      </form>
    </div>
  </div>
  >
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const changePasswordFieldValue = () => {
  hidePassword.value = !hidePassword.value;
};

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style scoped>
.imagen {
  background-image: url("https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/06/post-it-2382319.jpg?tf=1200x");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
