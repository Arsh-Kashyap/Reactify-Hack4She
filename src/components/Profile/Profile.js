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
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					flexDirection: "column",
				}}
			>
				<h3 style={{ textAlign:'center', fontFamily: "Arial",height: "100%", width: "100%" }}>
					Hello, {name} <br />
					You have donated ₹ {amount} towards the cause.
				</h3>
				<div style={{margin:"30px auto", width:"50%"}}>
					
					{transactions.map((data,ele) => (
						<div>
								<Card style={{boxShadow: "2px 2px 4px #30ffe7"}}>
								<Card.Header><strong style={{fontSize:"1.2rem"}}>{data.ngo}</strong></Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>{data.orderData.amount}</ListGroup.Item>
								</ListGroup>
								</Card>
								<hr></hr>
						
				
						</div>
					))}
					
				</div>
			</Container>
		);
};

export default Profile;
