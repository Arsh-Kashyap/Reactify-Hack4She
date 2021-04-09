import React, { useContext, useState,useEffect } from "react";
import { userContext } from "../../context/userContext";
import { Card, ListGroup, Container } from "react-bootstrap";
import Spinner from "../UI/Spinner/Spinner";
import axios from "axios";


const Profile = () => {
	const [transactions,setTransactions]=useState([]);
	const [totalAmount,setTotalAmount]=useState(0);
	const {
		uid,
		name,
		amount,
		loading,
		setUid,
		setName,
		setAmount,
		setLoading,
	} = useContext(userContext);
	console.log(transactions);
	useEffect(()=>{
		let toShow=[];
		let amount=0;
		axios.get("https://hooks-practce.firebaseio.com/donations.json")
		.then((res)=>{
			for(const id in res.data)
			{
				const donation=res.data[id];
				console.log(name,donation["name"]);
				if(donation["name"]===name)
				{
					toShow.push(donation);
					amount+=+donation["orderData"]["amount"];
				}
			}
			console.log(toShow);
			setTotalAmount(amount);
			setTransactions(toShow);
		})
		.catch(err=>{
			console.log(err)
		})
	},[transactions.length]);

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
					You have donated ₹ {totalAmount} towards the cause.
				</h3>
				<div style={{margin:"30px auto", width:"50%"}}>
					
					{transactions.map((data,ele) => (
						<div>
								<Card style={{boxShadow: "2px 2px 4px #30ffe7"}}>
								<Card.Header style={{fontSize:"1.2rem"}}><strong style={{fontSize:"1.2rem"}}>Ngo: </strong><span style={{float:"right"}}>{data.ngo}</span></Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item style={{fontSize:"1.2rem"}}><strong style={{fontSize:"1.2rem"}}>Amount: </strong><span style={{float:"right"}}>{data.orderData.amount}</span></ListGroup.Item>
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
