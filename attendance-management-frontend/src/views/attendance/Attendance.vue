<template>
  <div class="container-page">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="row3">
          <v-card>
            <v-card-title>
              <v-toolbar-title class="table_label px-10 pt-5">Attendances</v-toolbar-title>
              <v-divider class="mx-4 mt-2" inset vertical></v-divider>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>

              <AttendanceSetting />
            </v-card-title>
            <v-data-table :headers="headers" :items="students" :search="search">
              <template v-slot:item.imageurl="{ item }">
                <img class="small-image" :src="item.imageurl" style="width: 25px; height:30px" />
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import AttendanceSetting from "@/components/setting/AttendanceSetting.vue";
export default {
  components: {
    AttendanceSetting
  },
  data: () => ({
    testKey: 1,
    search: "",
    headers: [
      {
        text: "Image",
        align: "center",
        sortable: false,
        value: "imageurl"
      },
      {
        text: "Student_id",
        align: "start",
        sortable: true,
        value: "student_id"
      },
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender" },
      { text: "Department Year", value: "departmentyear" },
      { text: "Join Time", value: "created" }
    ],
    students: [],
    data: []
  }),
  mounted() {
    this.getattendance();
  },
  methods: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY h:mm a");
    },
    getattendance() {
      axios
        .get(`${process.env.VUE_APP_SERVICE_URL}/attendance`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            // console.log(this.info.data.attendances);
            this.students = this.info.data.attendances;
            let i = 0;
            for (i in this.students) {
              this.students[i].dob = this.moment(this.students[i].dob);
              if (
                this.students[i].imageurl == null ||
                this.students[i].imageurl == ""
              ) {
                this.students[
                  i
                ].imageurl = `${process.env.VUE_APP_SERVICE_URL}/uploads/guest.png`;
              }
            }
          }
        });
    }
  }
};
</script>
<style scoped>
.test {
  background-color: red;
}
.row1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.cardtitle {
  color: white;
}
.row2 {
  display: flex;
  justify-content: center;
}
chart {
  width: "100%";
}
.row2 .barchart {
  width: 70%;
}
.row2 .peichart {
  width: 30%;
}
</style>