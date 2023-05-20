<template>
  <div>
    <v-dialog v-model="dialogcreate" max-width="90%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          class="mb-2 mx-3"
          v-bind="attrs"
          @click.stop="dialogcreate = true"
        >Remove Book</v-btn>
      </template>
      <v-card class="card_contain">
        <v-card-title>
          <span class="text-h5 header_dialog">
            Remove Book
            <b>({{ department.name }})</b>
          </span>
        </v-card-title>
        <div>
          <span class="selected_title">Total select:</span>
          <v-btn variant="outlined" class="selected_btn" color="white" icon>{{ selected.length }}</v-btn>
        </div>
        <v-card-text>
          <v-data-table
            id="booktable"
            show-select
            v-model="selected"
            :headers="headers"
            :items="books"
            :items-per-page="5"
            class="elevation-1"
            item-key="title"
          >
            <template v-slot:item.title="{ item }">
              <td>{{item.title}}</td>
            </template>
            <template v-slot:item.data-table-select="{ isSelected, select }">
              <v-simple-checkbox color="error" :value="isSelected" @input="select($event)"></v-simple-checkbox>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialogcreate = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="clicksubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BookDepService from "@/services/BookDepService";
import DepartmentService from "@/services/DepartmentService";
export default {
  props: {
    dialogcreate: {
      default: false
    }
  },
  data: () => ({
    selected: [],

    headers: [
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
      { text: "DDC code", value: "ddc_code" },
      { text: "Item code", value: "item_code" },
      { text: "Shelt Number", value: "shelt_number" },
      { text: "Location", value: "location" }
    ],
    books: [],
    department: {},
    submit_datas: {
      id_department: null,
      id_book: []
    }
  }),
  mounted() {
    this.getBookByDepartmentId();
    this.getdepartment();
  },
  watch: {
    dialogcreate: function(newValue) {
      if (newValue) {
        this.getBookByDepartmentId();
      }
    }
  },
  methods: {
    getdepartment() {
      DepartmentService.getbyid(this.$route.params.id)
        .then(response => {
          this.department = response.data.department;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getBookByDepartmentId() {
      BookDepService.getBookByDepartmentId(this.$route.params.id)
        .then(response => {
          this.books = response.data.book;
        })
        .catch(e => {
          console.log(e);
        });
    },
    clicksubmit() {
      var id_book = [];
      for (let i = 0; i < this.selected.length; i++) {
        id_book[i] = this.selected[i].id;
      }

      this.submit_datas.id_book = id_book;
      this.submit_datas.id_department = this.$route.params.id;

      BookDepService.deleteBookToDepartment(this.submit_datas)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info.data.status == false) {
            this.dialogcreate = false;
            this.getBookByDepartmentId();
          } else {
            this.dialogcreate = false;
            this.selected = [];
            this.getBookByDepartmentId();
            this.$emit("create-success");
          }
        });
    }
  }
};
</script>
<style scoped>
#booktable {
  margin-top: 2rem;
}
.card_contain {
  padding: 1rem;
}
.header_dialog {
  color: rgb(219, 51, 51);
}
.selected_btn {
  background-color: rgb(219, 51, 51);
  color: white;
  font-size: 1.3rem;
}
.selected_title {
  color: rgb(219, 51, 51);
  margin-left: 2rem;
  font-size: 1rem;
}
</style>
