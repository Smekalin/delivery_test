<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">
        Основные данные
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">
        Адрес доставки
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form
          ref="userInfoForm"
          v-model="isUserInfoValid"
          lazy-validation
          @submit.prevent="submitUserInfo"
        >
          <user-info-form v-model="userInfoData"></user-info-form>
          <v-btn :disabled="!isUserInfoValid" color="primary" type="submit">
            Продолжить
          </v-btn>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form
          ref="deliveryInfoForm"
          v-model="isDeliveryInfoValid"
          lazy-validation
          @submit.prevent="submitDeliveryInfo"
        >
          <delivery-info-form v-model="deliveryInfoData"></delivery-info-form>
          <v-btn class="mr-4" color="primary" type="submit">
            Оформить заказ
          </v-btn>
          <v-btn @click="prevStep">
            Назад
          </v-btn>
        </v-form>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import UserInfoForm from "@/components/forms/UserInfoForm";
import DeliveryInfoForm from "@/components/forms/DeliveryInfoForm";
import { Delivery } from "@/api/delivery";

export default {
  components: {
    UserInfoForm,
    DeliveryInfoForm
  },

  data() {
    return {
      step: 1,
      isUserInfoValid: true,
      isDeliveryInfoValid: true,

      userInfoData: {
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      },
      deliveryInfoData: {}
    };
  },

  methods: {
    submitUserInfo() {
      this.$refs.userInfoForm.validate();

      this.$nextTick(() => {
        if (this.isUserInfoValid) {
          this.nextStep();
        }
      });
    },

    submitDeliveryInfo() {
      this.$refs.deliveryInfoForm.validate();
      this.$nextTick(() => {
        if (this.isDeliveryInfoValid) {
          this.sendDeliveryData();
        }
      });
    },

    sendDeliveryData() {
      const formData = {
        ...this.userInfoData,
        ...this.deliveryInfoData
      };
      Delivery.sendDeliveryInfo(formData).then(res => {
        if (!res.ok) {
          this.$toast.error("Ошибка при отправке запроса");
          return;
        }
        this.$toast.success("Данные успешно отправлены");
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
    },

    nextStep() {
      this.step = 2;
    },

    prevStep() {
      this.resetDeliveryInfo();
      this.step = 1;
    },

    resetDeliveryInfo() {
      this.$refs.deliveryInfoForm.reset();
      this.deliveryInfoData = {};
    }
  }
};
</script>
