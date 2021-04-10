import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
	const [uid, setUid] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	return (
		<userContext.Provider
			value={{
				uid,
				name,
				amount,
				transactions,
				loading,
				setUid,
				setAmount,
				setName,
				setTransactions,
				setLoading,
			}}
		>
			{props.children}
		</userContext.Provider>
	);
};

export default userContext;
