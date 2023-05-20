<template>
  <div class="containerpage">
    <v-col cols="8" sm="8" md="8">
      <v-data-table :search="search" :headers="headers" :items="user" class="elevation-1 px-5">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="table_label">User</v-toolbar-title>

            <v-text-field
              v-model="search"
              class="ml-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogUpdate" max-width="400px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Department</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="formupdate" v-model="validupdate" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.username"
                            label="Username"
                            placeholder="Enter username"
                            :rules="usernameRule"
                            outlined
                            clearable
                            required
                          >Username</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.email"
                            label="Email"
                            placeholder="Enter email"
                            :rules="emailRule"
                            outlined
                            clearable
                            required
                          >Username</v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="edit_student">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="30%">
              <v-card class="delete_dialog">
                <div class="delete_image">
                  <img src="../../assets/deletealert.gif" class="mt-3" width="120" alt />
                </div>
                <v-card-title class="text-h5 justify-center">Are you sure delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            medium
            color="primary"
            class="mr-2"
            @click="editItem(item)"
            @click.stop="dialogUpdate = true"
          >mdi-pencil</v-icon>
          <v-icon
            medium
            color="red"
            @click="deleteItem(item)"
            @click.stop="dialogDelete = true"
          >mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:item.id="{ item,index }">{{ index + 1 }}</template>
      </v-data-table>
    </v-col>
    <v-col cols="4" sm="4" md="4">
      <v-card class="pt-5">
        <v-card-title>
          <span class="text-h5">Create user</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formcreate" v-model="valid" lazy-validation>
            <v-container>
              <v-row class="mt-2">
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.username"
                    label="Username"
                    placeholder="Enter username"
                    :rules="usernameRule"
                    outlined
                    clearable
                    required
                  >Username</v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.email"
                    label="Email"
                    placeholder="Enter email"
                    :rules="emailRule"
                    outlined
                    clearable
                    required
                  >Email</v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-text-field
                    v-model="submit_data.password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    :rules="passwordRule"
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
          <v-btn color="blue darken-1" text @click="cancel_register">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="register_user">Save</v-btn>
        </v-card-actions>
      </v-card>
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
import moment from "moment";
import UserService from "@/services/UserService";

export default {
  components: {},
  data: () => ({
    search: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    modal: false,
    delete_id: null,
    dialog: false,
    user: [],
    dialogcreate: false,
    dialogUpdate: false,
    dialogDelete: false,
    updateStatus: true,
    headers: [
      {
        text: "id",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    student_status: true,
    departmentoptions: [],
    editedIndex: -1,
    usernameRule: [
      v => !!v || "Username is required",
      v => (v && v.length <= 50) || "Username must be less than 50 characters"
    ],
    emailRule: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    passwordRule: [
      v => !!v || "Password is required",
      v => (v && v.length >= 4) || "Email must be more than 4 characters"
    ],
    confirm_passwordRule: [
      v => !!v || "Confirm is required",
      v =>
        (v && v.length >= 4) ||
        "Confirm password must be more than 4 characters"
    ],
    valid: false,
    validupdate: false,
    submit_edit_data: {
      username: "",
      email: ""
    },
    submit_data: {
      username: "",
      email: "",
      password: ""
    },
    viewData: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  mounted() {
    this.get_user();
  },
  methods: {
    initialize() {
      this.get_departmentoptions();
      this.get_user();
    },
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_user() {
      UserService.getUser()
        .then(response => {
          this.user = response.data.user;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancel_register() {
      this.$refs.formcreate.reset();
    },
    async register_user() {
      await this.validateformcreate();
      if (this.submit_data.password != this.submit_data.confirm_password) {
        this.show_snackbar("Password must the same confirm password..", "red");
      }
      if (this.valid == true) {
        UserService.register(this.submit_data)
          .then(response => (this.info = response))
          .then(() => {
            this.get_user();
            this.show_snackbar("Create success", "green");
            this.$refs.formcreate.reset();
          })
          .catch(e => {
            console.log(e);
            this.show_snackbar("Create error", "red");
          });
      } else {
        this.show_snackbar("Form invalid", "red");
      }
    },
    validateCreateForm() {
      this.$refs.formcreate.validate();
    },
    validateEditForm() {
      this.$refs.formupdate.validate();
    },
    editItem(item) {
      this.submit_edit_data = Object.assign({}, item);
      this.submit_edit_data.id = item.id;
    },
    viewItem(item) {
      this.viewData = Object.assign({}, item);
      console.log(this.viewData);
    },
    async edit_student() {
      await this.validateEditForm();

      if (this.validupdate == true) {
        UserService.update(this.submit_edit_data.id, this.submit_edit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (
              this.info.data.message != null &&
              this.info.data.message != "undefinded"
            ) {
              this.show_snackbar("Edit success", "green");
              this.get_user();
            }
          })
          .catch(() => {
            this.show_snackbar("Edit error", "green");
          });
      }
    },
    deleteItem(item) {
      this.delete_id = item.id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        UserService.delete(this.delete_id)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_user();
                this.show_snackbar("Delete success", "green");
              } else {
                alert("Delete Student Error");
              }
            }
          });
        this.dialogDelete = false;
      }
    },
    show_snackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    }
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
.header-dialog {
  font-weight: 600;
  color: #0062e0;
}
.name {
  font-size: 2rem;
  font-weight: bold;
}
.usertype {
  font-size: 1.3rem;
  font-weight: 600;
}
.coninfo {
  display: flex;
  flex-direction: row;
}
.information {
  width: 30%;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}
.delete_image {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>