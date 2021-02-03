<template>
  <div>
    <v-text-field
      autofocus
      v-model="userForm.firstName"
      :counter="255"
      :rules="rules.firstNameRule"
      label="Имя"
      required
    ></v-text-field>

    <v-text-field
      v-model="userForm.lastName"
      :counter="255"
      :rules="rules.lastNameRule"
      label="Фамилия"
      required
    ></v-text-field>

    <v-text-field
      placeholder="+7xxxxxxxxxx"
      v-model="userForm.phone"
      :rules="rules.phoneRules"
      label="Телефон"
      type="tel"
      required
    ></v-text-field>

    <v-text-field
      v-model="userForm.email"
      :rules="rules.emailRules"
      label="e-mail"
      type="email"
      required
    ></v-text-field>
  </div>
</template>

<script>
import {
  emailRules,
  requiredRule,
  phoneRules,
  textRule
} from "@/helpers/validators";

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      })
    }
  },
  data() {
    return {
      userForm: { ...this.value },

      rules: {
        firstNameRule: [requiredRule("Имя"), textRule],
        lastNameRule: [requiredRule("Фамилия"), textRule],
        emailRules,
        phoneRules
      }
    };
  },

  watch: {
    userForm: {
      handler(nv) {
        this.$emit("input", nv);
      },
      deep: true
    }
  }
};
</script>
