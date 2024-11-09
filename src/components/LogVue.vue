<template>
  <v-card color="silver" class="pa-0" style="opacity: 0.8" v-if="currentLog">
    <v-card-title
      ><span>Нов обход</span
      ><v-text-field
        label="Околна температура"
        v-model="currentLog.tAmb"
      ></v-text-field
    ></v-card-title>
    <v-card-text>
      <v-textarea label="Забележка" v-model="currentLog.note"></v-textarea>
      <v-card
        color="silver"
        style="opacity: 0.9"
        elevation="24"
        v-for="(machine, index) in currentLog.machines"
        :key="index"
      >
        <v-card-title>{{ machine.name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              lg="4"
              v-for="(property, index) in machine.properties"
              :key="index"
            >
              <div>
                <v-text-field
                  :prefix="property.unit"
                  :label="property.name"
                  :type="property.type"
                  v-model="property.value"
                >
                  <template #append>
                    <v-btn
                      size="large"
                      @click="
                        property.value = (
                          Number(property.value) + Number(property.step)
                        ).toFixed(1)
                      "
                      ><h2>+</h2></v-btn
                    >
                    <v-btn
                      size="large"
                      @click="
                        property.value = (
                          Number(property.value) - Number(property.step)
                        ).toFixed(1)
                      "
                      ><h2>-</h2></v-btn
                    >
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-action> </v-card-action>
      </v-card>
    </v-card-text>
    <v-card-action class="mb-16">
      <v-card class="pa-10">
        <v-btn
          size="x-large"
          variant="outlined"
          color="orange"
          :loading="loading"
          @click="addItem"
          >Запази</v-btn
        >
      </v-card>
    </v-card-action>
  </v-card>
  <Loader v-else></Loader>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCollection } from "vuefire";
import { firestore } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import moment from "moment";
import router from "../router/index";
import Loader from "./Loader.vue";
const log = ref({
  name: "Обход",
  note: "",
  tAmb: 10,
  machines: [
    {
      name: "AT701 Ф.А",

      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: 0,
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: 5,
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.4",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1.1",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "9",
          step: 1,
        },
      ],
    },
    {
      name: "AT701 Ф.В",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: -5,
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.45",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1.45",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "9",
          step: 1,
        },
      ],
    },
    {
      name: "AT701 Ф.С",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: 0,
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.1",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1.2",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "AT702 Ф.А",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "30",
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: "5",
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.75",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "42",
          step: 1,
        },
      ],
    },
    {
      name: "AT702 Ф.В",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: "30",
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.7",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1.5",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "32",
          step: 1,
        },
      ],
    },
    {
      name: "AT702 Ф.С",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "30",
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Налягане 400",
          type: "number",
          unit: "bar",
          value: "1.25",
          step: 0.1,
        },
        {
          name: "Налягане 220",
          type: "number",
          unit: "bar",
          value: "1.75",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "49",
          step: 1,
        },
      ],
    },
    {
      name: "Т11",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т11A",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т12",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т13",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т14",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "33",
          step: 1,
        },
      ],
    },
    {
      name: "Т14A",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "33",
          step: 1,
        },
      ],
    },
    {
      name: "Т21",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "33",
          step: 1,
        },
      ],
    },
    {
      name: "Т22",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т23",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "20",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "10",
          step: 1,
        },
      ],
    },
    {
      name: "Т24",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "10",
          step: 1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "35",
          step: 1,
        },
      ],
    },
    {
      name: "Р Ф",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "30",
          step: 1,
        },
        {
          name: "Ниво янсен",
          type: "number",
          unit: "°C",
          value: 0,
          step: 1,
        },
      ],
    },
    {
      name: "Р401",
      properties: [
        {
          name: "Ниво казан",
          type: "number",
          unit: "",
          value: "0.6",
          step: 0.1,
        },
        {
          name: "Температура",
          type: "number",
          unit: "°C",
          value: "55",
          step: 1,
        },
      ],
    },
  ],
  datetime: "06-11-2024 16:52",
});
const currentLog = ref(null);
const loading = ref(false);
const logsRef = collection(firestore, "logs");

const items = useCollection(logsRef);

const addItem = async () => {
  loading.value = true
  currentLog.value.datetime = moment().format("DD-MM-YYYY HH:mm");
  let text = JSON.stringify(currentLog.value);
  await addDoc(logsRef, { text: text });
  loading.value = false;
  router.push(`logs`);
};

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
  currentLog.value = logs.value.length > 0 ? logs.value[0] : log.value;
};

loadLogs();

loadLogs();
</script>