<template>
  <v-app class="v-app">
    <div class="v-app__container">
      <app-delivery></app-delivery>
    </div>
  </v-app>
</template>

<script>
import AppDelivery from "./components/AppDelivery/AppDelivery";

export default {
  name: "App",

  components: {
    AppDelivery
  }
};
</script>

<style lang="scss" scoped>
.v-app {
  margin-top: 100px;
  &__container {
    display: flex;
    justify-content: center;
  }
}
</style>
