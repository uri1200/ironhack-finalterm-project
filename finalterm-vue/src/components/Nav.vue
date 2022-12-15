<template>
  <header class="bg-slate-700">
    <nav class="py-3 px-4 flex justify-between items-center align-center">
      <div class="w-16 hidden md:inline">
        <!-- Welcome -->
        <!-- <p class="hidden md:block font-dosis text-lg text-white">Hello, {{mailWithoutClient[0]}}!</p> -->
        <img class="rounded-full" src="..\assets\logo.png" alt="" />
      </div>
      <div
        class="text-slate-700 text-4xl font-bold bg-slate-100 p-3 rounded-3xl ml-3"
      >
        <h1>ToDoApp</h1>
      </div>
      <div class="">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-2 pt-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <fa
                class="pb-4 pt-2 px-2 h-4 w-4"
                aria-hidden="true"
                icon="angle-down"
              />
              <img
                class="w-8 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                alt=""
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <p
                    :class="[
                      active ? 'text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-lg',
                    ]"
                    class="font-bold"
                  >
                    Hello, {{ mailWithoutClient[0] }}
                  </p>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="/account"
                    :class="[
                      active ? 'bg-slate-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-md',
                    ]"
                    >Account settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? 'bg-slate-100' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-md',
                    ]"
                    class="text-red-500"
                    @click="signOut"
                  >
                    <fa class="w-[14px]" aria-hidden="true" icon="sign-out" />
                    Sign out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
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
