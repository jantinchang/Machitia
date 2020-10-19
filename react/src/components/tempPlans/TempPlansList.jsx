import React from "react";
// import { PropTypes } from "prop-types";
import "rc-pagination/assets/index.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
// import PropTypes from "prop-types";
import {
  planFavoriteAdd,
  planFavoriteDelete,
  planByCurrent,
} from "../../services/planFavoriteService";
import logger from "sabio-debug";
const _logger = logger.extend("Organizations"); //anywhere in the app.

class TempPlansList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoritedPlans: [] };
  }

  componentDidMount() {
    planByCurrent().then(this.onPlanListCallSuccess);
  }

  //planListCallSucces

  onPlanListCallSuccess = (response) => {
    let initialPlans = response.item;
    this.setState((prevState) => {
      return { ...prevState, favoritedPlans: initialPlans };
    });
  };

  //Buttons

  planFavAdd = (planId) => {
    _logger("Temp Plans List");
    planFavoriteAdd(planId)
      .then(this.addToPlanList(planId))
      .then(this.planFavoriteSuccess)
      .catch(this.planFavoriteFailure);
  };

  planFavDelete = (planId) => {
    _logger("Temp Plans List");
    planFavoriteDelete(planId)
      .then(this.planFavoriteDeleteSuccess)
      .catch(this.planFavoriteDeleteFailure);
  };

  //remove from plan list
  removeFromPlanList = () => {
    // _logger("TEMP PLANS LIST", planId);
    //setstate  favoriteplans
    // for (let index = 0; index < this.state.favoritedPlans.length; index++) {
    //   const currentPlan = this.state.favoritedPlans[index];
    //   if (currentPlan === planId) {
    //     listIndex = index;
    //   }
    // }
    //  this.spliceListItem(listIndex, this.state.favoritedPlans);
    // planId = { plandID, show: false };
  };

  spliceListItem = (index, list) => {
    var planList = list;
    planList.splice(index, 1);

    planList.splice(index, 1);
    this.setState((prevState) => {
      return { ...prevState, favoritedPlans: planList };
    });
  };

  //add to plan list.

  addToPlanList = (planId) => {
    let listCopy = this.state.favoritedPlans;
    listCopy.push(planId);
    this.setState((prevState) => {
      return { ...prevState, favoritedPlans: listCopy };
    });
  };

  //Follow Success

  planFavoriteSuccess = () => {
    toast.success("Plan Followed", {
      closeOnClick: true,
      position: "top-center",
    });
  };

  //Delete Success

  planFavoriteDeleteSuccess = (id) => {
    toast.warning("Plan Unfollowed", {
      closeOnClick: true,
      position: "top-center",
    });

    const favoritedPlans = [...this.state.favoritedPlans];
    let listIndex = this.state.favoritedPlans.findIndex((plan) => plan === id);
    if (listIndex > -1) {
      favoritedPlans.splice(listIndex, 1);
    }

    this.setState((prevState) => ({ ...prevState, favoritedPlans }));
  };

  //Follow Failure

  planFavoriteFailure = () => {
    toast.failure("Plan Not Followed", {
      closeOnClick: true,
      position: "top-center",
    });
  };

  //Delete Failure

  planFavoriteDeleteFailure = () => {
    toast.failure("Plan Not UnFollowed", {
      closeOnClick: true,
      position: "top-center",
    });
  };

  isFavorited = (planId) => {
    _logger(planId, "plan Id");
    _logger(this.state.favoritedPlans.includes(planId));
    return this.state.favoritedPlans.includes(planId);
  };

  render() {
    return (
      <div className="col-12">
        <div className="row">
          {" "}
          {this.state.favoritedPlans.length > 0 ? (
            <React.Fragment>
              <CardTitle> PLAN 59</CardTitle>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </CardText>
                  <Button
                    type="button"
                    className={
                      this.isFavorited(55) ? "btn-light" : " btn-success "
                    }
                    onClick={() =>
                      this.isFavorited(55)
                        ? this.planFavDelete(55)
                        : this.planFavAdd(55)
                    }
                  >
                    {this.isFavorited(55) ? "Unfavorite" : "Favorite"}
                  </Button>
                </CardBody>
              </Card>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TempPlansList;
