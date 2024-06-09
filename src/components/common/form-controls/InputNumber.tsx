import { FC } from "react";
import { Controller } from "react-hook-form";
import { InputNumber } from "antd";

interface InputNumberControlProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  msg?: any;
  placeholder?: string;
  max?: number;
  min?: number;
  className?: string;
  step?: number;
  OffCopyPaste?: boolean;
}
const InputNumberControl: FC<InputNumberControlProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "",
  max = 999999999,
  min = 0,
  className = "",
  step = 1,
  OffCopyPaste = false,
  msg = "",
}) => {
  let errMsg = errors?.[name]?.message || msg;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputNumber
            {...field}
            id={name}
            className={`rounded my-1 overflow-hidden wave-money-text ${className}`}
            status={errMsg && "error"}
            size="large"
            max={max}
            min={min}
            step={step}
            onPaste={(e) => {
              OffCopyPaste && e.preventDefault();
            }}
            onCopy={(e) => {
              OffCopyPaste && e.preventDefault();
            }}
            disabled={isDisabled}
            placeholder={placeholder}
            style={{ width: "100%" }}
          />
        )}
      />
      <p className="text-red-500">{errMsg}</p>
    </>
  );
};

export default InputNumberControl;
