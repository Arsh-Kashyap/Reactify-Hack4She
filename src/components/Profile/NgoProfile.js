import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./NgoProfile.module.css";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Ngo = (props) => {
  const images = [
    "https://tinyurl.com/y6q54o5z",
    "https://tinyurl.com/y6q54o5z",
    "https://tinyurl.com/y6q54o5z",
  ];
  const description =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
  const [sortedDonations, setSortedDonations] = useState([]);
  const [totalFunding, setTotalFundinng] = useState(0);
  const [allDonations, setAllDonations] = useState([]);
  const comp = (a, b) => {
    const first = parseInt(a["orderData"]["amount"]);
    const second = parseInt(b["orderData"]["amount"]);
    return second - first;
  };
  useEffect(() => {
    let funding = 0;
    let donations = [];
    axios
      .get("https://hooks-practce.firebaseio.com/donations.json")
      .then(async (response) => {
        for (const donation in response.data) {
          if (
            response.data[donation]["ngo"] === localStorage.getItem("ngoName")
          ) {
            donations.push(response.data[donation]);
            funding += parseInt(response.data[donation]["orderData"]["amount"]);
          }
        }
        setAllDonations(donations);
        donations = donations.sort(comp);
        donations.splice(5, donations.length - 1);

        setSortedDonations(donations);
        setTotalFundinng(funding);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const imageCarousel = images.map((ele, index) => (
    <Carousel.Item key={index} interval={5000}>
      <img
        className="d-block w-100"
        src={ele}
        alt={localStorage.getItem("ngoName")}
      />
      <Carousel.Caption>
        <h3>{localStorage.getItem("ngoName")}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ));
  const TopContributors = sortedDonations.map((ele, index) => {
    return (
      <ListGroupItem key={index}>
        {ele["name"]}: ₹{ele["orderData"]["amount"]}
      </ListGroupItem>
    );
  });

  let allTransactions = allDonations.map((data, ele) => (
    <div>
      <Card style={{ boxShadow: "2px 2px 4px #30ffe7" }}>
        <Card.Header style={{ fontSize: "1.2rem" }}>
          <strong style={{ fontSize: "1.2rem" }}>Name: </strong>
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
    </div>
  ));
  return (
    <div>
      <Row>
        <Col lg={8} sm={12}>
          <div className={classes.NgoCard}>
            <Card bg="info" text="white">
              <Card.Header className={classes.CardHeader}>
                {localStorage.getItem("ngoName")}
              </Card.Header>
              <Card.Body>
                <Carousel>{imageCarousel}</Carousel>
                <hr></hr>
                <Card.Text>{description}</Card.Text>
              </Card.Body>
            </Card>
            <hr></hr>
            <Col>
              <Link to={{ pathname: "/transactions", state: { allDonations } }}>
                <Button size="lg" variant="primary" block>
                  All transactions
                </Button>
              </Link>
            </Col>
          </div>
        </Col>
        <Col lg={4} sm={12}>
          <Card
            border="success"
            className={classes.Card}
            style={{ width: "18rem" }}
          >
            <Card.Header className={classes.SideCardHeader}>
              <p>Total funding recieved: ₹{totalFunding}</p>
              <p>Pads Distibuted: {Math.floor(totalFunding / 20)}</p>
            </Card.Header>
            <Card.Body>
              <Card.Title>Top Contributions</Card.Title>
              <ListGroup className="list-group-flush">
                {TopContributors}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Ngo;
