<template>
  <Nav />
  <!-- <h1>Name: {{ username }}</h1> -->
  <h1 class="text-2xl">Account: {{ userFullEmail }}</h1>
  <img
    :src="
      avatar_url
        ? avatar_url
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    "
    alt="Profile picture"
  />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const username = ref(null);
const avatar_url = ref(null);
const userFullEmail = useUserStore().user.email;

onMounted(() => {
  getProfile();
});

async function getProfile() {
  if (!userStore.profile) await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
}
</script>

<style>
/* img {
  width: 200px;
  border-radius: 50%;
} */
</style>
