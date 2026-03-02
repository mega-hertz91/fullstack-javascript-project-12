import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .required("Channel name is required")
    .min(3, "Channel name must be at least 3 characters")
    .max(12, "Channel name must be at most 12 characters"),
});
