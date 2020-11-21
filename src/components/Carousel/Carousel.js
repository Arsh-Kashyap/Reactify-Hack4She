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
									src="https://i.postimg.cc/yYdLjKBt/Ngo1-Pix-Teller.png"
									alt="First slide"
								/>
								<Carousel.Caption>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://i.postimg.cc/zXzPbWVC/Ngo2-Pix-Teller.png"
									alt="Third slide"
								/>

								<Carousel.Caption>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://i.postimg.cc/RVtQ0ZT7/Ngo2-Pix-Teller-1.png"
									alt="Third slide"
								/>

								<Carousel.Caption>
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
