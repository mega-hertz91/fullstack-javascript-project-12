import * as Yup from "yup";
import i18n from "@/i18n";

export default Yup.object().shape({
  username: Yup.string()
    .min(2, i18n.t("fields.min"))
    .max(50, i18n.t("fields.max"))
    .required(i18n.t("fields.requered")),
  password: Yup.string().min(5, i18n.t("fields.min")).max(12, i18n.t("fields.max")).required(i18n.t("fields.requered")),
});