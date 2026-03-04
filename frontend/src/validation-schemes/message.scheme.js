import * as Yup from "yup";
import i18n from "@/i18n";

export default Yup.object().shape({
  body: Yup.string()
    .min(1, i18n.t("fields.min"))
    .max(1000, i18n.t("fields.max"))
    .required(i18n.t("fields.requered")),
});