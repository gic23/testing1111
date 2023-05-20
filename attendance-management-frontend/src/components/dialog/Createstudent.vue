<template>
  <!-- <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="submit">Submit</v-btn>
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>-->

  <div>
    <v-dialog v-model="dialogcreate" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          @click.stop="dialogcreate = true"
        >New Student</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 header-dialog">Create Student</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formcreate" v-model="valid" lazy-validation>
            <v-container>
              <v-row class="mt-2">
                <v-col cols="12" sm="4" md="4" class="input-data">
                  <v-text-field
                    v-on:keyup="listen_input_student_id"
                    v-model="submit_data.student_id"
                    label="Student Id"
                    placeholder="Enter Student Id"
                    outlined
                    clearable
                   debounce="300"
                    :rules="student_idrule"
                    required
                  >Id</v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" class="input-data">
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
                <v-col cols="12" sm="4" md="4" class="input-data">
                  <v-text-field
                    v-model="submit_data.namekh"
                    label="Khmer name"
                    placeholder="Enter Khmer name"
                    outlined
                    clearable
                    required
                  >Name</v-text-field>
                </v-col>
                <v-col class="d-flex input-data" cols="12" sm="6">
                  <v-select
                    :rules="genderrule"
                    :items="gender"
                    v-model="submit_data.gender"
                    label="gender"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="input-data">
                  <v-text-field
                    v-model="submit_data.phone_number"
                    label="Phone Number"
                    :rules="phone_numberrule"
                    placeholder="Enter Phone Number"
                    outlined
                    clearable
                    required
                  >
                    Phone
                    Number
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12" class="input-data">
                  <!-- <v-text-field v-model="submit_data.dob" label="dob" outlined></v-text-field> -->
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="submit_data.dateofbirth"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="submit_data.dateofbirth" scrollable >
                      <v-spacer></v-spacer>
                      <v-btn text color="error" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12" sm="6" md="6" class="input-data">
                  <v-select
                    :items="candidatetype"
                    label="Candaite type"
                    item-text="name"
                    item-value="id"
                    v-on:change="listenUsertype"
                    v-model="submit_data.candidatetype_id"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="input-data">
                  <v-select
                    :disabled="!student_status"
                    :items="department"
                    item-text="name"
                    item-value="id"
                    label="Department"
                    v-model="submit_data.department_id"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="input-data">
                  <v-select
                    :disabled="!student_status"
                    :items="departmentoption"
                    item-text="name"
                    item-value="id"
                    label="Department option"
                    v-model="submit_data.departmentoption_id"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="input-data">
                  <v-select
                    :items="years"
                    :disabled="!student_status"
                    label="Study Year"
                    v-model="submit_data.study_year"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="12" class="input-data">
                  <v-file-input
                    accept="image/*"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Image"
                    type="file"
                    v-model="submit_data.image"
                    show-size
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialogcreate = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="clicksubmit" v-if="updatestatus">Update</v-btn>
          <v-btn color="blue darken-1" v-if="!updatestatus" text @click="clicksubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import CandidatetypeService from "@/services/CandidatetypeService";
import DepartmentService from "@/services/DepartmentService";
import DepartmentOptionService from "@/services/DepartmentOptionService";
import axios from "axios";
import CandidateService from "../../services/CandidateService";
export default {
  props: {
    dialogcreate: {
      default: false
    }
  },
  data: () => ({
    submit_data: {
      student_id: "",
      name: "",
      namekh: "",
      gender: "",
      phone_number: "",
      dateofbirth: "",
      candidatetype_id: "",
      department_id: "",
      departmentoption_id: "",
      departmentyear: "",
      study_year: "0",
      image: ""
    },
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    student_status: true,
    gender: ["Male", "Female"],
    candidatetype: [],
    department: [],
    departmentoption: [],
    years: ["0", "1", "2", "3", "4", "5"],
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    date: null,
    modal: false,
    valid: false,
    student_idrule: [v => !!v || "Student ID is required"],
    genderrule: [v => !!v || "Gender is required"],
    dobrule: [v => !!v || "Date of Birth is required"],
    phone_numberrule: [v => !!v || "Phonenumber is required"],
    usertyperule: [v => !!v || "User Type is required"],
    updatestatus: false
  }),
  mounted() {
    this.get_candidatetype();
    this.get_department();
    this.get_departmentoption();
  },
  methods: {
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    get_student_by_student_id() {
      CandidateService.get(this.submit_data.student_id)
        .then(response => {
          if (!response.data.student) {  
            var id = this.submit_data.student_id;
            this.updatestatus = false;
            this.setDefault(id); 
          } else {
            this.submit_data = response.data.student;
            this.submit_data.dateofbirth = this.moment(this.submit_data.dateofbirth);
            this.submit_data.study_year+="";
            this.updatestatus = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    listen_input_student_id() {
      this.get_student_by_student_id();
    },
    get_candidatetype() {
      CandidatetypeService.getAll()
        .then(response => {
          this.candidatetype = response.data.candidatetype;
        })
        .catch(e => {
          console.log(e);
        });
    },
    get_department() {
      DepartmentService.getAll()
        .then(response => {
          this.department = response.data.department;
        })
        .catch(e => {
          console.log(e);
        });
    },
    get_departmentoption() {
      DepartmentOptionService.getAll()
        .then(response => {
          console.log(response);

          this.departmentoption = response.data.departmentoption;
        })
        .catch(e => {
          console.log(e);
        });
    },
    clicksubmit() {
      if (this.updatestatus == true) {
        this.edit_student();
      } else {
        this.create_students();
      }
    },
    listenUsertype() {
      // if (
      //   this.submit_data.usertype != "Ingénieure" &&
      //   this.submit_data.usertype != "Technique"
      // ) {
      //   this.student_status = false;
      //   this.submit_data.department = "None";
      //   this.submit_data.year_department = "0";
      // } else {
      //   this.student_status = true;
      // }
    },
    async edit_student() {
      //check candidate type name
      let candidatetypename = "";
      let deparmentname = "";
      let i = 0;

      for (i = 0; i < this.candidatetype.length; i++) {
        if (this.submit_data.candidatetype_id == this.candidatetype[i].id) {
          candidatetypename = this.candidatetype[i].name;
        }
      }

      // alert(candidatetypename);
      for (i = 0; i < this.department.length; i++) {
        if (this.submit_data.department_id == this.department[i].id) {
          deparmentname = this.department[i].name;
        }
      }
      // alert(deparmentname);
      // alert("check");

      if (candidatetypename == "Ingénieure") {
        this.submit_data.departmentyear =
          "I" + this.submit_data.study_year + "-" + deparmentname;
      } else if (candidatetypename == "Technique") {
        this.submit_data.departmentyear =
          "T" + this.submit_data.study_year + "-" + deparmentname;
      } else if (candidatetypename == "Lecturer") {
        this.submit_data.departmentyear = "Lec" + "-" + deparmentname;
      } else {
        this.submit_data.departmentyear = "Guest";
      }

      await this.validate();

      if (this.valid == true) {
        const formData = new FormData();
        formData.append("student_id", this.submit_data.student_id);
        formData.append("name", this.submit_data.name);
        formData.append("namekh", this.submit_data.namekh);
        formData.append("gender", this.submit_data.gender);
        formData.append("phone_number", this.submit_data.phone_number);
        formData.append("dateofbirth", this.submit_data.dateofbirth);
        formData.append("candidatetype_id", this.submit_data.candidatetype_id);
        formData.append("department_id", this.submit_data.department_id);
        formData.append(
          "departmentoption_id",
          this.submit_data.departmentoption_id
        );
        formData.append("departmentyear", this.submit_data.departmentyear);
        formData.append("study_year", this.submit_data.study_year);
        formData.append("image", this.submit_data.image);

        axios
          .put(
            `${process.env.VUE_APP_SERVICE_URL}/candidate/${this.submit_data.id}`,
            formData
          )
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.statusText == "Created") {
              this.dialogcreate = false;
              this.$refs.formcreate.reset();
              this.$emit("create-success");
            } else {
              alert("Create Student Error");
            }
          });
      }
    },
    async create_students() {
      //check candidate type name
      let candidatetypename = "";
      let deparmentname = "";
      let i = 0;

      for (i = 0; i < this.candidatetype.length; i++) {
        if (this.submit_data.candidatetype_id == this.candidatetype[i].id) {
          candidatetypename = this.candidatetype[i].name;
        }
      }

      for (i = 0; i < this.department.length; i++) {
        if (this.submit_data.department_id == this.department[i].id) {
          deparmentname = this.department[i].name;
        }
      }

      if (candidatetypename == "Ingénieure") {
        this.submit_data.departmentyear =
          "I" + this.submit_data.study_year + "-" + deparmentname;
      } else if (candidatetypename == "Technique") {
        this.submit_data.departmentyear =
          "T" + this.submit_data.study_year + "-" + deparmentname;
      } else if (candidatetypename == "Lecturer") {
        this.submit_data.departmentyear = this.candidatetypename;
      } else {
        this.submit_data.departmentyear = "Guest";
      }

    
      await this.validate();

      if (this.valid == true) {
        const formData = new FormData();
        formData.append("student_id", this.submit_data.student_id);
        formData.append("name", this.submit_data.name);
        formData.append("namekh", this.submit_data.namekh);
        formData.append("gender", this.submit_data.gender);
        formData.append("phone_number", this.submit_data.phone_number);
        formData.append("dateofbirth", this.submit_data.dateofbirth);
        formData.append("candidatetype_id", this.submit_data.candidatetype_id);
        formData.append("department_id", this.submit_data.department_id);
        formData.append(
          "departmentoption_id",
          this.submit_data.departmentoption_id
        );
        formData.append("departmentyear", this.submit_data.departmentyear);
        formData.append("study_year", this.submit_data.study_year);
        formData.append("image", this.submit_data.image);

        axios
          .post(`${process.env.VUE_APP_SERVICE_URL}/candidate`, formData)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.data.status == false) {
              this.snackbarText = this.info.data.message;
              this.snackbarColor = "red";
              this.snackbar = true;
              this.dialogcreate = false;
            } else {
              this.dialogcreate = false;
              this.$refs.formcreate.reset();
              this.$emit("create-success");
            }
          });
      } else {
        this.dialogcreate = true;
      }
    },
    validate() {
      this.$refs.formcreate.validate();
    },
    setDefault(id){
      this.submit_data.student_id= id;
      this.submit_data.name= "";
      this.submit_data.namekh= "";
      this.submit_data.gender= "";
      this.submit_data.phone_number= "";
      this.submit_data.dateofbirth= "";
      this.submit_data.candidatetype_id= "";
      this.submit_data.department_id= "";
      this.submit_data.departmentoption_id= "";
      this.submit_data.departmentyear= "";
      this.submit_data.study_year= "0";
      this.submit_data.image= "";
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
</style>
