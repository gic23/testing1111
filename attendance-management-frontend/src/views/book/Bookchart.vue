<template>
  <div>
    <div class="alert-contain"></div>
    <div class="type">
      <v-col cols="12" sm="8" class="title_page">
       Total count book in department barchart
      </v-col>
      
      <v-col cols="12" sm="2">
        <v-select
          class="select-input"
          :items="templateitems"
          label="Chart Template"
          v-model="themechart"
          solo
          @change="updateTheme"
        ></v-select>
      </v-col>
    </div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <div class="row3 barchart-group mx-10 mt-10">
      <apexchart
        height="300px"
        class="barchart"
        type="bar"
        :options="options_bar"
        :series="series_bar"
        ref="myChart"
      ></apexchart>

    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    templateitems: [
      "palette1",
      "palette2",
      "palette3",
      "palette4",
      "palette5",
      "palette6",
      "palette7",
      "palette8",
      "palette9"
    ],
    end_date: null,
    items: [
      {
        text: 'Book',
        disabled: false,
        href: '/book',
      },
      {
        text: 'Chart',
        disabled: true,
        href: '#',
      },
    ],
    menu: false,
    menu2: false,
    search: "",
    options_bar: {
      chart: {
        id: "barchart-month",
        animations: {
          speed: 200
        },
        type: "bar",
        events: {}
      },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      },
      title: {
        text: "Book Department",
        align: "center",
        style: {
          fontSize: "20px",
          color:"#0062e0"
        }
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      },
      xaxis: {
        categories: ["GIM", "GIC", "GRU"],
        labels: {
          style: {
            fontSize: "1rem"
          }
        }
      }
    },
    series_bar: [
      {
        name: "Student",
        data: []
      }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  mounted() {
    this.getBookDepartment();
  },
  methods: {
    updateTheme() {
      this.options_bar = {
        theme: {
          palette: this.themechart
        }
      };
    },
    getBookDepartment() {
      axios
        .get(`${process.env.VUE_APP_SERVICE_URL}/chart/bookdepartment`)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            console.log(this.info.data);
            let i = 0;
            // console.log(this.info.data.data);
            let getdata = this.info.data.data;
            let categories = [];
            let data = [];
            for (i in getdata) {
              if (getdata[i].count != 0) {
                categories[i] = getdata[i].category;
                data[i] = getdata[i].count;
              }
            }

            this.options_bar.xaxis.categories = categories;
            this.series_bar[0].data = data;

            this.$refs.myChart.refresh();
          }
        });
    }
  }
};
</script>
<style scoped>
.type {
  width: 100%;
  background: #0062e0;
  display: flex;
  justify-content: center;
  margin-bottom: -0.5rem;
}
.title_page{
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
 text-transform: capitalize;
}
.select-input {
  margin-top: 1rem;
  margin-bottom: -1.4rem;
}
.select_date {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
.row2 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>