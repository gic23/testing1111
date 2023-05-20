<template>
  <v-menu offset-y class="listmenu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon slot="activator" class=" ml-5 mb-2"  v-bind="attrs" v-on="on">
          <v-avatar class="primary" size="40" >
            <v-icon color="white">settings</v-icon>
          </v-avatar>
        </v-btn>
    </template>

    <v-list class="pa-2 listItemMenu" light>
 
      <v-list-item href="/book/find">
        <v-list-item-content>
          <v-list-item-title>Book Find</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/book/department">
        <v-list-item-content>
          <v-list-item-title>Book Department</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/book/location">
        <v-list-item-content>
          <v-list-item-title>Book Location</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/book/chart">
        <v-list-item-content>
          <v-list-item-title>Book Chart</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  
     
    </v-list>
  </v-menu>
</template>