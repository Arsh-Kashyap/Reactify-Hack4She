import React from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card/Card";

const cards = (props) => {
	return (
		<div>
			<Container>
				{props.ngos.map((ngo,id) => {
					return (
						<Card
							key={id}
							name={ngo.name}
							city={ngo.city}
							state={ngo.state}
							description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
							fund={ngo.fund}
						/>
					);
				})}
			</Container>
		</div>
	);
};

export default cards;
