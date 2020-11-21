import React, { useContext } from "react";
import { Container,Card,ListGroup, Row, Col } from "react-bootstrap";
import classes from './About.module.css';
import { userContext } from "../../context/userContext";


const About = () => {

	const images = ["https://i.postimg.cc/L5xXnCxQ/Stayfree-Spotlight.jpg","https://i.postimg.cc/hv1Cxxm5/2-Pix-Teller.png"];
	const labels=["Stayfree","Whisper","Whisper"];
	const sponsors = images.map((ele, index) => (
		<Col lg={6} sm={12}>
			<div className={[classes.card,classes.buzzoutonhover].join(" ")}>
			<Card style={{width:"80%", height:"450px", margin:"auto"}}>
					<div className={classes.image}>
					<Card.Img style={{textAlign:"center"}} src={ele}/>
					</div>
					<Card.Header style={{fontSize:"25px"}}><strong>{labels[index]}</strong></Card.Header>
					<ListGroup variant="flush">
						<ListGroup.Item><strong>Provided 100,000+ sanitary pads</strong></ListGroup.Item>
					</ListGroup>
				</Card>
			</div>
		</Col>
	));
	return (
		<div>
			<Container>
				<h1 className={classes.About} style={{textAlign: "center"}}>Our Sponsors</h1>
			<Row>
				{sponsors}
			</Row>
			</Container>
		</div>
	);
};

export default About;
