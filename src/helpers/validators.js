export const requiredRule = fieldName => v =>
  !!v || `Поле ${fieldName} обязательно для заполнения`;

export const textRule = v =>
  (v && v.length <= 255) || "Поле должно быть меньше, чем 255 символов";

export const nameRules = [requiredRule("Имя"), textRule];

export const emailRules = [
  requiredRule("e-mail"),
  v => /.+@.+\..+/.test(v) || "Введите валидный e-mail"
];

export const phoneRules = [
  requiredRule("Телефон"),
  v =>
    /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/.test(v) ||
    "Введите валидный номер телефона"
];
export const postalCodeRules = [
  requiredRule("Почтовый индекс"),
  v => /^\d{6}$/.test(v) || "Введите валидный почтовый индекс"
];
