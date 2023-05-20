<template>
  <div class="container-page">
    <v-col cols="12" sm="12" md="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="departments"
        class="elevation-1 px-10 pt-5"
      >
        <template v-slot:top>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-toolbar flat>
            <v-toolbar-title class="table_label">Department</v-toolbar-title>
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
                  >New Department</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create Department</span>
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
                            >Name</v-text-field
                          >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="error darken-1" text @click="dialogcreate = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="create_department"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

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
                            v-model="submit_edit_data.name"
                            label="Name"
                            placeholder="Enter name"
                            :rules="nameRules"
                            outlined
                            clearable
                            required
                            >Name</v-text-field
                          >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="dialogUpdate = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="edit_student">Save</v-btn>
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



       
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            medium
            color="primary"
            class="mr-2"
            @click="editItem(item)"
            @click.stop="dialogUpdate = true"
            >mdi-pencil</v-icon
          >
          <v-icon
            medium
            color="red"
            @click="deleteItem(item)"
            @click.stop="dialogDelete = true"
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:item.id="{ item, index }">
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
        {{ snackbarText }}
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
import DepartmentService from "@/services/DepartmentService";

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
        value: "id",
      },
      { text: "name", value: "name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    student_status: true,
    departments: [],
    editedIndex: -1,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    valid: false,
    validupdate: false,
    submit_edit_data: {
      name: "",
    },
    submit_data: {
      name: "",
    },
    viewData: {},
    items: [
      {
        text: "Student",
        disabled: false,
        href: "/student",
      },
      {
        text: "Department",
        disabled: true,
        href: "#",
      },
    ],
    updateStatus:true,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.get_departments();
  },
  methods: {
    initialize() {
      this.get_departments();
    },
    moment: function (date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_departments() {
      DepartmentService.getAll()
        .then((response) => {
        
          this.departments = response.data.department;
         
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async create_department() {
      await this.validateformcreate();

      await DepartmentService.getByName(this.submit_data.name)
          .then((response) => (this.info = response))
          .then(() => {
        
            if(this.info.data.department){
              this.show_snackbar("Name is duplicate", "red");
              this.$refs.formcreate.reset();
              this.updateStatus=false;
            }else{
              this.updateStatus=true;
            }
         
          });

      if (this.valid == true && this.updateStatus==true) {
       await DepartmentService.create(this.submit_data)
          .then((response) => (this.info = response))
          .then(() => {
            if (this.info.data.status == true) {
              this.dialogcreate = false;
              this.get_departments();
              this.show_snackbar("Create success", "green");
              this.$refs.formcreate.reset();
            }
          }).catch((err)=>{
            alert(3);
            console.log(err);
            this.show_snackbar(err.response.data.message, "red");
          });
      } else {
        this.dialogcreate = true;
      }
    },
    validateformcreate() {
      this.$refs.formcreate.validate();
    },
    create_student_success() {
      this.dialogcreate = false;
      this.snackbarText = "Create Success";
      this.snackbarColor = "green";
      this.snackbar = true;
      this.get_departments();
    },
    validateeditform() {
      this.$refs.formupdate.validate();
    },
    editItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.submit_edit_data = Object.assign({}, item);
      this.submit_edit_data.id = item.id;
    },
    viewItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.viewData = Object.assign({}, item);
      console.log(this.viewData);
    },
    async edit_student() {
      await this.validateeditform();
 
      if (this.validupdate == true) {
        DepartmentService.update(this.submit_edit_data.id, this.submit_edit_data)
          .then((response) => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.get_departments();
              this.dialogUpdate = false;
              this.show_snackbar("Edit success", "green");
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
        DepartmentService.deleteById(this.delete_id)
          .then((response) => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_departments();
                this.show_snackbar("Delete success", "green");
              } else {
                alert("Delete Student Error");
              }
            }
          }).catch((err)=>{
            console.log(err);
            this.show_snackbar("Cannot delete", "red");
          });
        this.dialogDelete = false;
      }
    },
    show_snackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
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
