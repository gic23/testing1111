<template>
  <v-card class="mx-auto mt-5 contain">
    <div ref="printMe" class="printMe" id="printMe">
      <div class="stemcontain pa-10 py-10">
        <div class="logostemLibrary">
          <v-avatar size="80" class="ml-10">
          <v-img src="../../assets/Stemlogo.png" />
        </v-avatar>
        <span > STEM Library</span>
        </div>
        <v-spacer></v-spacer>
          <img class="congratulation" src="../../assets/Congratulation.png" >
        

        
      </div>
      <div class="titlepost">
        <span class="stemTop">TOP 10 register</span>
        <span class="stemlibrary"> library</span>
      </div>
      <div class="contain-list">
    
          <div class="candidate" v-for="item in student" :key="item.id">
            <v-avatar size="70">
              <v-img :src="item.imageurl" />
            </v-avatar>
            <div class="studentInfo">
              <div class="name">{{ item.name}}</div>
              <div class="department">{{item.departmentyear}}</div>
            </div>
          </div>
      </div>
    </div>
    <v-card-actions>
      <v-btn variant="outlined"
      color="primary" size="large" prepend-icon="cloud-upload" @click="print"> Export image <v-icon light>mdi-download</v-icon></v-btn> 
    </v-card-actions>
  </v-card>
</template>
<script>
import html2canvas from "html2canvas";
import AttendanceService from "@/services/AttendanceService";
export default {
  data: () => ({
    student:[]
  }),
  mounted() {
    this.getTopTenRegister();
  
  },
  methods: {
    async print() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
       
        useCORS: true,
        allowTaint:true
      };

      var output = await html2canvas(el, options);

      const link = document.createElement("a");
      // link.setAttribute("download", "download.png");
      // link.setAttribute(
      //   "href",
      //   output.toDataURL("image/png").replace("image/png", "image/octet-stream")
      // );
      link.download = "download.png";
      link.href = output.toDataURL("image/png");
      link.click();
    },
    getTopTenRegister() {
      AttendanceService.getTopRegisterAttendance()
        .then(response => {
          console.log(response);
          this.student=response.data.attendance;
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
  width: 100%;
  padding: 1rem;
}
.stemcontain{
  display: flex;
  flex-direction: row;
}
.printMe{
   /* background-image: url("https://png.pngtree.com/background/20210709/original/pngtree-congratulations-to-the-new-year-new-year-spring-festival-simple-picture-image_935929.jpg");  */
  background-size: 100% 100%;
  image-resolution: 1000dpi;
}

.congratulation{
  width: 20%;
}
.logostemLibrary{
  height: 10vh;
  display: flex;
  align-items: center;
  font-size: 3rem;
  font-weight: 600;
  color: #0062e0;
}

.titlepost {
  width: 100%;
  background-color: #0062e0;
  color: white;
  text-align: center;
}
.stemTop {
  font-size: 2.8rem;
  font-weight: bold;
}
.stemlibrary {
  font-size: 3rem;
  font-weight: bold;
}
.contain-list {
  width: 100%;
  display: flex;
  padding: 3rem;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.candidate {
  width: 18%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.studentInfo{
  margin-left: 1rem;
}
.name {
  font-weight: 500;
  color: #0062e0;
  text-transform: capitalize;
  font-size: 1.5rem;
}
.department{
  font-size: 1.3rem;
 
}
</style>