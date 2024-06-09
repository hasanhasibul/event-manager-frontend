import { Spin } from "antd";
export const LoadingSpiner = () => {
  return (
    <div className="h-full w-full flex justify-center  mt-28 mb-14 z-50">
      <Spin size="large" />
    </div>
  );
};
