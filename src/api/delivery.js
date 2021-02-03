export class Delivery {
  static sendDeliveryInfo(formData) {
    // NOTE: обычно axios юзаю
    return fetch("test.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  }
}
