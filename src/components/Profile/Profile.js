import React, { useContext, useState } from "react";
import { userContext } from "../../context/userContext";
import { Card, ListGroup, Container } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";

const Profile = () => {
	const {
		uid,
		name,
		amount,
		loading,
		transactions,
		setUid,
		setName,
		setAmount,
		setLoading,
	} = useContext(userContext);
	console.log(transactions);

	if (loading) {
		return (
			<Container style={{ marginTop: "200px" }}>
				<Spinner />
			</Container>
		);
	} else
		return (
			<Container className="justify-content-center">
				Hello, {name} <br />
				You have donated ₹ {amount} towards the cause.
				{transactions.map((data) => (
					<div>
						<Card style={{ width: "18rem" }}>
							<Card.Header>{data.ngo}</Card.Header>
							<ListGroup variant="flush">
								<ListGroup.Item>{data.orderData.amount}</ListGroup.Item>
							</ListGroup>
						</Card>
						<hr></hr>
					</div>
				))}
			</Container>
		);
};

export default Profile;
