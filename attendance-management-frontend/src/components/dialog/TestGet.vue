<template>
  <v-dialog v-model="dialog" persistent max-width="700">
    <v-card class="mx-auto" max-width="700">
      <div>
        <v-container class="text-center">
          <v-row class="mt-2">
            <v-col cols="12" sm="4" md="4">
              <div>
                <v-avatar size="100" class="imageavata">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                </v-avatar>
                <div class="information">
                  <br />
                  <span class="rankfirstRunner">HUN RAVIT</span>
                  <br />
                  <span>9 time</span>
                  <br />

                  <span class="rankfirstRunner">2</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="top1">
              <div>
                <v-avatar size="100" class="imageavata">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                </v-avatar>
                <div class="information">
                  <br />
                  <span class="rank">HUN RAVIT</span>
                  <br />
                  <span>9 time</span>
                  <br />
                  <span class="rank">1</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <div>
                <v-avatar size="100" class="imageavata">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                </v-avatar>
                <div class="information">
                  <br />
                  <span class="rankfirstRunner">HUN RAVIT</span>
                  <br />
                  <span>9 time</span>
                  <br />

                  <span class="rankfirstRunner">3</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-list>
                
                <v-list-item class="itemlist" v-for="(item, i) in items" :key="i">
                  <v-list-item-title v-text="item.number"></v-list-item-title>
                  <v-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                  </v-avatar>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-title v-text="item.time"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="submit">Submit</v-btn>
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      default: false
    }
  },
  data: () => ({
    items: [
      { text: "Real-Time",number:1,time:20 },
      { text: "Audience",number:2 ,time:16},
      { text: "Conversions",number:3 ,time:12},
      { text: "Conversions",number:4,time:9 }
    ]
  }),
  methods: {
    close() {
      this.$emit("update:dialog", false);
      this.$emit("close-dialog");
    },
    submit() {
      alert("Submit");
      this.$emit("update:dialog", false);
    }
  }
};
</script>
<style scoped>
.itemlist {
  margin: 0.8rem;
}
.top1 {
  margin-top: 3rem;
}
.information {
  font-size: 1rem;
  font-weight: 600;
}
.rank {
  font-size: 1.3rem;
  color: goldenrod;
}
.rankfirstRunner {
  font-size: 1.2rem;
  color: rgb(39, 46, 255);
}
.imageavata{
  margin-bottom: -1rem;
}
</style>
