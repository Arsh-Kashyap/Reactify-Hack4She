import React from "react";
import { Row, Col, Card, ListGroup,Container } from "react-bootstrap";

const NgoTransactions = (props) => {
  const { allDonations } = props.location.state;
  console.log(props.location.state, allDonations);
  return (
    <Container
    style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
    }}
  >
      <h1 style={{textAlign:"center"}}>Donations: </h1>
      <div style={{  width: "100%" }}>
      {allDonations.map((data, ele) => (
        <Row style={{  justifyContent:"center", margin:"15px 25%" }}>
          <Card style={{ boxShadow: "2px 2px 4px #30ffe7", width:"100%"}}>
            <Card.Header style={{ fontSize: "1.2rem" }}>
              <strong style={{ fontSize: "1.2rem" }}>
                Name:
                
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
      
    </Container>
  );
};

export default NgoTransactions;
