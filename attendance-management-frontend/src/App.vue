<template>
  <v-app>
    <div v-if="$route.meta.header === 1">
      <Navbar />
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  })
};
</script>
<style>
body {
  font-family: "Inria Sans", sans-serif;
}
.v-application{
  font-family: "Inria Sans", sans-serif;
}
.theme--light.v-input input, .theme--light.v-input textarea,
 .theme--light.v-select.v-text-field {
  font-size: 1.2rem;
}
.table_label {
  color: #0062e0;
  font-weight: 700;
  font-family: "Inria Sans", sans-serif;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 700;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr{
  font-size: 1.1rem;
  font-weight: 700;
}

</style>
