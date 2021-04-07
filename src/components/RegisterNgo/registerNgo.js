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
            "donationItems":donationItems
        }
        console.log(Ngo);
        // axios.post('https://hooks-practce.firebaseio.com/Ngo.json', Ngo)
        //     .then(response => {
        //         console.log("success");
        //         // props.history.push('/');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    };
    return (
        <div>
            <div>
                <h3 className={classes.head}>Login</h3>
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
                        <Row style={{justifyContent:"center"}}>
                            <DropdownButton  id="dropdown-item-button" title="Donation Items">
                                <Dropdown.Item as="button">Pads</Dropdown.Item>
                                <Dropdown.Item as="button">Domestic Items</Dropdown.Item>
                                <Dropdown.Item as="button">Something else</Dropdown.Item>
                            </DropdownButton>
                        </Row>
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