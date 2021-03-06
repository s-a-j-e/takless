import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Lobby from './lobby';
import InPlay from './InPlay';
import Leaderboard from './Leaderboard';
import LobbyTable from '../../containers/Home/lobby_table';
import GameSetup from './Modals/GameSetup';
import GameLink from './Modals/GameLink';
import generateRoomName from './roomNames';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: '',
      lobbyView: 'lobby',
      gameType: '',
      url: '',
      link: '',
      leaderboard: [],
      boardSize: '',
      timeControl: '',
      timeIncrement: '',
      isFriendGame: '',
      isPrivate: '',
      isLive: ''

    };
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getLeaderboard();
  }

  changeView(modalView) {
    this.setState({
      modalView,
    });
  }

  handleCreateGame(boardSize, timeControl, timeIncrement, isFriendGame, isPrivate, isLive, roomId, color) {
    if (boardSize) {
      if (!roomId) {
        roomId = generateRoomName();
      }
      const { socket } = this.props;
      var timer
      if (+timeControl !== 0) {
        timer = timeControl * 60
      } else {
        timer = undefined
      }

      this.setState({
        boardSize,
        timeControl,
        timeIncrement,
        isFriendGame,
        isPrivate,
        isLive,
        color
      })
      socket.emit('createGame', {
        boardSize,
        timeControl: timer,
        timeIncrement: Number(timeIncrement),
        isFriendGame,
        isPrivate,
        isLive,
        color,
        roomId
      });
      socket.on('gameInitiated', ({ roomId }) => {
        // TODO: Change URL from localhost to takless for deployment
        let url = `http://www.takless.org/game/${roomId}`;
        let link = `game/${roomId}`;
        this.setState({
          url,
          link,
          modalView: 'GameLink'
        });
      });
    }
  }

  getLeaderboard() {
    axios.get('/leaderboard')
      .then((board) => {
        this.setState({ leaderboard: board.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    var { boardSize,
      timeControl,
      timeIncrement,
      isPrivate,
      isLive, color } = this.state

    return (
      <div className="takless">
        <div className="left">
          <h1 id="logo">Tak<span id="sub-logo">less</span></h1>
          <button
            className="createGame"
            onClick={() =>
              this.setState({
                modalView: 'GameSetup',
                gameType: 'general'
              })
            }
          >
            Create Game
          </button>
          <button
            className="createGame"
            onClick={() => {
              this.setState({
                modalView: 'GameSetup',
                gameType: 'friend'
              });
            }}
          >
            Play with Friend
          </button>
          <InPlay />
        </div>
        <div className="main">
          <div className="lobby">
            <Lobby socket={this.props.socket} />
          </div>
          <GameSetup
            modalView={this.state.modalView}
            gameType={this.state.gameType}
            changeView={this.changeView}
            handleCreateGame={this.handleCreateGame}
          />
          <GameLink
            boardSize={boardSize}
            timeControl={timeControl}
            timeIncrement={timeIncrement}
            color={color}
            isPrivate={isPrivate}
            isLive={isLive}
            modalView={this.state.modalView}
            gameType={this.state.gameType}
            changeView={this.changeView}
            url={this.state.url}
            link={this.state.link}
          />
          <Leaderboard leaderboard={this.state.leaderboard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.currentUsername,
    socket: state.socket
  };
};

export default withRouter(connect(mapStateToProps)(Home));
