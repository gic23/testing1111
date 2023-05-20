<template>
  <div class="mx-auto mt-5 contain">
    <div class="culumn_contain">
      <div class="row3">
        <v-form class="input-box" ref="form">
          <v-row class="pt-7">
            <v-text-field
              class="mr-2"
              solo
              placeholder="Please enter your student's Id"
              outlined
              clearable
              v-model="student_id"
              @keydown.enter.prevent="submitStudentId"
            ></v-text-field>
            <v-btn class="btn-submit" color="primary" @click="submitStudentId" dark x-large>SUBMIT</v-btn>
          </v-row>
        </v-form>
      </div>
      <div ref="printMe">
        <v-card class="studentcard">
          <div class="column1">
            <div class="stemlogo">
              <div class="logostemLibrary">
                <v-avatar size="40">
                  <v-img src="../../assets/Stemlogo.png" />
                </v-avatar>
                <span>STEM Library</span>
              </div>
            </div>
            <div class="information">
              <div>
                <span class="titleinfo">Id &emsp;&emsp;&emsp; :</span>
                <span class="valueinfoid">{{ student.student_id }}</span>
              </div>
              <div>
                <span class="titleinfo">Phone &emsp; :</span>
                <span class="valueinfo">{{ student.phone_number }}</span>
              </div>
              <div>
                <span class="titleinfo">Create &emsp;:</span>
                <span class="valueinfo">{{ student.create_at | moment }}</span>
              </div>
              <div>
                <span class="titleinfo">Expire &emsp;:</span>
                <span class="valueinfo">{{ student.expire_at | moment }}</span>
              </div>
            </div>
            <div class="barcode">
              <div class="barcodetitle">ITC</div>
              <svg id="barcode1" />
            </div>
          </div>
          <div class="column2">
            <div class="titlecard">កាតសមាជិក</div>
            <div class="studentImage">
              <v-avatar size="50" height="70" rounded="0">
                <v-img :src="student.imageurl" />
              </v-avatar>
            </div>
            <div class="informationstudent">
              <div class="text">{{ student.name }}</div>
              <div class="text">Student</div>
              <div class="text">{{ student.departmentyear }}</div>
            </div>
          </div>
        </v-card>
      </div>

      <div>
        <v-btn
          variant="outlined"
          color="primary"
          size="large"
          class="mt-10"
          prepend-icon="cloud-upload"
          @click="print"
        >
          Export image
          <v-icon light>mdi-download</v-icon>
        </v-btn>
      </div>
      <div>
        <v-snackbar
          v-model="snackbar"
          top
          center
          :color="snackbarColor"
          timeout="2000"
          rounded="pill"
          height="20"
        >
          {{snackbarText}}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import JsBarcode from "jsbarcode";
import axios from "axios";
import moment from "moment";
export default {
  components: {},
  data: () => ({
    student_id: "",
    snackbar: false,
    student: {
      id: 5,
      student_id: "e20180328",
      name: "Hun Ravit",
      gender: "Male",
      phone_number: "0882223414",
      departmentyear: "I5-GIC",
      imageurl: `${process.env.VUE_APP_SERVICE_URL}/uploads/1676996063292e20180328.jpg`,
      create_at: "2023-02-28T17:00:00.000Z",
      expire_at: "2024-02-29T17:00:00.000Z",
      candidatetype: "Ingénieure"
    },
    snackbarText: "",
    snackbarColor: "green"
  }),
  mounted() {
    JsBarcode("#barcode1", "e20180328", {
      fontSize: 20,
      background: "white",
      lineColor: "black"
    });
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD MMMM YYYY");
    }
  },
  methods: {
    generateBarcode() {
      JsBarcode("#barcode1", this.student.student_id, {
        fontSize: 20,
        background: "white",
        lineColor: "black"
      });
    },
    moment: function(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    async print() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        // type: "dataURL",
        quality: 0.95,
        dpi: 720,
        scale: 5,
        useCORS: true,
        allowTaint: true
      };

      var output = await html2canvas(el, options);

      const link = document.createElement("a");
      link.download = "download.png";
      link.href = output.toDataURL("image/png");
      link.click();
    },
    submitStudentId() {
      if (this.student_id != "" && this.student_id != null) {
        this.get_student_by_id();
      } else {
        this.showSnackbar( "Please Input student Id","red");
      }
    },
    get_student_by_id() {
      axios
        .get(`${process.env.VUE_APP_SERVICE_URL}/payment/student/${this.student_id}`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            console.log(this.info.data);
            if (this.info.data.student == null) {
              this.$refs.form.reset();
              this.showSnackbar( "Student's ID cannot find! Please register before join library","red");
            }else if (this.info.data.student.expire_status == 1) {
              this.showSnackbar( "Please pay before generate Id card","red");
            } else {
              this.student = this.info.data.student;
              this.showSnackbar("Get Success","green");
            }
          }
        });
    },showSnackbar(message,color){
              this.snackbarColor = color;
              this.snackbarText = message;
              this.snackbar = true;
    }
  }
};
</script>
<style scoped>
.contain {
  /* background-color: gold; */
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
}
.row3 .input-box {
  width: 40%;
}
.row3 .v-text-field {
  font-size: 1.2rem;
  font-weight: bold;
}

.row3 .example-id {
  color: white;
  font-size: 1.2rem;
}

.studentcard {
  width: 98mm;
  height: 66.8mm;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
}
.stemlogo {
  margin-left: 1rem;
  margin-top: 0.2rem;
}
.column1 {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.column1 .barcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.column1 .barcode .barcodetitle {
  font-size: 0.5rem;
}
.column1 #barcode1 {
  height: 8vh;
}
.information {
  margin: 0.6rem 0rem;
  margin-left: 2rem;
}
.information .titleinfo {
  font-size: 0.8rem;
  text-transform: capitalize;
}

.information .valueinfo {
  font-size: 0.8rem;
  text-transform: capitalize;
  font-weight: 600;
}
.information .valueinfoid {
  font-size: 0.8rem;
  font-weight: 600;
}

.logostemLibrary {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  /* color: #0062e0; */
}

.column2 {
  background-color: #6ba0e5;
  width: 40%;
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  align-items: center;
}
/* .column2 .titlecard {
  font-family: "Khmer OS Muol Light";
} */
.column2 .studentImage {
  margin-top: 1rem;
}
.column2 .informationstudent {
  text-align: center;
  margin-top: 0.5rem;
}
.column2 .text {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.2rem;
}
</style>