<template>
  <div class="containerpage">
    <v-col cols="7" sm="7" md="7">
      <v-card class="pt-5 px-5">
        <v-card-title>
          <span class="text-h5">Change password</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formcreate" v-model="valid" lazy-validation>
            <v-container>
              <v-row class="mt-2">
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.old_password"
                    type="password"
                    label="Old password"
                    placeholder="Enter old password"
                    :rules="old_passwordRule"
                    outlined
                    clearable
                    required
                  >Email</v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.new_password"
                    label="Password"
                    type="password"
                    placeholder="Enter new password"
                    :rules="new_passwordRule"
                    outlined
                    clearable
                    required
                  >Password</v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.confirm_password"
                    label="Confirm Password"
                    placeholder="Enter confirm password"
                    type="password"
                    :rules="confirm_passwordRule"
                    outlined
                    clearable
                    required
                  >Confirm Password</v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel_update">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="change_password">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4" sm="4" md="4">
      <div class="contain_image">
        <img class="image" src="../../assets/ChangePassword.png" alt />
      </div>
    </v-col>

    <div>
      <v-snackbar
        v-model="snackbar"
        top
        right
        :color="snackbarColor"
        timeout="2000"
        rounded="pill"
        height="20"
      >
        {{snackbarText}}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/UserService";

export default {
  components: {},
  data: () => ({
    search: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    editedIndex: -1,
    old_passwordRule: [
      v => !!v || "Old password is required",
      v => (v && v.length >= 4) || "Old password must be more than 4 characters"
    ],
    new_passwordRule: [
      v => !!v || "New password is required",
      v => (v && v.length >= 4) || "Email must be more than 4 characters"
    ],
    confirm_passwordRule: [
      v => !!v || "Confirm is required",
      v =>
        (v && v.length >= 4) ||
        "Confirm password must be more than 4 characters"
    ],
    valid: false,
    submit_data: {
      email: "",
      old_password: "",
      new_password: ""
    },
    viewData: {}
  }),

  mounted() {
    this.get_user();
  },
  methods: {
    get_user() {
      this.submit_data.email = sessionStorage.getItem("Email");
    },
    cancel_update() {
      this.$refs.formcreate.reset();
    },
    async change_password() {
      await this.validateCreateForm();
      if (this.submit_data.new_password != this.submit_data.confirm_password) {
        this.displaySnackBar("Password must the same confirm password..", "red");
      } else if (this.valid == true) {
        UserService.change_password(this.submit_data)
          .then(response => (this.info = response))
          .then(() => {
            this.displaySnackBar("Change password success", "green");
            this.$refs.formcreate.reset();
            this.logout();
          })
          .catch(e => {
            console.log(e);
            this.displaySnackBar("Create error", "red");
          });
      } else {
        this.displaySnackBar("Form invalid", "red");
      }
    },
    validateCreateForm() {
      this.$refs.formcreate.validate();
    },

    displaySnackBar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    logout() {
      setTimeout(() => {
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Username");
        sessionStorage.removeItem("Email");
        this.$router.push({ name: "Login" });
      }, 1000);
    },
  }
};
</script>
<style scoped>
.containerpage {
  display: flex;
  flex-direction: row;
}
.input-data {
  padding: 0px 5px;
}
.contain_image {
  width: 100%;
  display: flex;
  margin-left: 1rem;
  height: 55vh;
  align-items: center;
  justify-content: center;
}
.image {
  width: 100%;
}
</style>