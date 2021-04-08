import React, { useEffect, useState } from "react";

import NgoContext from "../../context/ngoContext";
import Carousel from "../UI/Carousel/Carousel";
import Cards from "../UI/Cards/Cards";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [ngoData, setNgoData] = useState("");
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState("");

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
            res = res.data;
            for (let id in res) {
              if (ngoObject[res[id].name] === undefined) {
                ngoObject[res[id].name] = {};
                ngoObject[res[id].name].name = res[id].name;
                ngoObject[res[id].name].fund = 0;
              }
              ngoObject[res[id].name].city = res[id].city;
              ngoObject[res[id].name].state = res[id].state;
              ngoObject[res[id].name].don = res[id].donationItems;
            }
            let ngoArray = [];
            for (let id in ngoObject) ngoArray.push(ngoObject[id]);
            setNgoData(ngoArray);
            setDisplayData(ngoArray);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hasDonation = (don, search) => {
    if (!Array.isArray(don)) return false;
    for (var d of don) {
      if (d.toLowerCase().includes(search)) {
        return true;
      }
    }
    return false;
  };

  const handleSearch = (e) => {
    setSearch(() => e.target.value);
    if (search !== "") {
      setDisplayData(
        ngoData.filter((n) => {
          return (
            n.name.toLowerCase().includes(search.toLowerCase()) ||
            n.city.toLowerCase().includes(search.toLowerCase()) ||
            n.state.toLowerCase().includes(search.toLowerCase()) ||
            hasDonation(n.don, search.toLowerCase())
          );
        })
      );
    }
  };

  return (
    <div>
      <Carousel />
      <Row style={{ margin: "20px", maxHeight: "50px" }}>
        <Col xs={1} md={3}></Col>
        <Col>
          <input
            type="text"
            id="search-bar"
            placeholder="Search NGO"
            value={search}
            onChange={handleSearch}
          ></input>
          <a href="#">
            <img
              class="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="search"
            />
          </a>
        </Col>
        <Col xs={1} md={3}></Col>
      </Row>
      {displayData ? <Cards ngos={displayData} /> : null}
    </div>
  );
};

export default Home;
