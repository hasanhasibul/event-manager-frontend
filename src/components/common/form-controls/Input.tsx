/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

interface InputControlProps {
  name: string;
  type?: string;
  control: any;
  errors?: any;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  toUpper?: boolean;
  onChangeField?: () => void;
  OffCopyPaste?: boolean;
  allowClear?: boolean;
}
const InputControl: FC<InputControlProps> = ({
  name,
  type = "text",
  control,
  errors,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  size = "middle",
  defaultValue = "",
  allowClear = true,
}) => {
  const errMsg = msg ? msg : errors?.[name]?.message;

  return (
    <div className="relative w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            allowClear={allowClear}
            {...field}
            type={type}
            id={name}
            className={`rounded my-1 py-2 w-full ${className} `}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
      />
      <p className="text-red-500">{errMsg}</p>
    </div>
  );
};

export default InputControl;
