import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Checkout = ({
  signInStep,
  shippingStep,
  paymentStep,
  placeOrderStep,
}) => {
  return (
    <Nav className="justify-content-center mb-4">
      {signInStep && (
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {shippingStep && (
        <Nav.Item>
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping Address</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {paymentStep && (
        <Nav.Item>
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {placeOrderStep && (
        <Nav.Item>
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
    </Nav>
  );
};
