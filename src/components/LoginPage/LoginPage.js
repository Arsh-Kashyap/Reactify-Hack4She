import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { firebase, googleProvider, database } from "../../firebase/firebase";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const LoginPage = () => {
	const { uid, name, amount, setUid, setName, setAmount } = useContext(
		userContext
	);

	const history = useHistory();

	const startLogin = () => {
		firebase
			.auth()
			.signInWithPopup(googleProvider)
			.then((res) => {
				setName(res.user.displayName);
				setUid(res.user.uid);
				database.ref(`users/${res.user.uid}`).once("value", (snapshot) => {
					if (snapshot.exists()) {
						setAmount(snapshot.val().amount);
					} else {
						database.ref(`users/${res.user.uid}`).set({
							name: res.user.displayName,
							amount: 0,
						});
						setAmount(0);
					}
				});
				console.log(uid,name);
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	};

	return (
		<Container
			style={{
				height: "90vh",
				width: "90vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				boxSizing: "border-box",
			}}
		>
			<Button size="lg" variant="info" onClick={startLogin}>
				Login with Google
			</Button>
		</Container>
	);
};

export default LoginPage;
