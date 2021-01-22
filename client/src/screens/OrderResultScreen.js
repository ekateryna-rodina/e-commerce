import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOrderById, payOrder } from "../actions/orderActions";
import { Loader } from "../components/Loader";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/types";
import { PayPalButton } from "react-paypal-button-v2";

export const OrderResultScreen = ({ match }) => {
  const [payPalScriptReady, setPayPalScriptReady] = useState(false);
  const orderResult = useSelector((state) => state.order);

  const {
    orderInfo,
    loading,
    error,
    successPayment,
    loadingPayment,
  } = orderResult;
  const dispatch = useDispatch();
  const orderId = match.params.id;

  useEffect(() => {
    const renderPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // add paypal script dinamically
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      console.log(script.src);
      script.onLoad = () => {
        setPayPalScriptReady(true);
      };
      document.body.appendChild(script);
    };
    if (!orderInfo || successPayment) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderById(orderId));
    } else if (!orderInfo.isPaid) {
      if (!window.paypal) {
        renderPayPalScript();
      } else {
        setPayPalScriptReady(true);
      }
    }
  }, [dispatch, orderId, successPayment]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return error ? (
    <Message variant="danger">{error}</Message>
  ) : loading ? (
    <Loader></Loader>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>Your order number is #{orderInfo._id}</h4>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping information</h2>
              <p>
                <strong>Address:</strong> {orderInfo.shippingAddress.address},{" "}
                {orderInfo.shippingAddress.city},{" "}
                {orderInfo.shippingAddress.state},{" "}
                {orderInfo.shippingAddress.country},{" "}
                {orderInfo.shippingAddress.postalCode}
              </p>
              {orderInfo.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderInfo.deliveredAt}
                </Message>
              ) : (
                <Message variant="info">
                  Your order has not been delivered yet
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Method:</strong> {orderInfo.paymentMethod}
              </p>
              {orderInfo.isPaid ? (
                <Message variant="success">Paid on {orderInfo.paidAt}</Message>
              ) : (
                <Message variant="info">
                  Your order has not been payed yet
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Your items</h2>
              {orderInfo.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderInfo.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
                  <Col>${orderInfo.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${orderInfo.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping price:</strong>
                  </Col>
                  <Col>${orderInfo.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>TOTAL:</strong>
                  </Col>
                  <Col>${orderInfo.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!orderInfo.isPaid && (
                <ListGroup.Item>
                  {loadingPayment && <Loader />}
                  {!payPalScriptReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderInfo.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
