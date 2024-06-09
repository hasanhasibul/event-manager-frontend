/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCookies } from "@/lib/helpers";
import { getDetails } from "@/lib/helpers/services";
import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
interface iProps {
  title: string;
  _id: string;
  location: string;
  start_time: string;
  end_time: string;
  description: string;
  user: string;
  attendees?: any;
}

const Details = () => {
  const [eventDetails, setEventDetails] = useState<iProps | null>(null);
  const { user_id } = getAllCookies();
  const { id } = useParams();
  useEffect(() => {
    getEvenDetails();
  }, [id]);
  const getEvenDetails = async () => {
    const response = await getDetails(`event/event/${id}`);
    if (response?.statusCode == "200") {
      setEventDetails(response?.data);
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="md:py-4 md:px-16 p-4">
      <Card className="shadow">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-base underline  ">Event Details</h2>
          {eventDetails?.user === user_id && (
            <Link to={`/edit-event/${id}`}>
              <div>
                <Button size="small" type="primary">
                  Edit
                </Button>
              </div>
            </Link>
          )}
        </div>
        <table className="w-full">
          <tbody>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">
                Event Title
              </td>
              <td className="text-gray-700  py-3 w-9/12">
                {eventDetails?.title}
              </td>
            </tr>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">Location</td>
              <td className="text-gray-700  py-3 w-9/12">
                {eventDetails?.location}
              </td>
            </tr>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">
                Start Date
              </td>
              <td className="text-gray-700  py-3 w-9/12">
                {dayjs(eventDetails?.start_time)?.format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">End Date</td>
              <td className="text-gray-700  py-3 w-9/12">
                {dayjs(eventDetails?.end_time)?.format("DD-MM-YYYY")}
              </td>
            </tr>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">
                Description
              </td>
              <td className="text-gray-700  py-3 w-9/12">
                {eventDetails?.description}
              </td>
            </tr>
          </tbody>
        </table>
        {eventDetails?.attendees?.length > 0 && (
          <>
            <br />
            <div className="md:w-[600px] w-full ">
              <h2 className="font-semibold py-2 text-base underline  ">
                Attendees list
              </h2>
              <Table
                columns={[
                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Phone",
                    dataIndex: "phone",
                    key: "phone",
                  },
                ]}
                pagination={false}
                dataSource={eventDetails?.attendees?.map((item: any) => {
                  return {
                    name: item?.name,
                    phone: item?.phone,
                  };
                })}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Details;
