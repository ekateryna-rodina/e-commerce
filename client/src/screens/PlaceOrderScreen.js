import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

export const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.userShippingDetails);
  const { paymentMethod } = useSelector((state) => state.userPaymentDetails);
  const dispatch = useDispatch();
  const orderResult = useSelector((state) => state.order);
  const { orderInfo, success, error } = orderResult;
  // track if order is successfull
  useEffect(() => {
    if (success) {
      history.push(`/orders/${orderInfo._id}`);
    }
    // eslint-disable-next-line
  }, [success, history]);
  const onPlaceOrder = (e) => {
    console.log("cr");
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        shippingPrice: shippingPrice,
        itemsPrice: totalItemsPrice,
        taxPrice: taxPrice,
        total: total,
      })
    );
  };
  const totalItemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const taxPrice = Number(totalItemsPrice * 0.05).toFixed(2);
  const shippingPrice = (totalItemsPrice > 150 ? 0 : 12).toFixed(2);
  const total = [totalItemsPrice, taxPrice, shippingPrice]
    .map((i) => Number(i))
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  return (
    <Row md={8}>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping information</h2>
            <p>
              <strong>Address:</strong> {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.state},{" "}
              {shippingAddress.country}, {shippingAddress.postalCode}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment method</h2>
            <strong>Method:</strong> {paymentMethod}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Your items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card style={{ border: "none" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Items price:</strong>
                </Col>
                <Col>${totalItemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Tax:</strong>
                </Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Shipping price:</strong>
                </Col>
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>TOTAL:</strong>
                </Col>
                <Col>${total}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
                onClick={onPlaceOrder}
              >
                Place order
              </Button>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
