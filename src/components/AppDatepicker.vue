<template>
  <v-menu
    class="app-datepicker"
    v-model="isMenuShow"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        :label="label"
        :value="currentDate"
        append-icon="mdi-calendar"
        readonly
        :rules="rules"
        v-on="on"
        @click:append="isMenuShow = true"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="currentDate"
      first-day-of-week="1"
      @change="$emit('input', currentDate)"
      @input="isMenuShow = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { requiredRule } from "@/helpers/validators";

export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentDate: "",
      isMenuShow: false,
      rules: this.required ? [requiredRule("Дата доставки")] : null
    };
  },
  watch: {
    value(val) {
      this.currentDate = val;
    }
  }
};
</script>
