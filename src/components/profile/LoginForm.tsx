import { FieldLabel, Input, Password } from "@/components/common/form-controls";
import { Col, Row } from "antd";
import { useFormContext } from "react-hook-form";

const LoginForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col md={24}>
          <div>
            <div>
              <FieldLabel label="Phone" name="phone" required />
            </div>
            <div>
              <Input
                control={control}
                name="phone"
                errors={errors}
                placeholder="Enter phone"
              />
            </div>
          </div>
        </Col>
        <Col md={24}>
          <div>
            <div>
              <FieldLabel label="Password" name="password" required />
            </div>
            <div>
              <Password
                control={control}
                name="password"
                errors={errors}
                placeholder="Enter password"
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginForm;
