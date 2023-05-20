<template>
  <div class="container-page">
    <v-col cols="12" sm="12" md="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="books"
        class="elevation-1 px-10 pt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="table_label">Book</v-toolbar-title>
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

            <v-dialog v-model="dialogcreate" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  @click.stop="dialogcreate = true"
                >New Book</v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">Register Book</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="formcreate" v-model="valid" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_data.title"
                            label="Title"
                            placeholder="Enter title book"
                            :rules="titleRules"
                            outlined
                            clearable
                            required
                          >Title</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_data.author"
                            label="Author"
                            placeholder="Enter author name"
                            outlined
                            clearable
                            required
                          >Author</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_data.year"
                            label="Year"
                            placeholder="Enter year"
                            outlined
                            clearable
                            type="number"
                          >Year</v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_data.ddc_code"
                            label="DDC_code"
                            placeholder="Enter ddc_code"
                            outlined
                            clearable
                            required
                          >DDC_code</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_data.item_code"
                            label="Item_code"
                            placeholder="Enter item code"
                            :rules="ItemcodeRule"
                            outlined
                            clearable
                            required
                          >Item code</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                            <v-select
                              :items="shelt_number"
                              label="Shelt number"
                              v-model="submit_data.shelt_number"
                              outlined
                            ></v-select>
                          </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            v-model="submit_data.location_id"
                            label="location"
                            placeholder="Enter location"
                            :items="locations"
                            :rules="LocationRule"
                            item-text="name"
                            item-value="id"
                            outlined
                            clearable
                            required
                          >location</v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            :items="characteristics"
                            label="Characteristic"
                            v-model="submit_data.characteristic"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            :items="available"
                            label="Available"
                            item-text="name"
                            item-value="name"
                            v-model="submit_data.available_status"
                            outlined
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="error darken-1" text @click="dialogcreate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="create_book">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <BookSetting />
            <v-dialog v-model="dialogUpdate" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Department</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="formupdate" v-model="validupdate" lazy-validation>
                    <v-container>
                      <v-row class="mt-2">
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.title"
                            label="Title"
                            placeholder="Enter title book"
                            :rules="titleRules"
                            outlined
                            clearable
                            required
                          >Title</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.author"
                            label="Author"
                            placeholder="Enter author name"
                            outlined
                            clearable
                            required
                          >Author</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.year"
                            label="Year"
                            placeholder="Enter year"
                            outlined
                            clearable
                            type="number"
                          >Year</v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.ddc_code"
                            label="DDC_code"
                            placeholder="Enter ddc_code"
                            outlined
                            clearable
                            required
                          >DDC_code</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-text-field
                            v-model="submit_edit_data.item_code"
                            label="Item_code"
                            placeholder="Enter item code"
                            :rules="ItemcodeRule"
                            outlined
                            clearable
                            required
                          >Item code</v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            :items="shelt_number"
                            label="Shelt number"
                            v-model="submit_edit_data.shelt_number"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            v-model="submit_edit_data.location_id"
                            label="location"
                            placeholder="Enter location"
                            :items="locations"
                            :rules="LocationRule"
                            item-text="name"
                            item-value="id"
                            outlined
                            clearable
                            required
                          >location</v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            :items="characteristics"
                            label="Characteristic"
                            v-model="submit_edit_data.characteristic"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="input-data">
                          <v-select
                            :items="available"
                            label="Available"
                            item-text="name"
                            item-value="name"
                            v-model="submit_edit_data.available_status"
                            outlined
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="edit_book">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="30%">
              <v-card class="delete_dialog">
                <div class="delete_image">
                  <img src="@/assets/deletealert.gif" class=" mt-3" width="120" alt />
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
        <template v-slot:item.available_status="{ item }">
          <v-icon medium color="primary" v-if="item.available_status=='Available'">mdi-check-circle</v-icon>
          <v-icon medium color="red" v-if="item.available_status=='Unavailable'">mdi-close-circle</v-icon>
        </template>
        <template v-slot:item.id="{ item,index }">{{ index + 1 }}</template>
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
import moment from "moment";

import BookService from "@/services/BookService";
import BookSetting from "@/components/setting/BookSetting.vue";
import LocationService from "@/services/LocationService";
export default {
  components: {
    BookSetting
  },
  data: () => ({
    search: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    modal: false,
    shelt_number: ["1", "2", "3", "4"],
    delete_id: null,
    dialog: false,
    dialogcreate: false,
    dialogUpdate: false,
    dialogDelete: false,
    characteristics: ["New", "Medium", "Old"],
    available: [{ name: "Available" }, { name: "Unavailable" }],
    headers: [
      {
        text: "id",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
      { text: "Year", value: "year" },
      { text: "DDC code", value: "ddc_code" },
      { text: "Item code", value: "item_code" },
      { text: "Shelt Number", value: "shelt_number" },
      { text: "Location", value: "location" },
      { text: "Characteristic", value: "characteristic" },
      { text: "Available", value: "available_status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    books: [],
    editedIndex: -1,
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 50) || "Title must be less than 50 characters"
    ],
    ItemcodeRule: [v => !!v || "Item Code is required"],
    ShelfRule: [v => !!v || "Shelf is required"],
    LocationRule: [v => !!v || "Location is required"],
    valid: false,
    validupdate: false,
    submit_edit_data: {
      title: "",
      author: "",
      year: 2023,
      ddc_code: "",
      item_code: "",
      shelt_number: 0,
      location_id: "",
      characteristic: "",
      available_status: ""
    },
    submit_data: {
      title: "",
      author: "",
      year: 2023,
      ddc_code: "",
      item_code: "",
      shelt_number: "1",
      location_id: "",
      characteristic: "",
      available_status: ""
    },
    locations: [],
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

  created() {
    this.initialize();
  },

  mounted() {
    this.get_books();
    this.get_location();
  },
  methods: {
    initialize() {
      this.get_books();
    },
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_books() {
      BookService.getAll()
        .then(response => {
          // console.log(response);
          this.books = response.data.book;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async create_book() {
      await this.validateCreateForm();

      if (this.valid == true) {
        BookService.create(this.submit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.dialogcreate = false;
              this.get_books();
              this.show_snackbar("Create success", "green");
              this.$refs.formcreate.reset();
            } else {
              alert("Create Error");
            }
          });
      } else {
        this.dialogcreate = true;
      }
    },
    validateCreateForm() {
      this.$refs.formcreate.validate();
    },
    create_book_success() {
      this.dialogcreate = false;
      this.snackbarText = "Create Success";
      this.snackbarColor = "green";
      this.snackbar = true;
      this.get_books();
    },
    validateEditForm() {
      this.$refs.formupdate.validate();
    },
    editItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.submit_edit_data = Object.assign({}, item);
      this.submit_edit_data.id = item.id;
      this.submit_edit_data.shelt_number = item.shelt_number + "";
    },
    viewItem(item) {
      // console.log(item);
      // console.log(item.type._id);
      this.viewData = Object.assign({}, item);
      console.log(this.viewData);
    },
    async edit_book() {
      await this.validateeditform();

      if (this.validupdate == true) {
        BookService.update(this.submit_edit_data.id, this.submit_edit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.get_books();
              this.dialogUpdate = false;
              this.show_snackbar("Edit success", "green");
            } else {
              alert("Edit error");
            }
          });
      }
    },
    deleteItem(item) {
      this.delete_id = item.id;
    },
    deleteItemConfirm() {
      if (this.delete_id != null) {
        BookService.deleteById(this.delete_id)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info) {
              if (this.info.statusText == "OK") {
                this.get_books();
                this.dialogDelete = false;
                this.show_snackbar("Delete success", "green");
              } else {
                alert("Delete Student Error");
              }
            }
          });
        this.dialogDelete = false;
      }
    },
    get_location() {
      LocationService.getAll()
        .then(response => {
          this.locations = response.data.location;
          console.log(this.department);
        })
        .catch(e => {
          console.log(e);
        });
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