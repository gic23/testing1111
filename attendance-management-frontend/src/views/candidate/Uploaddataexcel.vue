<template>
  <div class="main-contain">
    <v-col cols="7" sm="7" md="7">
      <v-card class="mt-10">
        <v-col cols="12" sm="12" md="12" class="text-center">
          <span class="text-h5 header">Upload Excel File</span>
        </v-col>
        <v-card-text>
          <v-col cols="12" sm="12" md="12">
            <v-file-input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Image"
              type="file"
              v-model="submit_data.file"
              show-size
              outlined
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="text-center">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" @click="uploadexcel">Submit</v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" sm="4" md="4">
      <div class="contain_image mt-10 ml-10">
        <img class="image" width="400" src="../../assets/ChangePassword.png" alt />
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
import axios from "axios";
export default {
  data: () => ({
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    submit_data: {
      file: ""
    }
  }),
  methods: {
    async uploadexcel() {
      if (this.submit_data.file) {
        const formData = new FormData();
        formData.append("file", this.submit_data.file);
        axios
          .post(`${process.env.VUE_APP_SERVICE_URL}/candidate/upload`, formData)
          .then(response => (this.info = response))
          .then(() => {
            if (this.info.data.status == true) {
              this.snackbarText = "Upload Success";
              this.snackbarColor = "green";
              this.snackbar = true;
              this.submit_data.file="";
            } else {
              this.snackbarText = "Upload Fail";
              this.snackbarColor = "green";
              this.snackbar = true;
            }
          });
      } else {
        this.snackbarText = "Please Select file before submit";
        this.snackbarColor = "red";
        this.snackbar = true;
      }
    }
  }
};
</script>
<style scoped>
.header {
  font-weight: 500;
  color: #0062e0;
}
.main-contain{
  display: flex;

}
</style>