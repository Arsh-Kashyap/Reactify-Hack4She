import React, { useState, createContext, useEffect } from "react";

export const ngoContext = createContext();

export const NgoProvider = (props) => {
	const [ngo, setNgo] = useState(
		[
			{
				name: "NGO1",
				images: ["https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z"],
				fund: 0,
				sortedDonations: [],
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
			},
			{
				name: "NGO2",

				images: ["https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z"],
				fund: 0,
				sortedDonations: [],
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
			},
			{
				name: "NGO3",

				images: ["https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z", "https://tinyurl.com/y6q54o5z"],
				fund: 0,
				sortedDonations: [],
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
			},
		]
	);

	return (
		<ngoContext.Provider value={{ ngo, setNgo }}>
			{props.children}
		</ngoContext.Provider>
	);
};

export default ngoContext;
