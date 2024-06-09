import {
  DatePicker,
  FieldLabel,
  Input,
  TextArea,
} from "@/components/common/form-controls";
import { Col, Row } from "antd";
import { useFormContext } from "react-hook-form";

const EventForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col sm={24} xs={24} md={12}>
          <div>
            <div>
              <FieldLabel label="Title" name="title" required />
            </div>
            <div>
              <Input
                control={control}
                name="title"
                errors={errors}
                placeholder="Enter event title"
              />
            </div>
          </div>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <div>
            <div>
              <FieldLabel label="Location" name="location" required />
            </div>
            <div>
              <Input
                control={control}
                name="location"
                errors={errors}
                placeholder="Enter event location"
              />
            </div>
          </div>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <div>
            <div>
              <FieldLabel label="Start Date" name="start_time" required />
            </div>
            <div>
              <DatePicker
                control={control}
                name="start_time"
                errors={errors}
                showTime={false}
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <div>
            <div>
              <FieldLabel label="End Date" name="end_time" required />
            </div>
            <div>
              <DatePicker
                control={control}
                name="end_time"
                errors={errors}
                showTime={false}
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>
        </Col>
        <Col sm={24} xs={24} md={24}>
          <div>
            <div>
              <FieldLabel label="Description" name="description" required />
            </div>
            <div>
              <TextArea
                row={4}
                control={control}
                name="description"
                errors={errors}
                placeholder="Enter event description"
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EventForm;
