import { ChangeEventHandler, FC } from 'react';
import { ProductOptionPropsType } from '../../../types/types';
import { Col, Form } from 'react-bootstrap';

const ToppingOption: FC<ProductOptionPropsType> = (props) => {
  const { imagePath, name, price, count, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(name, price, e.currentTarget.checked ? '1' : '0');
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          label={name}
          checked={count ? true : false}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
