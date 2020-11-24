import React, { useEffect, useContext } from "react";

import NgoContext from "../../context/ngoContext";
import Carousel from "../UI/Carousel/Carousel";
import Cards from "../UI/Cards/Cards";
import axios from "axios";

const Home = () => {
	const ngoContext = useContext(NgoContext);

	useEffect(() => {
		axios
			.get("https://hooks-practce.firebaseio.com/donations.json")
			.then((response) => {
				let ngoData = [...ngoContext.ngo];
				for (let key in ngoData) {
					ngoData[key].fund = 0;
				}
				for (let key in response.data) {
					let ngoName = response.data[key].ngo;
					const index = ngoData.findIndex((x) => x.name === ngoName);
					ngoData[index].fund += +response.data[key].orderData.amount;
				}
				ngoContext.setNgo(ngoData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<Carousel />
			<Cards ngos={ngoContext.ngo} />
		</div>
	);
};

export default Home;
