import React from "react";
import "../../App.css";
import PropTypes from "prop-types";
import CorrespondentList from "./CorrespondentList";
import CorrespondentCard from "./CorrespondentCard";
import MessageIndex from "./MessageIndex";
import ChatForm from "./ChatForm";
import {
  Grid,
  Dialog,
  DialogTitle,
  List,
  DialogContent,
} from "@material-ui/core";
import * as userProfileService from "../../services/userProfileServices";
import * as messageService from "../../services/messageService";
import logger from "sabio-debug";
const _logger = logger.extend("Chat Page");

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondents: [],
      dialogOpen: false,
      messages: [],
      people: [],
      correspondentSearchTerm: "",
      searchTerm: "",
      currentPage: 0,
      pageSize: 25,
      activeCorrespondent: {
        firstName: "",
        lastName: "",
        userId: 33,
        avatarUrl: "",
      },
      formData: {
        message: "",
      },
    };
  }
  componentDidMount() {
    this.getCorrespondents();
  }
  getCorrespondents = () => {
    messageService
      .getAllCorrespondents()
      .then(this.onGetCorrespondentsSuccess)
      .catch(this.onGetCorrespondentsError);
  };
  searchCorrespondents = () => {
    messageService
      .searchAllCorrespondents(this.state.correspondentSearchTerm)
      .then(this.onGetCorrespondentsSuccess)
      .catch(this.onGetCorrespondentsError);
  };
  onGetCorrespondentsSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        correspondents: response.items,
        activeCorrespondent: response.items[0],
        dialogOpen: false,
      };
    }, this.getListOfMessages(response.items[0].userId));
  };
  onGetCorrespondentsError = (errResponse) => {
    _logger(errResponse);
    this.setState((prevState) => {
      return {
        ...prevState,
        correspondents: [],
      };
    });
  };
  getListOfMessages = (correspondentId) => {
    messageService
      .getConversation(correspondentId)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };
  onGetSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        messages: response.items,
      };
    });
    _logger(response);
  };
  onGetError = (errResponse) => {
    this.clearMessages();
    _logger(errResponse);
  };
  clearMessages = () => {
    this.setState({ messages: [] });
  };
  handleCorrespondentClick = (correspondent) => {
    _logger(correspondent);
    this.setState((prevState) => {
      return {
        ...prevState,
        activeCorrespondent: correspondent,
        dialogOpen: false,
      };
    }, this.getListOfMessages(correspondent.userId));
  };
  handleCreateCoversationClick = () => {
    this.setState({ searchTerm: "", dialogOpen: true }, this.getAllPeople());
  };
  getAllPeople = () => {
    userProfileService
      .getPagList(0, 50)
      .then(this.onAllPeopleSuccess)
      .catch(this.onAllPeopleError);
  };
  onAllPeopleSuccess = (response) => {
    this.setState(() => {
      return {
        people: response.item.pagedItems,
      };
    });
    _logger(response);
  };
  onAllPeopleError = (errResponse) => {
    _logger(errResponse);
  };
  searchQuery = (pageIndex, pageSize) => {
    _logger(pageIndex, pageSize);
    userProfileService
      .search(this.state.searchTerm, pageIndex - 1, pageSize)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };
  onSearchSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        people: response.item.pagedItems,
      };
    });
  };
  onSearchError = (errResponse) => {
    _logger(errResponse);
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        people: [],
      };
    });
  };
  onChange = (page) => {
    this.setState({ currentPage: page }, () => this.returnSearchCondition());
  };
  handleSearch = (event) => {
    let searchTerm = event.target.value;

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: 1,
          searchTerm,
        };
      },
      () => this.returnSearchCondition()
    );
  };
  returnSearchCondition = () => {
    return this.state.searchTerm.length > 0
      ? this.searchQuery(this.state.currentPage, this.state.pageSize)
      : this.getAllPeople();
  };
  returnCorrespondentSearchCondition = () => {
    return this.state.correspondentSearchTerm.length > 0
      ? this.searchCorrespondents()
      : this.getCorrespondents();
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  onFormInputChange = (name, value) => {
    this.setState((prevState) => {
      const updatedFormData = {
        ...prevState.formData,
      };
      updatedFormData[name] = value;
      return { formData: updatedFormData };
    });
  };
  onSendHandler = () => {
    let obj = {
      message: this.state.formData.message,
      recipientId: this.state.activeCorrespondent.userId,
    };
    if (obj.message.length > 0) {
      messageService.add(obj).then(this.onSendSuccess).catch(this.onSendError);
    }
  };
  onSendSuccess = (response) => {
    this.setState((prevState) => {
      let list = prevState.messages;
      let message = prevState.formData;
      message.id = response.item;
      message.recipientId = prevState.activeCorrespondent.userId;
      list.push(message);
      this.handleNewChat(list);
      return {
        ...prevState,
        messages: list,
        formData: { message: "" },
      };
    });
    _logger(response);
  };
  onSendError = (errResponse) => {
    _logger(errResponse);
  };
  handleNewChat = (list) => {
    if (list.length === 1) {
      this.setState((prevState) => {
        let list = prevState.correspondents;
        list.push(prevState.activeCorrespondent);
        return {
          ...prevState,
          correspondents: list,
        };
      });
    }
  };
  handleCorrespondentSearch = (value) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          correspondentSearchTerm: value,
        };
      },
      () => this.returnCorrespondentSearchCondition()
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header">
          <div className="row"></div>
        </div>
        <Grid container>
          <Grid item xs={3}>
            <CorrespondentList
              correspondentCallback={this.handleCorrespondentClick}
              createCallback={this.handleCreateCoversationClick}
              correspondents={this.state.correspondents}
              activeId={this.state.activeCorrespondent.userId}
              handleSearch={this.handleCorrespondentSearch}
              searchTerm={this.state.correspondentSearchTerm}
            ></CorrespondentList>
          </Grid>
          <Grid item xs={9}>
            <MessageIndex
              correspondent={this.state.activeCorrespondent}
              messages={this.state.messages}
            ></MessageIndex>
            <ChatForm
              onSend={this.onSendHandler}
              onInputChange={this.onFormInputChange}
              message={this.state.formData.message}
            ></ChatForm>
          </Grid>
        </Grid>
        <Dialog
          className="people-dialog"
          aria-labelledby="simple-dialog-title"
          open={this.state.dialogOpen}
          onBackdropClick={this.handleClose}
          onEscapeKeyDown={this.handleClose}
        >
          <DialogTitle id="simple-dialog-title">
            <input
              type="text"
              name="query"
              value={this.state.searchTerm}
              id="search-input"
              placeholder="Search..."
              className="search-label form-control"
              onChange={this.handleSearch}
            />
          </DialogTitle>
          <List>
            {this.state.people[0] ? (
              this.state.people.map((correspondent, index) => {
                return (
                  <CorrespondentCard
                    onClick={this.handleCorrespondentClick}
                    key={"h" + index}
                    correspondent={correspondent}
                  ></CorrespondentCard>
                );
              })
            ) : (
              <DialogContent>
                There are no results for that search...
              </DialogContent>
            )}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
}
ChatPage.propTypes = {
  currentUserProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
export default ChatPage;
