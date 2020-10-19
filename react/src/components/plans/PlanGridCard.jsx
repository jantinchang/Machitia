import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/css/planGridCard.css";

const useStyles = makeStyles({
  root: {
    height: 350,
  },
  media: {
    height: 200,
  },
  info: {
    marginLeft: "auto",
  },
});

const PlanGridCard = ({ Plan, planDetails, onEditClick, isCreatedByUser }) => {
  const [isShown, setIsShown] = useState(false);
  const viewPlan = () => {
    planDetails(Plan);
  };
  const handleEdit = () => {
    onEditClick(Plan);
  };
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card
        className={classes.root}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <CardActionArea onClick={viewPlan}>
          <CardMedia
            className={classes.media}
            image={
              Plan.coverImageUrl ||
              "https://static.tildacdn.com/tild3064-3265-4464-a534-396633306234/94459CB2-9585-4889-8.jpg"
            }
            title={Plan.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              display="block"
              noWrap={true}
              variant="h5"
              component="h2"
            >
              {Plan.title}
            </Typography>
            <Typography
              variant="body2"
              display="block"
              noWrap={true}
              color="textSecondary"
              component="p"
            >
              {Plan.subject}
            </Typography>
          </CardContent>
        </CardActionArea>
        {isShown && (
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <i className="icofont icofont-heart-alt"></i>
            </IconButton>
            {isCreatedByUser ? (
              <IconButton className={classes.info} onClick={handleEdit}>
                <i className="fa fa-pencil"></i>
              </IconButton>
            ) : (
              <div></div>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

PlanGridCard.propTypes = {
  Plan: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subject: PropTypes.string,
    overview: PropTypes.string,
    duration: PropTypes.string,
    planTypeId: PropTypes.number,
    coverImageUrl: PropTypes.string,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    createdBy: PropTypes.number,
    modifiedBy: PropTypes.number,
  }).isRequired,
  planDetails: PropTypes.func,
  onEditClick: PropTypes.func,
  isCreatedByUser: PropTypes.bool,
};

export default PlanGridCard;
