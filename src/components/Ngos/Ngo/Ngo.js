import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./Ngo.module.css";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SimpleForm from "../../Chatbot/SimpleForm";


const Ngo = (props) => {
	const [showChat, setShowChat]=useState(false);
	const startChat=()=>{
		setShowChat(true);
	}
	const hideChat=()=>{
		setShowChat(false);
	}
	
	const images = ["https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z"];
	const description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
	const [sortedDonations, setSortedDonations] = useState([]);
	const [totalFunding, setTotalFundinng] = useState(0);
	const comp = (a, b) => {
		const first = (parseInt(a['orderData']['amount']));
		const second = (parseInt(b['orderData']['amount']))
		return second - first;
	}
	useEffect(() => {
		let funding = 0;
		let donations = [];
		axios
			.get("https://hooks-practce.firebaseio.com/donations.json")
			.then(async (response) => {
				for (const donation in response.data) {
					if (response.data[donation]["ngo"] === props.name) {
						donations.push(response.data[donation]);
						funding += parseInt(response.data[donation]["orderData"]["amount"]);
					}
				}
				donations = donations.sort(comp);
				donations.splice(5, donations.length - 1);
				console.log(donations);
				setSortedDonations(donations);
				setTotalFundinng(funding);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const imageCarousel = images.map((ele, index) => (
		<Carousel.Item key={index} interval={5000}>
			<img className="d-block w-100" src={ele} alt={props.name} />
			<Carousel.Caption>
				<h3>{props.name}</h3>
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
	let Classes = [classes.App];
		if (showChat) {
			Classes.push(classes.blur);
		}
	return (
		<div >
			<Row className={Classes.join(" ")}>
				<Col lg={8} sm={12}>
					<div className={classes.NgoCard}>
						<Card bg="info" text="white">
							<Card.Header className={classes.CardHeader}>
								{props.name}
							</Card.Header>
							<Card.Body>
								<Carousel>{imageCarousel}</Carousel>
								<hr></hr>
								<Card.Text>{description}</Card.Text>
							</Card.Body>
						</Card>
						<hr></hr>

						<Link to={"/donate/" + props.name}>
							{localStorage.getItem('ngoName') ? null :
								<Button variant="outline-primary" size="lg" block>
									Donate to make a difference
								</Button>
							}
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
			<div className={classes.bot}>
					<div style={{ display: showChat ? "" : "none" }}>
						<SimpleForm></SimpleForm>
					</div>
					{/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
					<div>
						{!showChat ? (
							<button className={classes.btn} onClick={() => startChat()}>
								click to chat...{" "}
							</button>
						) : (
							<button className={classes.btn} onClick={() => hideChat()}>
								click to hide...{" "}
							</button>
						)}
					</div>
				</div>
		</div>
	);
};
export default Ngo;
