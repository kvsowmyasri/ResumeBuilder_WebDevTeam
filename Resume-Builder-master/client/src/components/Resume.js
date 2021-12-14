import React, { Component } from "react";
import Profile from "./Profile";
import Education from "./Education";
import Projects from "./Projects";
import Experience from "./Experience";
import Extras from "./Extras";
import { Button } from "@material-ui/core";

export class Resume extends Component {
  state = {
    step: 1,
    // Personal Profile Details...
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    website: "",

    // Education Information
    college: "",
    fromyear1: "",
    toyear1: "",
    qualification1: "",
    description1: "",
    school: "",
    fromyear2: "",
    toyear2: "",
    qualification2: "",
    description2: "",

    // Project Information...
    title1: "",
    link1: "",
    projectDescription1: "",
    title2: "",
    link2: "",
    projectDescription2: "",
    title3: "",
    link3: "",
    projectDescription3: "",

    // Experience Information
    institute1: "",
    position1: "",
    duration1: "",
    experienceDescription1: "",
    institute2: "",
    position2: "",
    duration2: "",
    experienceDescription2: "",

    // Extra Information
    skill1: "",
    skill2: "",
    skill3: "",
    skill4: "",
    skill5: "",
    skill6: "",
    interest1: "",
    interest2: "",
    interest3: "",
    interest4: "",
    interest5: "",
    interest6: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
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
          if (data[key].email === this.props.location.state.id) {
            const filterdData = data[key];
            console.log("user data", filterdData);
            this.setState({
              firstname: filterdData.firstname,
              lastname: filterdData.lastname,
              email: filterdData.email,
              phone: filterdData.phone,
              github: filterdData.github,
              linkedin: filterdData.linkedin,
              facebook: filterdData.facebook,
              instagram: filterdData.instagram,
              twitter: filterdData.twitter,
              website: filterdData.website,

              // Education Information
              college: filterdData.college,
              fromyear1: filterdData.fromyear1,
              toyear1: filterdData.toyear1,
              qualification1: filterdData.qualification1,
              description1: filterdData.description1,
              school: filterdData.school,
              fromyear2: filterdData.fromyear2,
              toyear2: filterdData.toyear2,
              qualification2: filterdData.qualification2,
              description2: filterdData.description2,

              // Project Information...
              title1: filterdData.title1,
              link1: filterdData.link1,
              projectDescription1: filterdData.projectDescription1,
              title2: filterdData.title2,
              link2: filterdData.link2,
              projectDescription2: filterdData.projectDescription2,
              title3: filterdData.title3,
              link3: filterdData.link3,
              projectDescription3: filterdData.projectDescription3,

              // Experience Information
              institute1: filterdData.institute1,
              position1: filterdData.position1,
              duration1: filterdData.duration1,
              experienceDescription1: filterdData.experienceDescription1,
              institute2: filterdData.institute2,
              position2: filterdData.position2,
              duration2: filterdData.duration2,
              experienceDescription2: filterdData.experienceDescription2,

              // Extra Information
              skill1: filterdData.skill1,
              skill2: filterdData.skill2,
              skill3: filterdData.skill3,
              skill4: filterdData.skill4,
              skill5: filterdData.skill5,
              skill6: filterdData.skill6,
              interest1: filterdData.interest1,
              interest2: filterdData.interest2,
              interest3: filterdData.interest3,
              interest4: filterdData.interest4,
              interest5: filterdData.interest5,
              interest6: filterdData.interest6,
            });
          }
        }
      });
  }
  render() {
    const { step } = this.state;
    const {
      // Profile-Information
      firstname,
      lastname,
      email,
      phone,
      website,
      github,
      linkedin,
      twitter,
      facebook,
      instagram,

      // Education Information
      college,
      fromyear1,
      toyear1,
      qualification1,
      description1,
      school,
      fromyear2,
      toyear2,
      qualification2,
      description2,

      // Project Information...
      title1,
      link1,
      projectDescription1,
      title2,
      link2,
      projectDescription2,
      title3,
      link3,
      projectDescription3,

      // Experience Information
      institute1,
      position1,
      duration1,
      experienceDescription1,
      institute2,
      position2,
      duration2,
      experienceDescription2,

      // Extra Information
      skill1,
      skill2,
      skill3,
      skill4,
      skill5,
      skill6,
      interest1,
      interest2,
      interest3,
      interest4,
      interest5,
      interest6,
    } = this.state;
    const values = {
      // Profile-Information
      firstname,
      lastname,
      email,
      phone,
      website,
      github,
      linkedin,
      twitter,
      facebook,
      instagram,

      // Education Information
      college,
      fromyear1,
      toyear1,
      qualification1,
      description1,
      school,
      fromyear2,
      toyear2,
      qualification2,
      description2,

      // Project Information...
      title1,
      link1,
      projectDescription1,
      title2,
      link2,
      projectDescription2,
      title3,
      link3,
      projectDescription3,

      // Experience Information
      institute1,
      position1,
      duration1,
      experienceDescription1,
      institute2,
      position2,
      duration2,
      experienceDescription2,

      // Extra Information
      skill1,
      skill2,
      skill3,
      skill4,
      skill5,
      skill6,
      interest1,
      interest2,
      interest3,
      interest4,
      interest5,
      interest6,
    };
    switch (step) {
      case 1:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Profile
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#00bcd4", color: "#FFFFFF" }}
                onClick={() => {
                  this.getFromDB();
                }}
              >
                GET Details
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Education
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="App mt-3">
            <div className="container col-lg-8 mx-auto text-center">
              <Projects
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Experience
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Extras
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }
}

export default Resume;
