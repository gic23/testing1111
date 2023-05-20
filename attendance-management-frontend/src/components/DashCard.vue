<template>
  <v-card
    class="mx-auto rounded-lg card-number"
    width="19rem"
    max-width="344"
    outlined
    color="#0062E0"
    align="center"
    justify-content="center"
  >
    <v-list-item three-line>
      <img :src="require(`@/assets/${picture_name}`)" align="center" class="ml-4" alt width="80" />

      <v-list-item-content>
        <v-list-item-title class="cardtitle text-h5 text-bold contain_result">
          <p class="result_title">{{ title }}</p>
          <p class="result_number">{{ number }}</p>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: "yes",
  props: {
    title: String,
    number: Number,
    picture_name: String
  }
};
</script>
<style scoped>
.cardtitle {
  color: white;

}
.contain_result{
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.result_title{
  font-size: 1.8rem;
}
.result_number{
  font-size: 2.3rem;
  font-weight: bold;
}
</style>