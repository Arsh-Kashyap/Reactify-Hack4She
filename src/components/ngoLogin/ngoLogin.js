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
  const login = (e) => {
    e.preventDefault();
    console.log("going on");
    axios({
      method: "POST",
      data: {
        username: loginUsername,
      },
      withCredentials: true,
      url: "/empLogin",
    }).then((res) => {
      localStorage.setItem('username', res.data);
      props.history.push({ pathname: '/employees', data: loginUsername + " is a trusted company!" });
    })
      .catch(err => {
          console.log(err);
      });
  };
  const onChangeHandler = () => {
    props.history.push('/login');
}

  return (
    <div>
      <div>
        <h3 className={classes.head}>Login</h3>
        <Form className={classes.addForm} onSubmit={(e) => login(e)} >
          <Col>
            <Row>
              <Form.Label>Company ID</Form.Label>
              <Form.Control required onChange={(event) => setLoginUsername(event.target.value)} />
            </Row>
            <Row>
              <Button variant="success" type="submit" block className={classes.button}>
                Submit
              </Button>
            </Row>
            <Row>
            <Button onClick={onChangeHandler} size="lg" block style={{fontSize:"15px", width: "100%" }}>Switch to Admin Login</Button>
            </Row>
          </Col>
        </Form>
      </div>
    </div>
  )
}
export default withRouter(FORM);