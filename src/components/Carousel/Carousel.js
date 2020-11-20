import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Carousel.module.css";

const caraousel = () => {
	return (
		<div>
			<Container>
				<Row>
					<Col md={0} lg={2}></Col>
					<Col sm={12} md={12} lg={8}>
						<Carousel className={classes.Carousel}>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://thebetterindia-english.sgp1.digitaloceanspaces.com/uploads/2018/06/NGO-f.jpg"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>
										Nulla vitae elit libero, a pharetra augue mollis interdum.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://thebetterindia-english.sgp1.digitaloceanspaces.com/uploads/2018/06/NGO-f.jpg"
									alt="Third slide"
								/>

								<Carousel.Caption>
									<h3>Second slide label</h3>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://thebetterindia-english.sgp1.digitaloceanspaces.com/uploads/2018/06/NGO-f.jpg"
									alt="Third slide"
								/>

								<Carousel.Caption>
									<h3>Third slide label</h3>
									<p>
										Praesent commodo cursus magna, vel scelerisque nisl
										consectetur.
									</p>
								</Carousel.Caption>
							</Carousel.Item>
						</Carousel>
					</Col>
					<Col md={0} lg={2}></Col>
				</Row>
			</Container>
		</div>
	);
};

export default caraousel;
