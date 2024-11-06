<script setup>
import { ref } from "vue";
const showMenu = ref(true);
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
     
     <v-icon @click="showMenu = !showMenu"  class="ml-10" icon="$vuetify"></v-icon>

      <v-app-bar-title>Дневник на оператора</v-app-bar-title>
    </v-app-bar>

    <v-main class="main">
   
      <router-view></router-view>
      <v-navigation-drawer v-model="showMenu">
        <div class="mt-5">
          <v-btn variant="text" to="/logs"  @click="showMenu = false">Обходи</v-btn>
        </div>
        <div>
          <v-btn variant="text" to="/new-log" @click="showMenu = false">Нов обход</v-btn>
        </div>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<style >
.main {
  background-image: url("./assets/substation.jpg");
  background-color: rgba(76, 175, 80, 0.3);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  
  /* max-width: 1200px; */
}
</style>
