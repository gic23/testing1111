<template>
  <div class="contain">
    <div class="culumn_contain">
      <div class="row3">
        <v-form class="input-box" ref="form">
          <v-row class="pt-7">
            <v-text-field
              class="mr-2"
              solo
              placeholder="Please enter item-code or ddc-code"
              outlined
              clearable
              v-model="search"
              @keydown.enter.prevent="getBookByItemCode"
            ></v-text-field>
          </v-row>
        </v-form>
      </div>
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
      <v-card class="pa-5 book_card" style=" box-shadow: 0px 0px 5px #0062e0;">
        <v-list-item>
          <v-list-item-avatar class="mx-10" tile size="150px">
            <v-img src="@/assets/Book.png" width="200px"></v-img>
          </v-list-item-avatar>

          <div class="book_priority_height">
            <div class="two_item location_book">
              <v-icon class="icon_item" left>mdi-map-marker</v-icon>
              <span class="title_item">Location:</span>
              <span class="value_item">{{ book_data.location }}</span>
            </div>
            <div class="available">
              <span class="title_item">
                <v-icon medium color="primary" size="30">mdi-check-circle</v-icon>Available
              </span>
            </div>
          </div>
          <div v-if="showEdit">
            <v-btn icon @click="editItem(item)" @click.stop="dialogUpdate = true">
              <v-avatar class="primary" size="45">
                <v-icon color="white">edit</v-icon>
              </v-avatar>
            </v-btn>
          </div>
        </v-list-item>

        <div class="book_priority_low">
          <div class="two_item">
            <v-icon class="icon_item" left>mdi-format-title</v-icon>
            <span class="title_item">Title:</span>
            <span class="value_item">{{ book_data.title }}</span>
          </div>
          <div class="two_item">
            <v-icon left>mdi-barcode</v-icon>
            <span class="title_item">Item-code:</span>
            <span class="value_item">{{ book_data.item_code }}</span>
          </div>
          <div class="two_item">
            <v-icon class="icon_item" left>mdi-math-norm-box</v-icon>
            <span class="title_item">Ddc_code:</span>
            <span class="value_item">{{ book_data.ddc_code }}</span>
          </div>
          <div class="two_item">
            <v-icon class="icon_item" left>mdi-account</v-icon>
            <span class="title_item">Author:</span>
            <span class="value_item">{{ book_data.author }}</span>
          </div>
          <div class="two_item">
            <v-icon class="icon_item" left>mdi-calendar</v-icon>
            <span class="title_item">Year:</span>
            <span class="value_item">{{ book_data.year }}</span>
          </div>
          <div class="two_item">
            <v-icon class="icon_item" left>mdi-book-open</v-icon>
            <span class="title_item">characteristic:</span>
            <span class="value_item">{{ book_data.characteristic }}</span>
          </div>
        </div>
      </v-card>
    </div>
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
import BookService from "@/services/BookService";
import LocationService from "@/services/LocationService";
export default {
  components: {},
  data: () => ({
    book_information: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    search: "",
    dialogUpdate: false,
    validupdate: false,
    shelt_number: ["1", "2", "3", "4"],
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 50) || "Title must be less than 50 characters"
    ],
    ItemcodeRule: [v => !!v || "Item Code is required"],
    ShelfRule: [v => !!v || "Shelf is required"],
    LocationRule: [v => !!v || "Location is required"],
    book_data: {
      title: "Title",
      author: "Author",
      year: 2023,
      ddc_code: "DDC_code",
      item_code: "Item_code",
      shelt_number: 0,
      location: "Location",
      characteristic: "Characteristic",
      available_status: "Available"
    },
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
    characteristics: ["New", "Medium", "Old"],
    available: [{ name: "Available" }, { name: "Unavailable" }],
    showEdit: false
  }),
  mounted() {
    this.get_location();
  },
  filters: {},
  methods: {
    getBookByItemCode() {
      BookService.getbyItemOrDdc(this.search)
        .then(response => {
          if (response.data.book != "not_found") {
            this.book_data = response.data.book;
            this.showSnackbar("Get Success", "green");
            this.showEdit = true;
          } else {
            this.showSnackbar("Not found", "error");
            this.showEdit = false;
            this.setDefault();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    editItem(item) {
      BookService.getbyItemOrDdc(this.search)
        .then(response => {
          if (response.data.book != "not_found") {
            this.submit_edit_data = Object.assign({}, response.data.book);
            this.submit_edit_data.shelt_number = item.shelt_number + "";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async edit_book() {
      await this.validateEditForm();

      if (this.validupdate == true) {
        BookService.update(this.submit_edit_data.id, this.submit_edit_data)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.getBookByItemCode();
              this.dialogUpdate = false;
              this.show_snackbar("Edit success", "green");
            } else {
              this.show_snackbar("Edit error", "green");
            }
          });
      }
    },
    validateEditForm() {
      this.$refs.formupdate.validate();
    },
    showSnackbar(message, color) {
      this.snackbarColor = color;
      this.snackbarText = message;
      this.snackbar = true;
    },
    setDefault() {
      this.book_data = {
        title: "Title",
        author: "Author",
        year: 2023,
        ddc_code: "DDC_code",
        item_code: "Item_code",
        shelt_number: 0,
        location: "Location",
        characteristic: "Characteristic",
        available_status: "Available"
      };
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
    }
  }
};
</script>
<style scoped>
.contain {
  display: flex;
  justify-content: center;
}
.culumn_contain {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.row3 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #0062e0;
}
.row3 .input-box {
  width: 60%;
}
.row3 .v-text-field {
  font-size: 1.2rem;
  font-weight: bold;
}
.book_card {
  width: 60%;
  margin-top: 1.6rem;
  box-shadow: #0062e0;
}
.book_priority_low {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.2rem;
}

.book_priority_low .title_item {
  font-size: 1rem;
  color: rgb(112, 124, 128);
}
.book_priority_low .icon_item {
  color: black;
  font-weight: 500;
}
.book_priority_low .value_item {
  color: black;
  font-weight: 500;
  padding-left: 1rem;
  color: #0062e0;
}
.book_priority_low .two_item {
  margin-left: 4rem;
  width: 85%;
  margin-top: 1.3rem;
  border-bottom: solid rgba(186, 186, 206, 0.5);
}

.book_priority_height {
  width: 60%;
  font-size: 1.3rem;
}
.book_priority_height .icon_item {
  color: rgb(9, 75, 241);
  font-weight: 500;
}
.book_priority_height .title_item {
  font-size: 1.3rem;
  color: rgb(9, 75, 241);
}
.book_priority_height .value_item {
  color: black;
  font-weight: 500;
  padding-left: 1rem;
}
.book_priority_height .two_item {
  width: 100%;
  margin: 0.5rem;
}
.book_priority_height .location_book {
  /* border: solid 1px blue; */
  padding: 0.5rem;
  border-radius: 0.5rem;
  /* padding-left: 2rem; */
}
.available {
  margin-left: 1.2rem;
}
</style>