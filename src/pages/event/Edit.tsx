/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventForm } from "@/components/event";
import { getDetails, updateData } from "@/lib/helpers/services";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LoadingSpiner } from "@/components/common/LoadingSpiner";

const schema = yup.object({
  title: yup.string().trim().required("Title is required"),
  location: yup.string().trim().required("Location is required"),
  start_time: yup.string().trim().required("Start time is required"),
  end_time: yup.string().trim().required("end time is required"),
  description: yup.string().trim().required("Description is required"),
});

const Edit = () => {
  const method = useForm<any>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = method;
  const { id } = useParams();
  useEffect(() => {
    getEvenDetails();
  }, [id]);
  const getEvenDetails = async () => {
    setLoading(true);
    const response = await getDetails(`event/event/${id}`);
    if (response?.statusCode == "200") {
      setValue("description", response?.data?.description);
      setValue("title", response?.data?.title);
      setValue("location", response?.data?.location);
      setValue("start_time", dayjs(response?.data?.start_time));
      setValue("end_time", dayjs(response?.data?.end_time));
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  const onSubmit = async (data: any) => {
    const response: any = await updateData(`event/update-event/${id}`, {
      ...data,
      start_time: dayjs(data?.start_time)?.format("YYYY-MM-DD"),
      end_time: dayjs(data?.end_time)?.format("YYYY-MM-DD"),
    });

    if (response?.statusCode == "200") {
      toast.success(response?.message);
      navigate("/");
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="md:py-4 md:px-16 p-4">
      <h2 className="font-semibold text-base underline  ">Edit Event</h2>
      <br />
      {loading ? (
        <LoadingSpiner />
      ) : (
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
                  Update
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default Edit;
