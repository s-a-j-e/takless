import React, { Component } from "react";
import { Modal } from "reactstrap";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Button, Icon, Input, Header } from "semantic-ui-react";
// import { Button, Icon, Input, Header, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleLoginLogout, login, setCorrGames } from "../../../actions/actions";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      usernameOrEmail: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { usernameOrEmail, password } = this.state;
    axios
      .post("/auth/login", {
        username: usernameOrEmail,
        password
      })
      .then(res => {
        let currentUserInfo = res.data;
        let currentUsername = res.data.currentUsername;
        this.props.toggleView("off");
        this.props.toggleLoginLogout(true);
        this.props.login(currentUserInfo);
        this.fetchGames();
        this.props.socket.emit('login', currentUsername);
      })
      .catch(err => {
        console.error(err);
      });
  }

  fetchGames() {
    let { userID } = this.props;
    axios.get(`/users/${userID}/games/current`)
      .then((games) => {
        this.props.setCorrGames(games.data);
      });
  }

  render() {
    return (
      <Modal isOpen={this.props.modalView === "login"}>
        <div className="log">
          <Header icon='LogIn' content='Log-In to Your Account' />
          <a href="/auth/google">
            <Button circular class="ui google plus button" role="button" color="google plus">
              <i aria-hidden="true" class="google plus icon"></i>
              | Google
            </Button>
          </a>


          <a href="/auth/facebook">
            <Button circular class="ui facebook button" role="button" color="facebook">
              <i aria-hidden="true" class="facebook icon"></i>
              |  Facebook
            </Button>
          </a>

          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                <p className="logTag">Username:</p>
                <Input className="hvr-shadow-radial" required>
                  <div className="ui left icon input">
                    <i class="user icon"></i>
                    <input
                      type="text"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                </Input>
              </div>
              <div>
                <p className="logTag">Password:</p>
                <Input className="hvr-shadow-radial" required>
                  <div className="ui left icon input">
                    <i class="lock icon"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                </Input>
              </div>
            </div>
            <Button id="loginButton" size="large">Log In  <Icon size="large" name="sign in" corner="true" /></Button>
          </form>
          <p className="question">Here for the first time?</p>
          <Button
            color="blue"
            onClick={() => {
              this.props.toggleView("signup");
            }}
            link
          >
            Click here to Signup
          </Button>
          <Button
            color="red"
            onClick={() => {
              this.props.toggleView("off");
            }}
          >
            <Icon size="large" name="ban" corner="true"/>
            Cancel
          </Button>
        </div>
      </Modal>
    );
    // return (
    //   <Modal trigger={<nav>Log-In</nav>} closeIcon>
    //     <Header icon='LogIn' content='Log-In to Your Account' />
    //     <div className="log">
    //        <a href="/auth/google">
    //          <Button class="ui google plus button" role="button" color="red">
    //            <i aria-hidden="true" class="google plus icon"></i>
    //            |   Sign in with Google
    //          </Button>
    //        </a>
    //        <form onSubmit={this.handleSubmit}>
    //          <div>
    //            <p className="logTag">Username:</p>
    //            <Input className="hvr-shadow-radial" required>
    //              <div className="ui left icon input">
    //                <i class="user icon"></i>
    //                <input
    //                 type="text"
    //                 placeholder="Username"
    //                 value={this.state.username}
    //                 onChange={this.handleUsernameChange}
    //               />
    //             </div>
    //           </Input>
    //         </div>
    //         <div>
    //           <p className="logTag">Password:</p>
    //           <Input className="hvr-shadow-radial" required>
    //             <div class="ui left icon input">
    //               <i class="lock icon"></i>
    //               <input
    //                 type="password"
    //                 placeholder="Password"
    //                 value={this.state.password}
    //                 onChange={this.handlePasswordChange}
    //               />
    //             </div>
    //           </Input>
    //         </div>

    //         <Button id="loginButton" size="large" animated>
    //           <Button color="#4cc560">Log In  <Icon size="large" name="sign in" corner="true"/></Button>
    //         </Button>
    //       </form>
    //       <p className="question">Here for the first time?</p>
    //       <Button
    //         color="blue"
    //         onClick={() => {
    //           this.props.toggleView("signup");
    //         }}
    //       >
    //         Click here to signup
    //       </Button>
    //       <Button
    //         color="blue"
    //         onClick={() => {
    //           this.props.toggleView("off");
    //         }}
    //       >
    //         Cancel
    //       </Button>
    //     </div>
    //   </Modal>
    // );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    userID: state.userID,
    currentUsername: state.currentUsername,
    socket: state.socket,
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleLoginLogout, login, setCorrGames }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
