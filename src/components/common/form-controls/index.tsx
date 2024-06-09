import { lazy } from "react";
const Input = lazy(() => import("@/components/common/form-controls/Input"));

const FieldLabel = lazy(
  () => import("@/components/common/form-controls/FieldLabel")
);
const DatePicker = lazy(
  () => import("@/components/common/form-controls/DaterPicker")
);
const TextArea = lazy(
  () => import("@/components/common/form-controls/TextArea")
);
const Password = lazy(
  () => import("@/components/common/form-controls/Password")
);

export { Input, FieldLabel, DatePicker, TextArea, Password };
