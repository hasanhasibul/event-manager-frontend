/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
interface DateRangePickerProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  defaultPickerValue?: [Dayjs, Dayjs] | undefined | null;
}
const DateRangePickerControl: FC<DateRangePickerProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  format = "DD/MM/YYYY",
  className = "",
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RangePicker
            allowClear
            {...field}
            id={name}
            className={`!my-1 !w-full  ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={isDisabled}
            placement={"bottomLeft"}
            // value={defaultPickerValue}
            format={format}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};

export default DateRangePickerControl;
