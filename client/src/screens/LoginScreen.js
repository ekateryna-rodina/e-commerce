import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import Message from "../components/Message";
import { Loader } from "../components/Loader";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();
  // redirect if logged in

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader></Loader>}
          <Form onSubmit={onLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Link to="/register">Forgot password?</Link>
            </Form.Group>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center py-3">
        <Col xs={12} md={6}>
          Not a member?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register now
          </Link>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
