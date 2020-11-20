import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
	const [uid, setUid] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<userContext.Provider
			value={{ uid, name, amount, setUid, setAmount, setName }}
		>
			{props.children}
		</userContext.Provider>
	);
};

export default userContext;
