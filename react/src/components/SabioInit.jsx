import logger from "sabio-debug";
import React, { Component } from "react";
import { Row, Col } from "reactstrap";

const _logger = logger.extend("SabioInit");

class SabioInit extends Component {
  state = { isLocalSetUp: false, storeValue: "", nsKeys: [] };

  componentDidMount() {
    _logger("componentDidMount");
    let isLocalSetUp = false;
    let storeValue = localStorage.getItem("debug");
    let nsKeys = [];
    if (storeValue) {
      isLocalSetUp = true;
      nsKeys = storeValue.split(",");
    }

    this.setState({ isLocalSetUp, storeValue, nsKeys });
  }
  onSetDebug = () => {
    localStorage.setItem(
      "debug",
      "sabio,sabio:App,sabio:autoLogin,sabio:SabioInit,sabio:Wild*"
    );

    window.location.reload();
  };

  render() {
    _logger("rendering");
    return (
      <React.Fragment>
        {" "}
        <div className="col">
          <div className="row">
            <div className="col-12">
              <h1>Getting Started - Sabio</h1>
            </div>
          </div>

          {this.state.nsKeys.length === 0 && (
            <div className="row">
              <div className="col-8">
                <p>
                  You currently do not have any &quot;debug&quot; settings in
                  localStorage.
                </p>
                <p>
                  If you show your developer tools &gt; Console you will see no
                  messages.
                </p>
                <p>
                  Click here to have some defaults set up for you:{" "}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={this.onSetDebug}
                  >
                    Set Up
                  </button>
                </p>
              </div>
            </div>
          )}

          {this.state.nsKeys.length > 0 && (
            <Row>
              <Col>
                Console &quot;debug&quot; settings currently set to show{" "}
                {this.state.nsKeys.length} namespaces{" "}
                <ul>
                  {" "}
                  {this.state.nsKeys.map((namespace, id) => (
                    <li key={id}>{namespace}</li>
                  ))}
                </ul>
                <p>
                  <strong>
                    Check out the output visible in the console. Be sure to read
                    the README.md in the react folder root for more information
                    and details on further set up.
                  </strong>
                </p>
                <p>
                  Learn more about the debug logger{" "}
                  <a
                    href="https://www.npmjs.com/package/debug"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </p>
              </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SabioInit;
