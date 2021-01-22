import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/userDetailsActions";

export const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const onPaymentMethodSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // move to place order
    history.push("/placeorder");
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Payment method</h1>
          <Form onSubmit={onPaymentMethodSubmit}>
            <Form.Group>
              <Form.Label as="legend"></Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Google Pay"
                  id="GooglePay"
                  name="paymentMethod"
                  value="GooglePay"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Save and continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
