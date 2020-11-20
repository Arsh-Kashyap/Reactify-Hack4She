import React from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card/Card";

const cards = (props) => {
	return (
		<div>
			<Container>
				{props.ngos.map((ngo) => {
					return (
						<Card
							key={ngo.name}
							name={ngo.name}
							description={ngo.description}
							fund={ngo.fund}
						/>
					);
				})}
			</Container>
		</div>
	);
};

export default cards;
