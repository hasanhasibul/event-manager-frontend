/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface DatePickerProps {
  name: string;
  control: any;
  errors?: any;
  defaultValue?: any;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  allowClear?: boolean;
  checkAdult?: boolean;
  showTime?: boolean;
  picker?: "year" | "date" | "month";
  onChangeField?: () => void;
}
const DatePickerControl: FC<DatePickerProps> = ({
  name,
  control,
  errors,
  disabled = false,
  placeholder = "2022-01-01",
  format = "YYYY-MM-DD hh:mm",
  className = "",
  allowClear = false,
  showTime = false,
  onChangeField,
  picker = "date",
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            allowClear={allowClear}
            {...field}
            id={name}
            className={`!rounded-xs my-1 w-full ${className}`}
            status={errMsg && "error"}
            size="large"
            picker={picker}
            disabled={disabled}
            placeholder={placeholder}
            value={field.value ? dayjs(field.value) : null}
            placement={"bottomLeft"}
            format={format}
            onChange={(e) => {
              onChangeField && onChangeField();
              field.onChange(e ? e.toDate() : null);
            }}
            showTime={showTime}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};

export default DatePickerControl;
