import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

const TabbedCard = ({ agendas }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Nav tabs>
            {agendas &&
              agendas.map((agenage, index) => (
                <NavItem key={`NavItem_${index}`}>
                  <NavLink
                    className={classnames({
                      active: activeTab === agenage.agendaTypeId,
                    })}
                    onClick={() => {
                      toggle(agenage.agendaTypeId);
                    }}
                  >
                    {agenage.agendaType}
                  </NavLink>
                </NavItem>
              ))}
          </Nav>
          {agendas &&
            agendas.map((agenage, index) => (
              <TabContent activeTab={activeTab} key={`tabbed_${index}`}>
                <TabPane tabId={agenage.agendaTypeId}>
                  <Row>
                    <Col sm="12">
                      <div className="card-header">
                        <p>{agenage.educatorDoes}</p>
                        <p>{agenage.learnerDoes}</p>
                        <p>{agenage.tips}</p>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            ))}
        </CardBody>
      </Card>
    </div>
  );
};

TabbedCard.propTypes = {
  agendas: PropTypes.arrayOf(
    PropTypes.shape({
      agendaType: PropTypes.string,
      educatorDoes: PropTypes.string,
      learnerDoes: PropTypes.string,
      tips: PropTypes.string,
      agendaTypeId: PropTypes.number,
    })
  ),
};

export default TabbedCard;
