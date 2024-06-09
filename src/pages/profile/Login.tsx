/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginForm } from "@/components/profile";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { postData } from "@/lib/helpers/services";
import Cookies from "js-cookie";
const schema = yup.object({
  phone: yup.string().trim().required("Phone is required"),
  password: yup.string().trim().required("Password is required"),
});

const Login = () => {
  const method = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = method;
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const response: any = await postData("auth/login", { ...data });

    if (response?.statusCode == "200") {
      Cookies.set("name", response?.data?.name);
      Cookies.set("token", response?.data?.accessToken);
      Cookies.set("user_id", response?.data?.user_id);
      toast.success(response?.message);
      window.location.replace("/");
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="py-4 px-16">
      <FormProvider {...method}>
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-80 border rounded-md p-4"
          >
            <h2 className="font-semibold text-center text-base underline  ">
              Login
            </h2>
            <br />
            <LoginForm />
            <div className="flex gap-1 justify-end mt-6 ">
              <div className="w-44">
                <Button
                  type="primary"
                  block
                  ghost
                  size="large"
                  className="!text-xs !rounded shadow-none"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-44">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isSubmitting}
                  className="!text-xs !rounded shadow-none"
                  size="large"
                >
                  Submit
                </Button>
                <Link className="pt-2" to="/create-account">
                  <span className="underline ">create an account</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default Login;
