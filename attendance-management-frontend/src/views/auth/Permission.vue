<template>
  <div class="contain">
    <v-jsoneditor v-model="jsonData" :options="options" height="70vh" plus="false" @error="onError"></v-jsoneditor>
    <v-col cols="12" sm="12" md="12" class="text-center">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" @click="updateJson">Submit</v-btn>
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
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
  <script>
import PermissionService from "@/services/PermissionService";

export default {
  data: function() {
    return {
      snackbarText: "",
      snackbarColor: "",
      snackbar: false,
      options: { mode: "" },
      jsonData: {}
    };
  },
  mounted() {
    this.get_file_json();
  },
  methods: {
    get_file_json() {
      PermissionService.getJsonFile()
        .then(response => {
          // console.log(response);
          this.jsonData = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateJson() {
      this.show_snackbar("Update success", "error");
      // var Data = {
      //   value: this.jsonData
      // };
      // PermissionService.update(Data)
      //   .then(response => {
      //     if (response.data == "Data updated") {
      //       this.get_file_json();
      //       this.show_snackbar("Update success", "green");
      //     }
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },
    show_snackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    onError(){
      this.show_snackbar("Update error", "red");
    }
  }
};
</script> 
<style>
.jsoneditor-menu {
  background-color: #0062e0;
  color: white;
}
.jsoneditor-tree {
  padding: 2rem;
}
.jsoneditor-navigation-bar {
  display: none;
}
.jsoneditor-transform {
  display: none;
}
.jsoneditor-sort {
  display: none;
}
.jsoneditor-tree-inner {
  font-weight: 500;
}
.jsoneditor-popover,
.jsoneditor-schema-error,
div.jsoneditor td,
div.jsoneditor textarea,
div.JSON editor th,
div.jsoneditor-field,
div.jsoneditor-value,
pre.jsoneditor-preview {
  font-size: 1.3rem;
  padding: 0.1rem;
}

</style>