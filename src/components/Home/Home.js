import React, { useEffect, useState } from "react";
import Carousel from "../UI/Carousel/Carousel";
import Cards from "../UI/Cards/Cards";
import axios from "axios";
import { Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import classes from "../RegisterNgo/registerNgo.module.css";
import "./Home.css";

const Home = () => {
  const [ngoData, setNgoData] = useState("");
  const [ngoSearch, setNgoSearch] = useState("");
  const [locSearch, setLocSearch] = useState("");
  const [displayData, setDisplayData] = useState("");
  const [donationItems, setDonationItems] = useState([]);

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

  const hasDonation = (don, donation) => {
    console.log("reached here");
    if (!Array.isArray(don)) return false;
    for (var d of don) {
      for (var f of donation) {
        if (d.toLowerCase().includes(f.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  };

  const filterSearch = (ngo, loc,tempItems) => {
    if (ngo && loc) {
      if (Array.isArray(tempItems) && tempItems.length > 0) {
        setDisplayData(
          ngoData.filter((n) => {
            return (
              n.name.toLowerCase().includes(ngo.toLowerCase()) &&
              (n.city.toLowerCase().includes(loc.toLowerCase()) ||
                n.state.toLowerCase().includes(loc.toLowerCase())) &&
              hasDonation(n.don, tempItems)
            );
          })
        );
      } else {
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
    } else if (ngo) {
      if (Array.isArray(tempItems) && tempItems.length > 0) {
        setDisplayData(
          ngoData.filter((n) => {
            return (
              n.name.toLowerCase().includes(ngo.toLowerCase()) &&
              hasDonation(n.don, tempItems)
            );
          })
        );
      } else {
        setDisplayData(
          ngoData.filter((n) => {
            return n.name.toLowerCase().includes(ngo.toLowerCase());
          })
        );
      }
    } else if (loc) {
      if (Array.isArray(tempItems) && tempItems.length > 0) {
        setDisplayData(
          ngoData.filter((n) => {
            return (
              (n.city.toLowerCase().includes(loc.toLowerCase()) ||
                n.state.toLowerCase().includes(loc.toLowerCase())) &&
              hasDonation(n.don, tempItems)
            );
          })
        );
      } else {
        setDisplayData(
          ngoData.filter((n) => {
            return (
              n.city.toLowerCase().includes(loc.toLowerCase()) ||
              n.state.toLowerCase().includes(loc.toLowerCase())
              // hasDonation(n.don, toSearch.toLowerCase())
            );
          })
        );
      }
    } else {
      if (Array.isArray(tempItems) && tempItems.length > 0) {
        console.log("here");
        setDisplayData(
          ngoData.filter((n) => hasDonation(n.don, tempItems))
        );
      }
      else setDisplayData(ngoData);
    }
  };

  const handleNgoSearch = (e) => {
    setNgoSearch(() => e.target.value);
    filterSearch(e.target.value, locSearch,donationItems);
  };

  const handleLocSearch = (e) => {
    setLocSearch(() => e.target.value);
    filterSearch(ngoSearch, e.target.value,donationItems);
  };

  const pushDonationItems = (item) => {
    let flag = 0;
    donationItems.find((el) => {
      if (el === item) {
        flag = 1;
        return;
      }
    });
    if (flag) return;
    let tempItems = [...donationItems];
    tempItems.push(item);
    setDonationItems(tempItems);
    filterSearch(ngoSearch,locSearch,tempItems);

  };
  const deleteItems = (item_id) => {
    let tempItems = donationItems.filter((item, id) => id !== item_id);
    setDonationItems(tempItems);
    filterSearch(ngoSearch,locSearch,tempItems);
  };

  let listItems = donationItems.map((item, id) => {
    return (
      <span
        className={classes.topictag}
        onClick={() => deleteItems(id)}
        key={id}
      >
        {item}
      </span>
    );
  });

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
            placeholder="Search Location"
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
      <Row style={{ justifyContent: "center" }}>
        <DropdownButton id="dropdown-item-button" title="Donation Items">
          <Dropdown.Item onClick={() => pushDonationItems("Clothes")} as="div">
            Clothes
          </Dropdown.Item>
          <Dropdown.Item onClick={() => pushDonationItems("Food")} as="div">
            Food
          </Dropdown.Item>
          <Dropdown.Item onClick={() => pushDonationItems("Books")} as="div">
            Books
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => pushDonationItems("Tech stuff")}
            as="div"
          >
            Tech stuff
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => pushDonationItems("Sanitation")}
            as="div"
          >
            Sanitation
          </Dropdown.Item>
        </DropdownButton>
      </Row>
      <Row style={{ justifyContent: "center", marginTop: "15px" }}>
        <hr></hr>
        {listItems}
        <hr></hr>
      </Row>
      {displayData ? <Cards ngos={displayData} /> : null}
    </div>
  );
};

export default Home;
