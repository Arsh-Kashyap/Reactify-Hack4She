import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NgoContext from "../../../context/ngoContext";
import classes from "./Ngo.module.css";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Ngo = (props) => {
	let ngoUse = useContext(NgoContext);
	let ngo = ngoUse.ngo;
	useEffect(() => {
		axios
			.get("https://hooks-practce.firebaseio.com/donations.json")
			.then((response) => {
				let ngoData = [...ngo];
				var sortable = {
					NGO1: [],
					NGO2: [],
					NGO3: [],
				};
				for (let key in response.data) {
					sortable[response.data[key].ngo].push([
						response.data[key].name,
						+response.data[key].orderData.amount,
					]);
				}

				for (let key in sortable) {
					sortable[key].sort((a, b) => {
						return b[1] - a[1];
					});
					const index = ngoData.findIndex((x) => x.name === key);
					ngoData[index].sortedDonations = sortable[key];
					ngoData[index].sortedDonations.splice(
						5,
						ngoData[index].sortedDonations.length - 1
					);
				}
				ngoUse.setNgo(ngoData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const imageCarousel = props.info.images.map((ele, index) => (
		<Carousel.Item key={index} interval={5000}>
			<img className="d-block w-100" src={ele} alt={props.info.name} />
			<Carousel.Caption>
				<h3>{props.info.name}</h3>
			</Carousel.Caption>
		</Carousel.Item>
	));
	const TopContributors = props.info.sortedDonations.map((ele, index) => {
		return (
			<ListGroupItem key={index}>
				{ele[0]}: ₹{ele[1]}
			</ListGroupItem>
		);
	});
	return (
		<div>
			<Row>
				<Col lg={8} sm={12}>
					<div className={classes.NgoCard}>
						<Card bg="info" text="white">
							<Card.Header className={classes.CardHeader}>
								{props.info.name}
							</Card.Header>
							<Card.Body>
								<Carousel>{imageCarousel}</Carousel>
								<hr></hr>
								<Card.Text>{props.info.description}</Card.Text>
							</Card.Body>
						</Card>
						<hr></hr>

						<Link to={"/donate/" + props.info.name}>
							<Button  variant="outline-primary" size="lg" block>
								Donate to make a difference
							</Button>
							<Button  variant="outline-danger" size="lg" block>
								Request pads for your society
							</Button>
						</Link>

						<hr></hr>
					</div>
				</Col>
				<Col lg={4} sm={12}>
					<Card
						border="success"
						className={classes.Card}
						style={{ width: "18rem" }}
					>
						<Card.Header className={classes.SideCardHeader}>
							<p>Total funding recieved: ₹{props.info.fund}</p>
							<p>Pads Distibuted: {Math.floor(props.info.fund / 20)}</p>
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
