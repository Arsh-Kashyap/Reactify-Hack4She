import React, { useEffect, useState } from "react";

import NgoContext from "../../context/ngoContext";
import Carousel from "../UI/Carousel/Carousel";
import Cards from "../UI/Cards/Cards";
import axios from "axios";

const Home = () => {
	const [ngoData, setNgoData] = useState("");

	useEffect(() => {
		axios
			.get("https://hooks-practce.firebaseio.com/donations.json")
			.then((res) => {
				let ngoObject = {};
				res = res.data;
				for (let id in res) {
					if (ngoObject[res[id].ngo] === undefined) {
						ngoObject[res[id].ngo] = {};
						ngoObject[res[id].ngo].name = res[id].ngo;
						ngoObject[res[id].ngo].fund = 0;
					}
					ngoObject[res[id].ngo].fund += +res[id].orderData.amount;
				}

				axios
					.get("https://hooks-practce.firebaseio.com/Ngo.json")
					.then((res) => {
						res = res.data
						for (let id in res) {
							if (ngoObject[res[id].name] === undefined) {
								ngoObject[res[id].name] = {};
								ngoObject[res[id].name].name = res[id].name;
								ngoObject[res[id].name].fund = 0;
							}
						}
						let ngoArray = [];
						for (let id in ngoObject)
							ngoArray.push(ngoObject[id]);
						setNgoData(ngoArray);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [ngoData.length]);
	return (
		<div>
			<Carousel />
			{ngoData ? <Cards ngos={ngoData} /> : null}
		</div>
	);
};

export default Home;
