import React, { useContext } from "react";
import { userContext } from "../../context/userContext";

const About = () => {
	const { uid, name, amount, setUid, setName, setAmount } = useContext(
		userContext
	);

	return (
		<div>
			<h1>Hello</h1>

			{name}
		</div>
	);
};

export default About;
