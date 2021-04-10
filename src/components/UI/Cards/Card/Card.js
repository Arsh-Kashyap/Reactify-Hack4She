import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";

class Cards extends Component {
	render() {
		console.log(this.props.donationItems);
		let items;
		if (this.props.donationItems) {
			items = this.props.donationItems.map((el, id) => {
				if (id === this.props.donationItems.length - 1)
					return <span>{el} </span>;
				return <span>{el}, </span>;
			})
		}
		let str = "Ngo/" + this.props.name;
		return (
			<div>
				<Card className={classes.Card}>
					<Card.Header as="h5">{this.props.name}
						<span className={classes.location}>{this.props.city}, {this.props.state} <img src="https://img.icons8.com/ios-glyphs/30/000000/marker--v2.png" /></span>
					</Card.Header>
					<Card.Body>
						<h6>Fund Raised: ₹ {this.props.fund} &nbsp; </h6>
						<Card.Text>{this.props.description}</Card.Text>
						{items && items.length > 0 ?
							<Card.Text style={{ fontSize: "1.1rem", fontWeight: "500" }}>Donation Items: {items}</Card.Text>
							: null}
						<Link to={{
							pathname: str,
							state: {
								fund: this.props.fund,
								donations: this.props.donations
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
