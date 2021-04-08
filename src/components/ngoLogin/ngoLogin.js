import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import classes from "./ngoLogin.module.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const FORM = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    axios.get("https://hooks-practce.firebaseio.com/Ngo.json")
      .then((response) => {
        const users = response.data;
        let flag = false;
        for (const id in users) {
          const user = users[id];
          if (user["name"] === loginUsername && user["password"] === loginPassword) {
            flag = true;
          }
        }
        if (flag) {
          localStorage.setItem("ngoName", loginUsername);
          window.location.assign('/');
          console.log("logged you in");
        }
        else {
          console.log("you are not authenticated!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    const onChangeHandler = () => {
      props.history.push('/registerNgo');
    }

    return (
      <div>
        <div>
          <h3 className={classes.head}>Login</h3>
          <Form className={classes.addForm} onSubmit={(e) => login(e)} >
            <Col>
              <Row>
                <Form.Label>Username</Form.Label>
                <Form.Control required onChange={(event) => setLoginUsername(event.target.value)} />
              </Row>
              <Row>
                <Form.Label>Password</Form.Label>
                <Form.Control type = "password" required onChange={(event) => setLoginPassword(event.target.value)} />
              </Row>
              <Row>
                <Button variant="success" type="submit" block className={classes.button}>
                  Submit
              </Button>
              </Row>
              <Row>
                <Button onClick={onChangeHandler} size="lg" block style={{ fontSize: "15px", width: "100%" }}>New to our site? Signup Here!</Button>
              </Row>
            </Col>
          </Form>
        </div>
      </div>
    )
  }
  export default withRouter(FORM);