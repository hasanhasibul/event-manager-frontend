/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

const { TextArea } = Input;
interface TextAreaControlProps {
  name: string;
  type?: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  row?: number;
}
const TextAreaControl: FC<TextAreaControlProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "",
  maxLength = 1000,
  className = "",
  row = 3,
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div className="relative ">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextArea
            {...field}
            id={name}
            className={`rounded text-xxl ${className}`}
            status={errMsg && "error"}
            rows={row}
            maxLength={maxLength}
            disabled={isDisabled}
            placeholder={placeholder}
            style={{ fontSize: "14px" }}
          />
        )}
      />
      <p className="text-red-500 mt-1">{errMsg}</p>
    </div>
  );
};

export default TextAreaControl;
