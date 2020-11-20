import React, { useContext } from "react";
import { userContext } from "../../context/userContext";

const Profile = () => {
	const { uid, name, amount, setUid, setName, setAmount } = useContext(
		userContext
	);

	return (
		<div>
			Hello, {name} <br />
			You have donated ₹ {amount} towards the cause.
		</div>
	);
};

export default Profile;
