import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./Navbar.module.css";
import { userContext } from "../../context/userContext";
import { firebase, database } from "../../firebase/firebase";

const NavbarComponent = () => {
	const history = useHistory();
	const { name, setName, setUid, setAmount } = useContext(userContext);

	const startLogOut = () => firebase.auth().signOut();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			setName(user.displayName);
			setUid(user.uid);
			database.ref(`users/${user.uid}`).once("value", (snapshot) => {
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
			if (history.location.pathname === "/login") {
				history.push("/");
			}
		} else {
			console.log("logout");
			setName("");
			setUid("");
			setAmount("");
			history.push("/");
		}
	});

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
					<Navbar.Brand href="/">Reactify</Navbar.Brand>
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
