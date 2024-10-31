import { ChangeEventHandler, FormEventHandler, FunctionComponent } from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';

export interface SummaryFormPropsType {
  accepted: boolean;
  isCreating: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SummaryForm: FunctionComponent<SummaryFormPropsType> = ({
  accepted,
  onSubmit,
  onChange,
  isCreating,
}) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const isSubmitDisabled = !accepted || isCreating;

  return (
    <Form onSubmit={onSubmit} data-testid="summary-form">
      <Form.Group controlId="terms-and-conditions" className="mb-4">
        <Form.Check
          type="checkbox"
          checked={accepted}
          onChange={onChange}
          label={checkboxLabel}
          disabled={isCreating}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
