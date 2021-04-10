import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

const NgoTransactions = (props) => {
  const { allDonations } = props.location.state;
  console.log(props.location.state, allDonations);
  return (
    <div style={{ marginLeft: "20%", minWidth: "75%" }}>
      <h1>Donations: </h1>
      {allDonations.map((data, ele) => (
        <Row style={{ minWidth: "50%", margin: "20px" }}>
          <Card style={{ boxShadow: "2px 2px 4px #30ffe7" }}>
            <Card.Header style={{ fontSize: "1.2rem" }}>
              <strong style={{ fontSize: "1.2rem" }}>
                Name:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </strong>
              <span style={{ float: "right" }}>{data.name}</span>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ fontSize: "1.2rem" }}>
                <strong style={{ fontSize: "1.2rem" }}>Amount: </strong>
                <span style={{ float: "right" }}>{data.orderData.amount}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <hr></hr>
        </Row>
      ))}
    </div>
  );
};

export default NgoTransactions;
