import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import classes from "./registerNgo.module.css";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Alert from 'react-bootstrap/Alert';
import { withRouter } from 'react-router-dom';

const FORM = (props) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [donationItems, setDonationItems] = useState([]);
    // const [alerts, setAlerts] = useState(null);
    const login = (e) => {
        e.preventDefault();
        console.log("registering NGO");
        const Ngo = {
            "name": loginUsername,
            "password": loginPassword,
            "city": city,
            "state": state,
            "donationItems": donationItems
        }
        console.log(Ngo);

        axios.post('https://hooks-practce.firebaseio.com/Ngo.json', Ngo)
            .then(response => {
                console.log("success");
                localStorage.setItem('ngoName',loginUsername);
                window.location.assign('/');
                // props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    };
    const pushDonationItems = (item) => {
        let flag = 0;
        donationItems.find((el) => {
            if(el === item)
            {
                flag = 1;
                return;
            }
        })
        if(flag)
            return;
        let tempItems = [...donationItems];
        tempItems.push(item);
        setDonationItems(tempItems);
        console.log(tempItems);
    }
    const deleteItems = (item_id) => {
        let tempItems = donationItems.filter((item,id) => id!=item_id);
        setDonationItems(tempItems);
    }

    let listItems = donationItems.map((item,id) => {
        return <span className = {classes.topictag} onClick={() => deleteItems(id)} key={id}>{item}</span>
    })
    return (
        <div>
            <div>
                <h3 className={classes.head}>NGO Register</h3>
                <Form className={classes.addForm} onSubmit={(e) => login(e)} >
                    <Col>
                        <Row>
                            <Form.Label>Name</Form.Label>
                            <Form.Control required onChange={(event) => setLoginUsername(event.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(event) => setLoginPassword(event.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>City</Form.Label>
                            <Form.Control required onChange={(event) => setCity(event.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>State</Form.Label>
                            <Form.Control required onChange={(event) => setState(event.target.value)} />
                        </Row>
                        <br></br>
                        <Row style={{ justifyContent: "center" }}>
                            <DropdownButton id="dropdown-item-button" title="Donation Items">
                                <Dropdown.Item onClick={() => pushDonationItems("Clothes")} as="button">Clothes</Dropdown.Item>
                                <Dropdown.Item onClick={() => pushDonationItems("Food")} as="button">Food</Dropdown.Item>
                                <Dropdown.Item onClick={() => pushDonationItems("Books")} as="button">Books</Dropdown.Item>
                                <Dropdown.Item onClick={() => pushDonationItems("Tech stuff")} as="button">Tech stuff</Dropdown.Item>
                                <Dropdown.Item onClick={() => pushDonationItems("Sanitation")} as="button">Sanitation</Dropdown.Item>
                            </DropdownButton>
                        </Row>
                        <hr></hr>
                        {listItems}
                        <hr></hr>
                        <Row>
                            <Button variant="success" type="submit" block className={classes.button}>
                                Submit
                            </Button>
                        </Row>
                    </Col>
                </Form>
            </div>
        </div>
    )
}
export default withRouter(FORM);