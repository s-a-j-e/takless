import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Icons, Image } from 'semantic-ui-react';
import axios from 'axios';

class UserHistory extends Component {
  constructor(props){
    super(props);
    this.state= {
      userHistory: [],
      userInfo: {},
    }
  }

  componentWillMount(){
    this.getUserHistory();
    this.getUserInfo();
  }
  
  getUserHistory() {
    const { userName } = this.props.match.params;
    axios.get(`/users/${userName}/games`)
      .then((userGameHistory) => {
        if( userGameHistory.data !== null) {
          this.setState({isUser: true});
          this.setState({userHistory: userGameHistory.data});
        }
      })
      .catch( err => console.error(err));
  }

  getUserInfo() {
    const { userName } = this.props.match.params;
    axios.get(`/users/${userName}/data`)
      .then((userInfo) => {
        if( userInfo.data !== null) {
          this.setState({isUser: true});
          this.setState({userInfo: userInfo.data});
        }
      })
      .catch( err => console.error(err));
  }

  changeHistory = (user, userURL) => {
    axios.get(`/users/${user}/data`)
      .then((userInfo) => {
        if( userInfo.data !== null) {
          axios.get(`/users/${user}/games`)
          .then((userGameHistory) => {
            if( userGameHistory.data !== null) {
              this.setState({
                userInfo: userInfo.data,
                userHistory: userGameHistory.data,
              });
            }
            this.props.history.push(userURL)
          })
        }
      })
      .catch(err => console.error(err) );
  }

  render() {
    let userInfo = this.state.userInfo;
    const eachUserGame = this.state.userHistory.map((user) => {

      const time = moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a');
      const player1UserProfile = `/profile/${user.player1}`;
      const player2UserProfile = `/profile/${user.player2}`;
  
      let typeOfWin = '';
      if (user.win_type === 'R') {
        typeOfWin = 'Road Win';
      } 
      else if (user.win_type === 'F') {
        typeOfWin = 'Flat Win'
      }
      else if (user.win_type === '1') {
        typeOfWin = 'Resegnation Win or Time Ran Out'
      }
      else if (user.win_type === '1/2') {
        typeOfWin = 'Draw'
      }
      return (
        <div>
          <div key={user.id} className="eachGame">
            <div>Played On: {time}</div>
            <div>
              <strong onClick={() => {this.changeHistory(user.player1, player1UserProfile)}}> {user.player1} </strong>
                VS  
              <strong onClick={() => {this.changeHistory(user.player2, player2UserProfile)}}>  {user.player2} </strong>
            </div>
            <div>Victor: {user.victor}</div>
            <div>{typeOfWin}</div>
            <div>Board Size: {user.board_size}</div>
            <div>PTN: {user.ptn}</div>
          </div>
        </div>
      );
    });
  
    const noHistory = (
      <div>You haven't played a game yet...</div>
    );
  
    return (
      <div className="userHistory"> 
        <div className="userInfo"> Info
            {/* <img /> */}
            <div> Username: {userInfo.username} </div>
            <div> Total Games: {userInfo.total_games} </div>
            <div> Total Ranked Games: {userInfo.ranked_games} </div>
            <div> Ranked Wins: {userInfo.ranked_wins} </div>
            <div> Ranked Losses: ???? </div>
          </div>
        <table class="tg">
         <thead>
            <th colSpan="5" className="title">
              <h3>Game History</h3>
            </th>
          </thead>
          {(this.state.userHistory.length) ? eachUserGame : noHistory}
        </table>
      </div>
    );
  }
}

export default withRouter(UserHistory);