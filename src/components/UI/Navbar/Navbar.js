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

	const startLogOut = () => firebase.auth().signOut();
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
							style={{ height: "30px" }}
							src="https://img.icons8.com/color/48/000000/pad.png"
						/>{" "}
						<strong>Paddify</strong>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Nav>
						{name === "" ? (
							<p />
						) : (
							<Link to="/profile">
								<Nav.Link style={{ marginTop: "0.9px" }} eventKey={2} href="/">
									Profile
								</Nav.Link>
							</Link>
						)}
						<Link to="/about">
							<Nav.Link style={{ marginTop: "0.9px" }} eventKey={2} href="/">
								About
							</Nav.Link>
						</Link>
						{ngoName ?
							<Link to="/registerNgo">
								<Nav.Link onClick={() => logOut()} style={{ marginTop: "0.9px" }} eventKey={2}>
									Log out
								</Nav.Link>
							</Link>
							:
							<>
								<Link to="/loginNgo">
									<Nav.Link onClick={() => logOut()} style={{ marginTop: "0.9px" }} eventKey={2}>
										Log in Ngo
									</Nav.Link>
								</Link>

								<Link to="/registerNgo">
									<Nav.Link style={{ marginTop: "0.9px" }} eventKey={2} href="/">
										Register NGO
									</Nav.Link>
								</Link>
							</>
						}

						{name === "" ? (
							<Link to="/login">
								<Nav.Link style={{ marginTop: "0.9px" }} href="/">
									Login/Signup
								</Nav.Link>
							</Link>
						) : (
							<Nav.Link
								style={{ marginTop: "0.9px", cursor: "default" }}
								onClick={startLogOut}
							>
								Logout
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavbarComponent;
