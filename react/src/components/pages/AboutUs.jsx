import React from "react";
import AboutCard from "../aboutUs/AboutCard";
import "../../assets/css/aboutUs.css";
import { Button } from "reactstrap";

class AboutUsPage extends React.Component {
  render() {
    const background = require("../../assets/images/coming-soon-bg.jpg");
    const background2 = require("../../assets/images/whether-widgetbg.jpg");

    return (
      <React.Fragment>
        <div>
          <AboutCard title="About Us" parent="Pages" />
          {/*Container-fluid starts*/}
          <div
            className="auth-innerleft"
            style={{ backgroundImage: "url(" + background + ")" }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div
                      className="auth-innerleft"
                      style={{ backgroundImage: "url(" + background2 + ")" }}
                    >
                      <div className="card-header">
                        <h3 className="text-center">
                          <strong>
                            <em>Sharing and Collaborating</em> lesson plans
                            shouldnt be so frustrating, right?!
                          </strong>
                        </h3>
                        <h6 className="text-center">
                          The education for liberation platform
                        </h6>
                      </div>
                      <div className="card-body text-center">
                        <Button type="submit">Newsletter Signup</Button>
                        <Button className="btn btn-success">Beta User</Button>
                      </div>
                    </div>
                    <div className="card-header">
                      <h3 className="text-center">
                        <strong>Supporters</strong>
                      </h3>
                      <h6 className="text-center">
                        Letter of Intent (LOI) from the following organization
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="http://casaquetzalcoatl.org">
                              <img
                                src="https://thumb.tildacdn.com/tild6439-6239-4736-a537-633332666461/-/resize/260x/-/format/webp/IMG_0108.PNG"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.teachforamerica.org/life-in-the-corps/your-tfa-network/native-alliance">
                              <img
                                src="https://thumb.tildacdn.com/tild6565-3237-4363-a236-623466613966/-/resize/260x/-/format/webp/1528495_534296163344.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.edliberation.org/">
                              <img
                                src="https://thumb.tildacdn.com/tild6534-3832-4638-a561-363734313533/-/resize/260x/-/format/webp/Ed_Lib_Network.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://fmfp.org/">
                              <img
                                src="https://thumb.tildacdn.com/tild6430-3361-4430-b836-633133343937/-/resize/260x/-/format/webp/fmfp.jpeg"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.teachforamerica.org/life-in-the-corps/your-tfa-network/asian-american-pacific-islander-alliances">
                              <img
                                src="https://thumb.tildacdn.com/tild6666-6338-4438-a164-666638303638/-/resize/220x/-/format/webp/noroot.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.teachforamerica.org/life-in-the-corps/your-tfa-network/latinx-alliances">
                              <img
                                src="https://thumb.tildacdn.com/tild3439-3233-4439-b266-656632306465/-/resize/220x/-/format/webp/28471409_76803923004.jpg"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.teachforamerica.org/life-in-the-corps/your-tfa-network/black-community-alliances">
                              <img
                                src="https://thumb.tildacdn.com/tild3865-3230-4638-a239-656231373266/-/resize/220x/-/format/webp/12108850_11412311959.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column">
                          <div className="p-0 col-md-6">
                            <a href="https://www.teachforamerica.org/life-in-the-corps/your-tfa-network/lgbtq-community-initiative">
                              <img
                                src="https://thumb.tildacdn.com/tild3435-3166-4830-b133-306265386631/-/resize/220x/-/format/webp/noroot.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column_3">
                          <div className="p-0 col-md-6">
                            <a href="http://www.democraticeducation.org/index.php/index/">
                              <img
                                src="https://thumb.tildacdn.com/tild3963-6131-4633-b736-343062323237/-/resize/220x/-/format/webp/idea-logo-new.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column_3">
                          <div className="p-0 col-md-6">
                            <a href="https://justexperienceus.com/">
                              <img
                                src="https://thumb.tildacdn.com/tild3531-3062-4830-b134-336330636363/-/resize/220x/-/format/webp/JE_All_Gold_Logo.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <div className="ab-column_3">
                          <div className="p-0 col-md-6">
                            <a href="http://www.acostaeducationalpartnership.com/">
                              <img
                                src="https://thumb.tildacdn.com/tild3861-3961-4433-b937-653731363764/-/resize/220x/-/format/webp/aep-full-logo-color_.png"
                                className="logo-login"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <Button type="submit">Become a Partner</Button>
                    </div>
                    <div className="card-header">
                      <h3 className="text-center">
                        <strong>
                          Thousands of educators already interested
                        </strong>
                      </h3>
                      <h6 className="text-center">
                        Through our partners, we know Machitia is the needed
                        platform for educators dedicated to education for
                        liberation!
                      </h6>
                    </div>
                    <div className="card-body">
                      <h3 className="text-center">
                        <strong>85,000</strong>
                      </h3>
                      <h6 className="text-center">educators interested</h6>
                    </div>
                    <div className="card-body">
                      Interesting in <strong>joining the team?</strong>
                      <div className="text-center">
                        <Button className="btn btn-success">Lets Go</Button>
                      </div>
                    </div>
                    <div
                      className="auth-innerleft"
                      style={{ backgroundImage: "url(" + background2 + ")" }}
                    >
                      <div className="card-header">
                        <h3 className="text-center">
                          <strong>Support Us!</strong>
                        </h3>
                        <h6 className="text-center">
                          Want to support us? You can fill out these forms to
                          stay updated or be a potential beta user, petition to
                          help us get funded.
                        </h6>
                        <div className="text-center">
                          <Button type="submit">Beta User Sign Up</Button>
                          <Button className="btn btn-success">
                            Newsletter Sign up
                          </Button>
                        </div>
                      </div>
                      <div className="card-body">
                        Is your <strong>Organization</strong> interested in
                        learning more?
                        <div className="text-center">
                          <Button className="btn btn-success">
                            Org Interest Form
                          </Button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Container-fluid Ends*/}
        </div>
      </React.Fragment>
    );
  }
}
export default AboutUsPage;
