<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
const showMenu = ref(true);
const { mobile } = useDisplay();
// onMounted(() => {
//   console.log(mobile.value); // false

// });
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-app-bar :elevation="2">
    
        <template v-if="!mobile">
          <v-btn to="/logs" class="ml-15">
            <v-icon>mdi-view-list</v-icon>

            Обходи
          </v-btn>

          <v-btn to="/new-log">
            <v-icon>mdi-plus</v-icon>

            Нов обход
          </v-btn>
        </template>
        <v-app-bar-title>Дневник на оператора</v-app-bar-title>
        <!-- <template v-slot:prepend v-if="!mobile">
          <v-app-bar-nav-icon
            @click="showMenu = !showMenu"
            icon="mdi-menu"
          ></v-app-bar-nav-icon>
        </template> -->
      </v-app-bar>

      <v-main style="padding-left: 0">
        <v-container style="padding: 0">
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-bottom-navigation
        v-if="mobile"
        grow
        v-model="value"
        color="primary"
        active
      >
        <v-btn to="/logs">
          <v-icon>mdi-view-list</v-icon>

          Обходи
        </v-btn>

        <v-btn to="/new-log">
          <v-icon>mdi-plus</v-icon>

          Нов обход
        </v-btn>
      </v-bottom-navigation>
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
