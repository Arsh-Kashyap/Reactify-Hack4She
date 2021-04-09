import React, { useEffect, useState } from "react";
import Carousel from "../UI/Carousel/Carousel";
import Cards from "../UI/Cards/Cards";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [ngoData, setNgoData] = useState("");
  const [ngoSearch, setNgoSearch] = useState("");
  const [locSearch, setLocSearch] = useState("");
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

  const filterSearch = (ngo,loc) => {
    if (ngo && loc) {
      setDisplayData(
        ngoData.filter((n) => {
          return (
            n.name.toLowerCase().includes(ngo.toLowerCase()) &&
            (n.city.toLowerCase().includes(loc.toLowerCase()) ||
            n.state.toLowerCase().includes(loc.toLowerCase()))
            // hasDonation(n.don, toSearch.toLowerCase())
          );
        })
      );
    }
    else if(ngo)
    {
      setDisplayData(
        ngoData.filter((n) => {
          return (
            n.name.toLowerCase().includes(ngo.toLowerCase())
          );
        })
      );
    }
    else if(loc)
    {
      setDisplayData(
        ngoData.filter((n) => {
          return (
            (n.city.toLowerCase().includes(loc.toLowerCase()) ||
            n.state.toLowerCase().includes(loc.toLowerCase()))
            // hasDonation(n.don, toSearch.toLowerCase())
          );
        })
      );
    }
    else
      setDisplayData(ngoData);
  }

  const handleNgoSearch = (e) => {
    setNgoSearch(() => e.target.value);
    filterSearch(e.target.value,locSearch);
  };

  const handleLocSearch = (e) => {
    setLocSearch(() => e.target.value);
    filterSearch(ngoSearch,e.target.value);
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
            value={ngoSearch}
            onChange={handleNgoSearch}
          ></input>
          <a href="#">
            <img
              class="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="search"
            />
          </a>
        </Col>
        <Col>
          <input
            type="text"
            id="search-bar"
            placeholder="Search NGO"
            value={locSearch}
            onChange={handleLocSearch}
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
