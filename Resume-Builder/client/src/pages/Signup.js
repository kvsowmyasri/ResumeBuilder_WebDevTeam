import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Col,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

import firebase from "firebase/app";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

const Signup = () => {
  const myStyle = {
    backgroundImage:
      "url(" +
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eB_hGgTLWgasQoY_NbbCs69kROAmqmdWOQ&usqp=CAU" +
      ")",
    width: "90%",
    height: "370px",
    marginTop: "40px",
  };
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

  const handleSignUp = () => {
    if (password !== reenteredPassword) {
      toast("Passwords do not match!", {
        type: "error",
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          context.setUser({ email: res.user.email, uid: res.user.uid });
        })
        .catch((error) => {
          console.log(error);
          toast(error.message, {
            type: "error",
          });
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  if (context.user?.uid) {
    return <Redirect to="/resume" />;
  }
  return (
    <Container className="text-center">
      <Row>
        <Col sm={6} className="col-lg-7" style={{ marginTop: "40px" }}>
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">SignUp here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col sm={12}>
                    <TextField
                      margin="dense"
                      label="Email"
                      variant="outlined"
                      name="email"
                      required
                      style={{ alignItems: "left", width: "80%" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12}>
                    <TextField
                      type="password"
                      margin="dense"
                      label="Password"
                      variant="outlined"
                      name="password"
                      required
                      style={{ alignItems: "left", width: "80%" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12}>
                    <TextField
                      type="password"
                      margin="dense"
                      label="Re-enter Password"
                      variant="outlined"
                      name="reenteredPassword"
                      required
                      style={{ alignItems: "left", width: "80%" }}
                      value={reenteredPassword}
                      onChange={(e) => setReenteredPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00bcd4",
                    color: "#FFFFFF",
                    borderColor: "#00bcd4",
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
        <Col className="col-lg-5 " style={{ paddingRight: "20px" }}>
          {/* <div style={myStyle}><div/> */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eB_hGgTLWgasQoY_NbbCs69kROAmqmdWOQ&usqp=CAU"
            style={myStyle}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
