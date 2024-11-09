<script setup>
import { ref } from "vue";
const showMenu = ref(true);
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            @click="showMenu = !showMenu"
            icon="$vuetify"
          ></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Дневник на оператора</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="showMenu">
        <v-list>
          <v-list-item to="/logs" title="Обходи"></v-list-item>
          <v-list-item to="/new-log" title="Нов обход"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="padding-left: 0;">
        <v-container style="padding: 0">
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>

  <!-- <v-app full-height> -->
  <!-- <v-app-bar :elevation="2">
      <v-icon
        @click="showMenu = !showMenu"
        class="ml-10"
        icon="$vuetify"
      ></v-icon>

      <v-app-bar-title>Дневник на оператора</v-app-bar-title>
    </v-app-bar> -->
  <!-- <v-main width="100%" style="background-color: red;">dsadasdsadasdasdadasdassadadasdasdadadasdasdasd</v-main> -->
  <!-- <div style="background-color: red;">dsa</div> -->
  <!-- <v-main class="main"> 
      <router-view></router-view>
      <v-navigation-drawer v-model="showMenu">
        <div class="mt-5">
          <v-btn variant="text" to="/logs" @click="showMenu = false"
            >Обходи</v-btn
          >
        </div>
        <div>
          <v-btn variant="text" to="/new-log" @click="showMenu = false"
            >Нов обход</v-btn
          >
        </div>
      </v-navigation-drawer>
    </v-main> -->
  <!-- </v-app> -->
</template>

<style >
.v-field__field {
  font-size: x-large;
  width: 200px;
}
.v-container {
  padding: 0;
}
#app {
  padding: 0;
}
main {
  /* background-image: url("./assets/substation.jpg"); */
  background-color: rgba(76, 175, 80, 0.1);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  
  /* max-width: 1200px; */
}
</style>
