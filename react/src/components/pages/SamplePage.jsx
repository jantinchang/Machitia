import React, { Component } from "react";
// import Custom Componenets
import Breadcrumb from "../common/BreadCrumb";
class Samplepage extends Component {
  render() {
    return (
      <div>
        <Breadcrumb title="Sample Page" parent="Pages" />
        {/*Container-fluid starts*/}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Sample Card</h5>
                  <span>
                    lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </span>
                </div>
                <div className="card-body">
                  <p>
                    &quote; Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est
                    laborum.&quote;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Container-fluid Ends*/}
      </div>
    );
  }
}
export default Samplepage;
