import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";

class Cards extends Component {
	render() {
		let str = "Ngo/" + this.props.name;
		return (
			<div>
				<Card className={classes.Card}>
					<Card.Header as="h5">{this.props.name}</Card.Header>
					<Card.Body>
						<h6>Fund Raised: ₹ {this.props.fund} &nbsp; | &nbsp; Pads Distributed: {Math.floor(this.props.fund / 20)} </h6>
						<Card.Text>{this.props.description}</Card.Text>

						<Link to={{
							pathname: str,
							state: {
								fund: this.props.fund
							}
						}}>
							<Button size="md" variant="info">
								More Details
							</Button>
						</Link>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default Cards;
