import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
