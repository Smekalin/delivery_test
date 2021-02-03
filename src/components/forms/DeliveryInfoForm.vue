<template>
  <div>
    <v-radio-group v-model="shouldDelivery">
      <v-radio label="Доставка" :value="true"></v-radio>
      <v-radio label="Самовывоз" :value="false"></v-radio>
    </v-radio-group>

    <div v-if="shouldDelivery">
      <v-select
        autofocus
        v-model="deliveryForm.country"
        :items="countries"
        item-text="name"
        item-value="id"
        label="Страна"
        single-line
        no-data-text=""
        :rules="rules.countryRule"
      ></v-select>

      <v-text-field
        v-model="deliveryForm.city"
        :counter="255"
        :rules="rules.cityRule"
        label="Город"
        required
      ></v-text-field>

      <v-text-field
        v-model="deliveryForm.postalCode"
        :counter="6"
        :rules="rules.postalCodeRules"
        label="Индекс"
        required
      ></v-text-field>

      <v-text-field
        v-model="deliveryForm.address"
        :counter="255"
        :rules="rules.addressRule"
        label="Адрес"
        required
      ></v-text-field>

      <app-datepicker
        v-model="deliveryForm.date"
        :rules="rules.dataRule"
        label="Дата доставки"
        required
      ></app-datepicker>
    </div>

    <v-textarea
      outlined
      label="Поле для комментария"
      v-model="deliveryForm.message"
    ></v-textarea>
  </div>
</template>

<script>
import { postalCodeRules, requiredRule, textRule } from "@/helpers/validators";
import AppDatepicker from "@/components/AppDatepicker";

export default {
  components: {
    AppDatepicker
  },

  props: {
    value: {
      type: Object,
      default: () => ({
        country: "",
        city: "",
        postalCode: "",
        address: "",
        date: "",
        message: ""
      })
    }
  },
  data() {
    return {
      deliveryForm: { ...this.value },

      countries: [
        {
          id: 1,
          name: "Брянск"
        },
        {
          id: 2,
          name: "Север"
        }
      ],

      rules: {
        countryRule: [requiredRule("Страна")],
        cityRule: [requiredRule("Город"), textRule],
        postalCodeRules,
        addressRule: [requiredRule("Адрес"), textRule],
        dataRule: [requiredRule("Дата доставки")]
      },

      shouldDelivery: true
    };
  },

  watch: {
    deliveryForm: {
      handler(nv) {
        this.$emit("input", nv);
      },
      deep: true
    },
    shouldDelivery(nv) {
      if (!nv) {
        this.deliveryForm = { message: this.deliveryForm.message };
      }
    }
  }
};
</script>
