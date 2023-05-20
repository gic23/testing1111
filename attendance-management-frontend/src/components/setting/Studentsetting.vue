<template>
  <v-menu offset-y class="listmenu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon slot="activator" class=" ml-5  mb-2"  v-bind="attrs" v-on="on">
          <v-avatar class="primary" size="40"  >
            <v-icon color="white">settings</v-icon>
          </v-avatar>
        </v-btn>
    </template>

    <v-list class="pa-2 listItemMenu" light>
 
      <v-list-item href="/student/department">
        <!-- <v-list-item-icon>
          <v-icon>person</v-icon>
        </v-list-item-icon> -->
        <v-list-item-content>
          <v-list-item-title>Department</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/student/departmentoption">
        <v-list-item-content>
          <v-list-item-title>Department Option</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/student/candidatetype">
        <v-list-item-content>
          <v-list-item-title>Candidate Type</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/student/idcard">
        <v-list-item-content>
          <v-list-item-title>Student Id Card</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="/student/uploadexcel">
        <v-list-item-content>
          <v-list-item-title>Upload Data excel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>