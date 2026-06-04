export const INSTAGRAM_URL = "https://www.instagram.com/tomoya_personal_trainer/";
export const CONTACT_EMAIL = "tomoyakun.1221@gmail.com";

export const mailtoLink = (subject = "TSPへのお問い合わせ") =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
