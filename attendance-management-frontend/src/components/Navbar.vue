<template>
  <v-app-bar app color="#0062E0" dark>
    <div class="d-flex align-center">
      <a href="/dashboard">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-5"
          contain
          src="../assets/Stemlogo.png"
          transition="scale-transition"
          width="60"
        />
      </a>
      <h3 class="mx-2">
        STEM
        <br />Library
      </h3>
    </div>
    <div class="ml-5">
      <div id="nav">
        <router-link class="menu" :active="active" to="/dashboard">Home</router-link>
        <router-link class="menu" :active="active" to="/student">Student</router-link>
        <router-link class="menu" :active="active" to="/attendance">Attendance</router-link>
        <router-link class="menu" :active="active" to="/book">Book</router-link>
        <!-- <router-link class="menu" :active="active" to="/chart">Chart</router-link> -->

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span class="menu" :active="active" to="/chart" v-bind="attrs" v-on="on">
              Chart
              <v-icon>mdi-chevron-down</v-icon>
            </span>
          </template>
          <v-list class="menudropdown">
            <v-list-item
              :active="active"
              class="menudropdownlist"
              to="/chart/attendance"
            >Attendance Barchart</v-list-item>
            <v-list-item :active="active" class="menudropdownlist" to="/chart/book">Book Barchart</v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span class="menu" :active="active" to="/report" v-bind="attrs" v-on="on">
              Report
              <v-icon>mdi-chevron-down</v-icon>
            </span>
          </template>
          <v-list class="menudropdown">
            <v-list-item
              :active="active"
              class="menudropdownlist"
              to="/report/attendance"
            >Attendance Report</v-list-item>
            <v-list-item
              :active="active"
              class="menudropdownlist"
              to="/report/payment"
            >Payment Report</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-spacer></v-spacer>

    <v-menu offset-y class="listmenu">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon slot="activator" v-bind="attrs" v-on="on">
          <v-avatar class="white" size="32">
            <v-icon color="primary">person</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-2 listItemMenu" light>
        <v-list-item class="mb-3">
          <v-avatar class="primary mr-3" size="2.5rem">
            <v-icon dark>person</v-icon>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <b style="color: #0062e0; text-transform: capitalize">{{ username }}</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="myprofile">
          <v-list-item-icon>
            <v-icon>person</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/permission">
          <v-list-item-icon>
            <!-- <v-icon>accessibility</v-icon> -->
            <v-icon>mdi-account-key</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Permission</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/change-password">
          <v-list-item-icon>
            <!-- <v-icon>accessibility</v-icon> -->
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change password</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/user-manage" v-if="is_admin">
          <v-list-item-icon>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>User-Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>lock_open</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="space"></div>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    active: null,
    username: "",
    is_admin: false
  }),
  mounted() {
    this.getUserInfo();
  },
  methods: {
    logout() {
      setTimeout(() => {
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Username");
        sessionStorage.removeItem("Email");
        this.$router.push({ name: "Login" });
      }, 1000);
    },
    myprofile() {
      alert("Myprofile");
    },
    getUserInfo() {
      if (
        sessionStorage.getItem("Username") != null &&
        sessionStorage.getItem("Username") != "undefined"
      ) {
        this.username = sessionStorage.getItem("Username");
        if (this.username == "admin") {
          this.is_admin = true;
        } else {
          this.is_admin = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.active {
  background-color: indianred;
  color: red;

}
.menu-tab {
  color: white !important;
}

.menu {
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  padding-bottom: 1rem;
  margin-left: 2rem;
}
.menu:hover {
  font-weight:500;
  border-bottom: 1px solid;
}
a.router-link-active {
  font-weight: 400;
  border-bottom: 3px solid;
  font-weight: bold;
}

.space {
  margin-right: 2rem;
}
.profile {
  width: 100%;
  margin-bottom: 1rem;
}

.v-list-item__title {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
