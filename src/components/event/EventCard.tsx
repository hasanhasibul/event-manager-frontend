/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
interface iProps {
  data: {
    title: string;
    _id: string;
    location: string;
    start_time: string;
  };
  handleRSVP: (e: any, value: string) => void;
}
const EventCard: FC<iProps> = ({ data, handleRSVP }) => {
  return (
    <div className="border cursor-pointer text-center shadow p-4 rounded-md">
      <h2 className="font-semibold text-sm ">{data?.title} </h2>
      <h2 className="font-normal text-sm py-1 ">
        Start Date: {dayjs(data?.start_time)?.format("DD-MM-YYYY")}
      </h2>
      <h2 className="font-normal text-sm ">Location : {data?.location} </h2>
      <div className="mt-2">
        <Button
          onClick={(e) => handleRSVP(e, data?._id)}
          size="small"
          type="primary"
        >
          RSVP
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
