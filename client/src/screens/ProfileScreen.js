import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/types";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  //   user profile
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  //   user login
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  //   user update profile
  //   user profile
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserProfile("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user, userInfo, userUpdateProfile]);

  const setMessageWithMessageTimeout = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const onUpdate = (e) => {
    // prevent from reload
    e.preventDefault();
    if (password === "") {
      setMessageWithMessageTimeout("Please enter your password");
    } else if (password !== confirmPassword) {
      setMessageWithMessageTimeout("Passwords do not much");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }, 5000);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>My Details</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">User profile is updated</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={onUpdate}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
