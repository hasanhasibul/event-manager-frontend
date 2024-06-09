import { lazy } from "react";
const RegisterForm = lazy(() => import("@/components/profile/Register"));
const LoginForm = lazy(() => import("@/components/profile/LoginForm"));
const ProfileDetails = lazy(
  () => import("@/components/profile/ProfileDetails")
);
export { RegisterForm, LoginForm, ProfileDetails };
