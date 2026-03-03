import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .required("Channel name is required")
    .min(3, "Channel name must be at least 3 characters")
    .max(20, "Channel name must be at most 20 characters"),
});
