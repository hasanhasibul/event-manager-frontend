/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/common/form-controls";
import DateRangePickerControl from "@/components/common/form-controls/DateRangePicker";
import { EventCard } from "@/components/event";
import { getAllCookies } from "@/lib/helpers";
import { getData, updateData } from "@/lib/helpers/services";
import { Button, Col, Pagination, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
interface iProps {
  title: string;
  _id: string;
  location: string;
  start_time: string;
}

const List = () => {
  const navigate = useNavigate();
  const [eventList, setEvenList] = useState<iProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, watch, reset } = useForm();
  const [xTotal, setXTotal] = useState(0);
  useEffect(() => {
    getEventList();
  }, [
    searchParams.get("page"),
    searchParams.get("searchTerm"),
    searchParams.get("start_time"),
    searchParams.get("end_time"),
  ]);
  const getEventList = async () => {
    const params: any = {
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 8,
    };
    if (searchParams.get("searchTerm")) {
      params["searchTerm"] = searchParams.get("searchTerm") || "";
    }
    if (searchParams.get("start_time")) {
      params["start_time"] = searchParams.get("start_time") || "";
    }
    if (searchParams.get("end_time")) {
      params["end_time"] = searchParams.get("end_time") || "";
    }
    const response = await getData("event/events", params);
    if (response?.statusCode == "200") {
      setEvenList(response?.data?.event);
      setXTotal(response?.data?.meta?.total);
    } else {
      toast.error(response?.message);
    }
  };
  const handlePageChange = (page: number) => {
    const params: any = {
      page: page,
      limit: searchParams.get("limit") || 8,
    };
    setSearchParams(params);
  };
  const dateRange = watch("dateRange");
  const handleSearch = () => {
    const params: any = {
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 8,
      searchTerm: watch("searchTerm") || "",
      start_time:
        (dateRange?.length && dayjs(dateRange[0])?.format("YYYY-MM-DD")) || "",
      end_time:
        (dateRange?.length && dayjs(dateRange[1])?.format("YYYY-MM-DD")) || "",
    };
    setSearchParams(params);
  };
  const handleReset = () => {
    reset();
    const params: any = {
      page: 1,
      limit: searchParams.get("limit") || 8,
      searchTerm: "",
      start_time: "",
      end_time: "",
    };
    setSearchParams(params);
  };

  const handleRSVP = async (event: any, eventID: string) => {
    event.stopPropagation();
    const { authToken } = getAllCookies();
    if (!authToken) {
      navigate("/login");
      return;
    }
    const response = await updateData(`event/event-attendece/${eventID}`);
    if (response?.statusCode == "200") {
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="md:py-4 md:px-16 p-4">
      <h2 className="font-semibold text-base underline  "> Event List</h2>
      <Row gutter={[5, 5]}>
        <Col xs={24} md={8}>
          <div className="w-full">
            <Input
              placeholder="Search with title location .."
              control={control}
              name="searchTerm"
            />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div>
            <DateRangePickerControl control={control} name="dateRange" />
          </div>
        </Col>
        <Col md={8}>
          <div className="flex  w-44 gap-1 mt-1 justify-start items-center">
            <Button
              type="primary"
              block
              size="large"
              className=" w-44"
              htmlType="button"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              type="primary"
              block
              ghost
              className="w-44"
              htmlType="button"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <Row gutter={[8, 8]}>
        {eventList?.map((item: iProps) => (
          <Col sm={12} xs={12} md={6}>
            <div
              key={item?._id}
              onClick={() => navigate(`/event/${item?._id}`)}
            >
              <EventCard handleRSVP={handleRSVP} data={item} />
            </div>
          </Col>
        ))}
      </Row>
      <br />
      <Pagination
        pageSize={Number(searchParams.get("limit") || 8)}
        current={Number(searchParams.get("page") || 1)}
        total={xTotal}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
