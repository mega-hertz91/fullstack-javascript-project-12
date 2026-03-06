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
        signUpProcess: "Sign up",
        signIn: "Sign in",
        logout: "Logout",
        notAccount: "Don't have an account",
        existAccount: "Already have an account",
        logoutConfirmQuestion: "Are you sure you want to logout?",
        logoutConfirmTitile: "Logout confirmation",
      },
      fields: {
        login: "Login",
        nickName: "Nickname",
        password: "Password",
        match: "Passwords must match",
        confirmPassword: "Password",
        requered: "Required",
        min: "To short",
        max: "To long",
      },
      chatList: {
        online: "Online",
        offline: "Offline",
        you: "You",
        typeYouMessage: "Type your message and press Enter...",
        enterChannelName: "Enter channel name",
        newMessage: "New message",
        channelOptions: "Channel management",
        messageCount: "messages",
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
      },
      toast: {
        createSuccess: "message sent successfully",
        updateSuccess: "updated successfully",
        deleteSuccess: "deleted successfully",
        createFailed: "failed to create",
        updateFailed: "failed to update",
        deleteFailed: "failed to delete",
        channelCreated: "Channel created",
        channelUpdated: "Channel updated",
        channelDeleted: "Channel deleted",
        messageCreated: "Message sent",
        messageUpdated: "Message updated",
        messageDeleted: "Message deleted",
      },
      notFound: {
        title: "Page not found",
        description: "The page you are looking for does not exist.",
        backToHome: "Back to Home",
      },
      error: {
        network: "Network error. Please check your connection.",
        unauthorized: "Unauthorized. Please log in again.",
        forbidden:
          "Forbidden. You don't have permission to access this resource.",
        notFound: "Not found. The requested resource does not exist.",
        serverError: "Server error. Please try again later.",
        alreadyExist: "Already exists.",
        loginOrPasswordIncorrect: "Login or password is incorrect",
        hasBeenUnique: "Has been unique",
      },
    },
  },
  ru: {
    translation: {
      auth: {
        signUp: "Регистрация",
        signUpProcess: "Зарегистрироваться",
        signIn: "Войти",
        logout: "Выйти",
        notAccount: "Нет аккаунта",
        existAccount: "Есть аккаунт",
        logoutConfirmQuestion: "Вы уверены, что хотите выйти?",
        logoutConfirmTitile: "Подтверждение выхода",
      },
      fields: {
        login: "Имя пользователя",
        nickName: "Ваш ник",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        match: "Пароли должны совпадать",
        requered: "Обязательное поле",
        range: "От {{min}} до {{max}} символов",
        min: "Не менее {{min}} символов",
        max: "Не более {{max}} символов",
      },
      chatList: {
        online: "В сети",
        offline: "Не в сети",
        you: "Вы",
        typeYouMessage: "Введите сообщение и нажмите Enter...",
        enterChannelName: "Имя канала",
        newMessage: "Новое сообщение",
        channelOptions: "Управление каналом",
        messageCount: "сообщения",
      },
      formAction: {
        send: "Отправить",
        update: "Обновить",
        cancel: "Отменить",
        close: "Закрыть",
        create: "Создать",
        edit: "Переименовать",
        delete: "Удалить",
      },
      entities: {
        channel: "Канал",
        message: "Сообщение",
        user: "Такой пользователь",
      },
      common: {
        allRightReserved: "Все права защищены",
      },
      toast: {
        createSuccess: "успешно  отправлено",
        updateSuccess: "успешно обновлено",
        deleteSuccess: "успешно удалено",
        createFailed: "не удалось создать",
        updateFailed: "не удалось обновить",
        deleteFailed: "не удалось удалить",
        channelCreated: "Канал создан",
        channelUpdated: "Канал переименован",
        channelDeleted: "Канал удалён",
        messageCreated: "Сообщение отправлено",
        messageUpdated: "Сообщение обновлено",
        messageDeleted: "Сообщение удалено",
      },
      notFound: {
        title: "Страница не найдена",
        description: "Страница, которую вы ищете, не существует",
        backToHome: "Вернуться на главную",
      },
      error: {
        network: "Сетевая ошибка. Пожалуйста, проверьте ваше соединение.",
        unauthorized: "Неавторизованно. Пожалуйста, войдите снова.",
        forbidden: "Запрещено. У вас нет прав для доступа к этому ресурсу.",
        notFound: "Не найдено. Запрашиваемый ресурс не существует.",
        serverError: "Ошибка сервера. Пожалуйста, попробуйте позже.",
        alreadyExist: "Уже существует",
        loginOrPasswordIncorrect: "Неверные имя пользователя или пароль",
        hasBeenUnique: "Должно быть уникальным",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru", // default language
    fallbackLng: ["en", "ru"], // fallback language
    supportedLngs: ["en", "ru"], // supported languages
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
