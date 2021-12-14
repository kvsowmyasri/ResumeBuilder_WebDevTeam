import React, { Component } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import axios from "axios";
import { saveAs } from "file-saver";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { UserContext } from "../context/UserContext";

import "firebase/firestore";
import { fire } from "../Config/firebaseConfig";

const db = fire.firestore();
const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 1.5,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = { skill: "" };
  }
  static contextType = UserContext;
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleOnChange = (e) => {
    this.setState({
      skill: e.target.value,
    });
  };
  createAndDownloadPDF = () => {
    axios
      .post("/create-pdf", this.props.values)
      .then(() => {
        axios
          .get("fetch-pdf", { responseType: "arraybuffer" })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${this.props.values.firstname}'s Resume.pdf`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async saveToDB() {
    const response = await fetch(
      "https://project-32aa3-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(this.props.values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    console.log(data);
  }
  getFromDB() {
    fetch("https://project-32aa3-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //data.filter(data.email === mail)
        const keyValues = Object.keys(data);
        for (let i = 0; i < keyValues.length; i++) {
          const key = String(keyValues[i]);
          console.log(key);
          if (data[key].email === this.props.values.email) {
            console.log(data[key]);
          }
        }
      });
  }
  render() {
    const { values } = this.props;
    const { classes } = this.props;
    let value = this.context;
    const getData = async (query) => {
      await axios
        .get(
          `https://emsiservices.com/skills/versions/latest/skills?q=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNDNjZCRjIzMjBGNkY4RDQ2QzJERDhCMjI0MEVGMTFENTZEQkY3MUYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJQR2FfSXlEMi1OUnNMZGl5SkE3eEhWYmI5eDgifQ.eyJuYmYiOjE2MzY5OTIyOTUsImV4cCI6MTYzNjk5NTg5NSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20iLCJhdWQiOlsiZW1zaV9vcGVuIiwiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20vcmVzb3VyY2VzIl0sImNsaWVudF9pZCI6Imd0M3VyYzdqaHc0M2o4MWIiLCJlbWFpbCI6InNvd215YWtvdGEwN0BnbWFpbC5jb20iLCJjb21wYW55IjoidW1rYyIsIm5hbWUiOiJWRU5LQVRBIFNPV01ZQVNSSSBLT1RBIiwiaWF0IjoxNjM2OTkyMjk1LCJzY29wZSI6WyJlbXNpX29wZW4iXX0.cQ0guGp9clLmumfolUsgWVbYcfDHz0c85nhk4YYBRJqvDZKM71A7cXoUynZYHBbSgUE-cE2NmiAaOR0fvYpwQFHT4UnApF2_iPJl8gShLfpxW7-e_ornLhSu18_rUreikH8wfftscYJ9gDw3f48bNLpu8yomTmBZOskOnbUofAJgX9HULrfKKcAvyXf7MtGNOmtQsTGuOIVKbQZmoJRoUbfDAYTfGzkSbSObFI-VlanRawbk2lBfs_OQDhp1hTu-p7GY9x7NK-EJ1xL22PrriX-zv_9Cd_vN6LTTAD6WEBPDBI7D9VK1RdtJa5aRjq84YAyf0crbcGgZ7yL32wL7LQ",
            },
          }
        )
        .then((data) => {
          console.log(data.data);
          const skills = data.data;
          values.skill1 = skills.data[0].name;
          values.skill2 = skills.data[1].name;
          values.skill3 = skills.data[2].name;
          values.skill4 = skills.data[3].name;
          values.skill5 = skills.data[4].name;
          values.skill6 = skills.data[5].name;
          this.forceUpdate();
        })
        .catch((err) => alert(err));
    };
    return (
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Extra Details" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="center" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Skills/Languages</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill1"
                  label="Skill 1"
                  style={{ width: "90%" }}
                  value={values.skill1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill2"
                  label="Skill 2"
                  style={{ width: "90%" }}
                  value={values.skill2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill3"
                  label="Skill 3"
                  style={{ width: "90%" }}
                  value={values.skill3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill4"
                  label="Skill 4"
                  style={{ width: "90%" }}
                  value={values.skill4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill5"
                  label="Skill 5"
                  style={{ width: "90%" }}
                  value={values.skill5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Skill 6"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="skill6"
                  value={values.skill6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid container spacing={2} alignItems="flex-start" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Interest</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 1"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest1"
                  value={values.interest1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 2"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest2"
                  value={values.interest2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 3"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest3"
                  value={values.interest3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 4"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest4"
                  value={values.interest4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 5"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest5"
                  value={values.interest5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 6"
                  variant="outlined"
                  style={{ width: "90%" }}
                  name="interest6"
                  value={values.interest6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <Container className={classes.margin}>
          <Row>
            <Col xs={2} />
            <Col xs={2}>
              <TextField
                margin="dense"
                label="skill"
                variant="outlined"
                style={{ width: "100%" }}
                name="skill"
                value={this.state.skill}
                onChange={this.handleOnChange}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
                onClick={() => getData(this.state.skill)}
              >
                {" "}
                Get Skill
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
                onClick={this.back}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                disabled
                style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
                onClick={this.continue}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
            onClick={this.createAndDownloadPDF}
            endIcon={<GetAppIcon />}
          >
            Download Resume
          </Button>
          {/* <Col xs={2}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
              onClick={() => {
                this.saveToDB(value);
              }}
            >
              Save Details
            </Button>
          </Col> */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
            onClick={() => {
              this.saveToDB(value);
            }}
            endIcon={<GetAppIcon />}
          >
            Save Details
          </Button>
          <Col xs={2}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
              onClick={() => {
                this.getFromDB();
              }}
            >
              GET Details
            </Button>
          </Col>
        </Container>
        <p className="text-center text-muted">Page 5</p>
      </Paper>
    );
  }
}

export default withStyles(styles)(Experience);
