<template>
  <v-card color="silver" style="opacity: 0.8" class="pa-4 card">
    <v-card-title>Всички обходи</v-card-title>
  
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel v-for="(log, index) in logs" :key="index">
          <v-expansion-panel-title>{{ log.datetime }}
            <v-icon class="ml-3 mr-3" color="red" v-if="log.note !== ''">mdi-note-alert-outline</v-icon>
           
            
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <span>Околна темп.:{{ log.tAmb }} °C</span>
            </div>

            <span>Забележки:{{ log.note }}</span>
            <v-row>
              <v-col
                cols="12"
                v-for="(log, index) in log.machines"
                :key="index"
              >
                <h2>{{ log.name }}</h2>
                <v-row>
                  <v-col
                    cols="12"
                    lg="4"
                    v-for="(property, index) in log.properties"
                    :key="index"
                  >
                    <v-card class="ma-2" elevation="14">
                      <span>{{ property.name }}</span>
                      <span class="ml-2">{{ property.value }}</span>
                      <span class="ml-2">{{ property.unit }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-action>
      <!-- <v-btn variant="outlined" color="orange"> Опресни</v-btn> -->
    </v-card-action>
  </v-card>
</template>

<script setup>
import { firestore } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref } from "vue";
const logs = ref([]);
const loadLogs = async () => {
  const citiesCol = collection(firestore, "logs");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());

  logs.value = cityList
    .map((x) => JSON.parse(x.text))
    .sort(function (a, b) {
      return new Date(b.datetime) - new Date(a.datetime);
    });
};

loadLogs();
</script>

<style scoped>
.card {
  width: 100%;
}
span {
  font-size: large;
}
</style>