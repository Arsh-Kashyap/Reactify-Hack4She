import React, { useContext } from "react";
import { Container,Card,ListGroup, Row, Col } from "react-bootstrap";
import classes from './About.module.css';
import { userContext } from "../../context/userContext";


const About = () => {

	const images = ["https://img.icons8.com/color/452/hyundai.png","https://e7.pngegg.com/pngimages/33/16/png-clipart-jio-logo-jio-reliance-digital-business-logo-mobile-phones-business-blue-text.png"];
	const labels=["Hyundai","Jio"];
	const sponsors = images.map((ele, index) => (
		<Col lg={6} sm={12}>
			<div className={[classes.card,classes.buzzoutonhover].join(" ")}>
			<Card style={{width:"80%", height:"450px", margin:"auto"}}>
					<div className={classes.image}>
					<Card.Img style={{textAlign:"center"}} src={ele}/>
					</div>
					<Card.Header style={{fontSize:"25px"}}><strong>{labels[index]}</strong></Card.Header>
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
