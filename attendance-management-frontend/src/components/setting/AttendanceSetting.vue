<template>
  <v-menu offset-y class="listmenu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon slot="activator" class=" mr-10" v-bind="attrs" v-on="on">
        <v-avatar class="primary" size="45">
          <v-icon color="white">settings</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list class="pa-2 listItemMenu" light>
      <v-list-item href="/attendance/topten">
        <v-list-item-content>
          <v-list-item-title>Top register</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>