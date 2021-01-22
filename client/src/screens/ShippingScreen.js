import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/userDetailsActions";
import { Checkout } from "../components/Checkout";

export const ShippingScreen = ({ history }) => {
  const user = useSelector((state) => state.user);
  const shippingDetails = useSelector((state) => state.userShippingDetails);
  const { shippingAddress } = shippingDetails;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [saveDefault, setSaveDefault] = useState(true);

  const dispatch = useDispatch();

  const onShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        country,
        postalCode,
        saveDefault,
      })
    );
    // move to payment
    history.push("/payment");
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Shipping address</h1>
          <Form onSubmit={onShippingSubmit}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="county">
              <Form.Label>County</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter county"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal code</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter zip code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="saveAddressAsDefault">
              <Form.Check
                type="checkbox"
                label="Save as default"
                checked={saveDefault}
                onChange={(e) => setSaveDefault(e.target.value)}
              />
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

export default ShippingScreen;
