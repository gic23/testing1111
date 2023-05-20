<template>
  <div class="container-page">
    <v-col cols="12" sm="12" md="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="locations"
        class="elevation-1 px-10 pt-5"
      >
        <template v-slot:top>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-toolbar flat>
            <v-toolbar-title class="table_label">Location</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="search"
              class="ml-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogcreate" max-width="400px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  @click.stop="dialogcreate = true"
                >New Location</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create Location</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="formcreate" v-model="valid" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_data.name"
                            label="Name"
                            placeholder="Enter name"
                            :rules="nameRules"
                            outlined
                            clearable
                            required
                          >Name</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_data.description"
                            label="Description"
                            placeholder="Enter description"
                            outlined
                            clearable
                            required
                          >Name</v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="error darken-1" text @click="dialogcreate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="create_location">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogUpdate" max-width="400px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Location</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="formupdate" v-model="validupdate" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.name"
                            label="Name"
                            placeholder="Enter name"
                            :rules="nameRules"
                            outlined
                            clearable
                            required
                          >Name</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.description"
                            label="Description"
                            placeholder="Enter description"
                            :rules="nameRules"
                            outlined
                            clearable
                            required
                          >Name</v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="edit_location">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="30%">
              <v-card class="delete_dialog">
                <div class="delete_image">
                  <img src="../../assets/deletealert.gif" class=" mt-3" width="120" alt />
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

            <v-dialog v-model="dialogView" max-width="600px">
              <v-card class="pa-5">
                <v-list-item three-line>
                  <v-list-item-avatar tile size="200px">
                    <v-img :src="viewData.imageurl" width="200px"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="text-overline mb-4">Candidate information</div>

                    <v-list-item-title class="name">
                      {{viewData.name}}
                      <br />
                      <span class="usertype">{{viewData.usertype}}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <br />
                  <v-avatar size="100">
                    <img src="@/assets/logoitc.png" alt="logoitc" />
                  </v-avatar>
                </v-list-item>
                <v-list-item-content></v-list-item-content>
                <div class="coninfo">
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-account</v-icon>
                    {{viewData.student_id}}
                  </v-chip>
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-phone</v-icon>
                    {{viewData.phone_number}}
                  </v-chip>
                  <v-chip class="ma-2 information" color="primary" label>
                    <v-icon left>mdi-information</v-icon>
                    {{viewData.option}}
                  </v-chip>
                </div>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogView = false">Close</v-btn>
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
        <template v-slot:item.id="{ item,index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
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
import axios from "axios";
import moment from "moment";

import LocationService from "@/services/LocationService";

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
    dialogcreate: false,
    dialogUpdate: false,
    dialogDelete: false,
    headers: [
      {
        text: "id",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    student_status: true,
    locations: [],
    editedIndex: -1,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    valid: false,
    validupdate: false,
    submit_edit_data: {
      name: "",
      description: ""
    },
    submit_data: {
      name: "",
      description: ""
    },
    viewData: {},
    createStatus:false,
    items: [
      {
        text: 'Book',
        disabled: false,
        href: '/book',
      },
      {
        text: 'Location',
        disabled: true,
        href: '#',
      },
    ],
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

  created() {
    this.initialize();
  },

  mounted() {
    this.get_location();
  },
  methods: {
    initialize() {
      this.get_location();
    },
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_location() {
      LocationService.getAll()
        .then(response => {
          console.log(response);

          this.locations = response.data.location;
          console.log(this.department);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async create_location() {
      await this.validateformcreate();


      await LocationService.getByName(this.submit_data.name)
          .then((response) => (this.info = response))
          .then(() => {
        
            if(this.info.data.location){
              this.show_snackbar("Location name is duplicate", "red");
              this.createStatus=false;
            }else{
              this.createStatus=true;
            }
         
          });

      if (this.valid && this.createStatus) {
        axios
          .post(`${process.env.VUE_APP_SERVICE_URL}/location`, this.submit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.dialogcreate = false;
              this.get_location();
              this.show_snackbar("Create success","green");
              this.$refs.formcreate.reset();
            } else {
              alert("Create error");
            }
          });
      } else {
        this.dialogcreate = true;
      }
    },
    validateformcreate() {
      this.$refs.formcreate.validate();
    },

    validateeditform() {
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
    async edit_location() {
      await this.validateeditform();

      if (this.validupdate == true) {
        axios
          .put(
            `${process.env.VUE_APP_SERVICE_URL}/location/${this.submit_edit_data.id}`,
            this.submit_edit_data
          )
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.get_location();
              this.dialogUpdate = false;
              this.show_snackbar("Edit success","green");
            } else {
              alert("Create Student Error");
            }
          });
      }
    },
    deleteItem(item) {
      this.delete_id = item.id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        axios
          .delete(`${process.env.VUE_APP_SERVICE_URL}/location/${this.delete_id}`)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_location();
                this.show_snackbar("Delete success","green");
              } else {
                alert("Delete Student Error");
              }
            }
          });
        this.dialogDelete = false;
      }
    },
    show_snackbar(text,color){
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  }
};
</script>
<style scoped>
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