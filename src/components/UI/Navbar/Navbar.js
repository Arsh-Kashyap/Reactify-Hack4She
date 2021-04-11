import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./Navbar.module.css";
import { userContext } from "../../../context/userContext";
import { firebase, database } from "../../../firebase/firebase";
import axios from "axios";


const NavbarComponent = () => {
	const history = useHistory();
	const [ngoName, setNgoName] = useState("");
	const {
		uid,
		name,
		amount,
		transactions,
		setUid,
		setAmount,
		setName,
		setTransactions,
		setLoading,
	} = useContext(userContext);

		
	const startLogOut = () => {localStorage.removeItem('username');firebase.auth().signOut()};
	useEffect(() => {
		setNgoName(localStorage.getItem('ngoName'));
		firebase.auth().onAuthStateChanged(async (user) => {
			setLoading(true);
			if (user) {
				setName(user.displayName);
				setUid(user.uid);
				await database.ref(`users/${user.uid}`).once("value", (snapshot) => {
					if (snapshot.exists()) {
						setAmount(snapshot.val().amount);
					} else {
						database.ref(`users/${user.uid}`).set({
							name: user.displayName,
							amount: 0,
						});
						setAmount(0);
					}
				});
				const response = await axios.get(
					"https://hooks-practce.firebaseio.com/donations.json"
				);
				const data = response.data;
				let amount = 0;
				setTransactions([]);
				for (let key in data) {
					if (data[key].userId === user.uid) {
						amount += +data[key].orderData.amount;
						setTransactions((prev) => prev.concat(data[key]));
					}
				}
				setAmount(amount);
				if (history.location.pathname === "/login") {
					history.push("/");
				}
			} else {
				setName("");
				setUid("");
				setAmount("");
				history.push("/");
			}
			setLoading(false);
		});
	}, []);

	const logOut = () => {
		console.log("in");
		localStorage.removeItem('ngoName');
		setNgoName(null);
	}
	let showLinks;
	if (!ngoName && !name) {
		showLinks = (<>
			<Link to="/loginNgo">
				<Nav.Link style={{ marginTop: "0.9px" }} eventKey={2} href="/loginNgo">
					Log in Ngo
				</Nav.Link>
			</Link>
			<Link to="/login">
				<Nav.Link style={{ marginTop: "0.9px" }} eventKey={3} href="/login">
					Donor's Login
			</Nav.Link>
			</Link>
		</>)

	}
	else if (ngoName && !name) {
		showLinks = (<>
			<Link to="/ngoProfile">
				<Nav.Link style={{ marginTop: "0.9px" }} eventKey={4} href="/ngoProfile">
					Ngo's Profile
		</Nav.Link>
			</Link>
			<Link>
				<Nav.Link onClick={() => logOut()} style={{ marginTop: "0.9px" }} eventKey={1}>
					Log out
			</Nav.Link>
			</Link>
		</>)
	}
	else if (name && !ngoName) {
		showLinks = (<>
			<Link to="/profile">
				<Nav.Link style={{ marginTop: "0.9px" }} eventKey={4} href="/profile">
					Donor's Profile
		</Nav.Link>
			</Link><Nav.Link
				style={{ marginTop: "0.9px", cursor: "default" }}
				onClick={startLogOut}
			>
				Logout
		</Nav.Link>
		</>)
	}
	return (
		<div>
			<Navbar
				fixed="top"
				className={classes.Navbar}
				collapseOnSelect
				variant="dark"
				expand="sm"
			>
				<Link to="/">
					<Navbar.Brand href="/">
						<img
							style={{ height: "30px", marginRight:"10px" }}
							
							src="https://eastceylon.com/images/2021/04/11/donation-1.png"
						/>{"  "}
						<strong>Bestowed</strong>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Nav>
						<Link to="/about">
							<Nav.Link style={{ marginTop: "0.9px" }} eventKey={0} href="/about">
								About
							</Nav.Link>
						</Link>
						{showLinks}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavbarComponent;
