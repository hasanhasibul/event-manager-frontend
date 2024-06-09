/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import { RegisterForm } from "@/components/profile";
import { postData } from "@/lib/helpers/services";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  phone: yup.string().trim().required("Phone is required"),
  password: yup.string().trim().required("Password is required"),
  name: yup.string().trim().required("Name is required"),
});

const Register = () => {
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
    const response: any = await postData("user/create-user", { ...data });

    if (response?.statusCode == "201") {
      toast.success(response?.message);
      navigate("/login");
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="py-4 px-16">
      <h2 className="font-semibold text-base underline  ">Create Account</h2>
      <br />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RegisterForm />
          <div className="flex gap-1 justify-end mt-6 ">
            <div className="w-44">
              <Button
                type="primary"
                block
                ghost
                size="large"
                className="!text-xs !rounded shadow-none"
                onClick={() => navigate("/admin/list")}
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
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
