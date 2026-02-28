import * as Yup from "yup";

export default Yup.object().shape({
  message: Yup.string()
    .min(1, "Message must be at least 1 character")
    .max(1000, "Message must be at most 1000 characters")
    .required("Message is required"),
});