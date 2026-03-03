import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      auth: {
        signUp: "Sign up",
        signIn: "Sign in",
        logout: "Logout",
        notAccount: "Don't have an account",
        existAccount: "Already have an account",
      },
      fields: {
        login: "Login",
        password: "Password",
        confirmPassword: "Password",
      },
      chatList: {
        online: "Online",
        offline: "Offline",
        you: "You",
      },
      formAction: {
        send: "Send",
        update: "Update",
        cancel: "Cancel",
        close: "Close",
        create: "Create",
        edit: "Edit",
        delete: "Delete",
      },
      entities: {
        channel: "Channel",
        message: "Message",
      },
      common: {
        allRightReserved: "All rights reserved",
      }
    },
  },
  ru: {
    translation: {
      auth: {
        signUp: "Зарегистрироваться",
        signIn: "Войти",
        logout: "Выйти",
        notAccount: "Нет аккаунта",
        existAccount: "Есть аккаунт",
      },
      fields: {
        login: "Логин",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
      },
      chatList: {
        online: "В сети",
        offline: "Не в сети",
        you: "Вы",
      },
      formAction: {
        send: "Отправить",
        update: "Обновить",
        cancel: "Отмена",
        close: "Закрыть",
        create: "Создать",
        edit: "Редактировать",
        delete: "Удалить",
      },
      entities: {
        channel: "Канал",
        message: "Сообщение",
      },
      common: {
        allRightReserved: "Все права защищены",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru", // default language
    fallbackLng: ['en', 'ru'], // fallback language
    supportedLngs: ["en", "ru"], // supported languages
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
