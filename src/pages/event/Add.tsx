/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventForm } from "@/components/event";
import { postData } from "@/lib/helpers/services";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const schema = yup.object({
  title: yup.string().trim().required("Title is required"),
  location: yup.string().trim().required("Location is required"),
  start_time: yup.string().trim().required("Start time is required"),
  end_time: yup.string().trim().required("end time is required"),
  description: yup.string().trim().required("Description is required"),
});

const Add = () => {
  const method = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = method;

  const onSubmit = async (data: any) => {
    const response: any = await postData("event/create-event", {
      ...data,
      start_time: dayjs(data?.start_time)?.format("YYYY-MM-DD"),
      end_time: dayjs(data?.end_time)?.format("YYYY-MM-DD"),
    });

    if (response?.statusCode == "201") {
      toast.success(response?.message);
      navigate("/");
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="md:py-4 md:px-16 p-4">
      <h2 className="font-semibold text-base underline  ">Add Event</h2>
      <br />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EventForm />
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
                className="!text-xs !rounded shadow-none"
                size="large"
                loading={isSubmitting}
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

export default Add;
