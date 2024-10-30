import { ChangeEventHandler, FC } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ProductOptionPropsType } from '../../../types/types';

const ScoopOption: FC<ProductOptionPropsType> = (props) => {
  const { imagePath, name, onChange, price, count } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(name, price, e.currentTarget.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" value={count} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
