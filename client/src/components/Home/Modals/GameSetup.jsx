import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Select,
  Checkbox,
} from 'semantic-ui-react';

class GameSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 5,
      isPrivate: false,
      isLive: true,
      roomId: '',
      timeControl: 0,
      timeIncrement: 0
    }

    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleLiveChange = this.handleLiveChange.bind(this);
    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);

  }

  handleTimeControl = e => this.setState({ timeControl: e.target.value })
  handleTimeIncrement = e => this.setState({ timeIncrement: e.target.value })

  handleBoardSizeChange(e, { value }) {
    this.setState({
      boardSize: Number(value)
    });
  }

  handlePrivacyChange() {
    this.setState({
      isPrivate: !this.state.isPrivate
    });
  }



  handleRoomIdChange(e, { value }) {
    this.setState({
      roomId: value
    });
  }

  handleLiveChange() {
    this.setState({
      isLive: !this.state.isLive,
    });
  }

  render() {


    const isFriendGame = this.props.gameType === 'friend';
    const { boardSize, isPrivate, roomId, timeControl, isLive, timeIncrement } = this.state;
    return (
      <Modal
        open={this.props.modalView === 'GameSetup'}
        size="small"

        dimmer={false}

      >
        <Modal.Header>GameSetup</Modal.Header>
        <Modal.Content>
          <Form size="small" key="small">
            <Form.Group inline label="Board Size">
              <label>Board Size</label>
              <Form.Radio
                label="3x3"
                value="3"
                checked={this.state.boardSize === 3}
                onChange={this.handleBoardSizeChange}
              />
              <Form.Radio
                label="4x4"
                value="4"
                checked={this.state.boardSize === 4}
                onChange={this.handleBoardSizeChange}
              />
              <Form.Radio
                label="5x5"
                value="5"
                checked={this.state.boardSize === 5}
                onChange={this.handleBoardSizeChange}
              />
              <Form.Radio
                label="6x6"
                value="6"
                checked={this.state.boardSize === 6}
                onChange={this.handleBoardSizeChange}
              />
              <Form.Radio
                label="7x7"
                value="7"
                checked={this.state.boardSize === 7}
                onChange={this.handleBoardSizeChange}
              />
              <Form.Radio
                label="8x8"
                value="8"
                checked={this.state.boardSize === 8}
                onChange={this.handleBoardSizeChange}
              />
            </Form.Group>

            <div><strong>Minutes per side</strong>: {this.state.timeControl} minute(s)</div>
            <input className='slider' type='range' min={0} max={60} value={this.state.timeControl} onChange={this.handleTimeControl} />
            <div><strong>Increment in seconds</strong>: {this.state.timeIncrement} second(s)</div>
            <input className='slider' type='range' min={0} max={20} value={this.state.timeIncrement} onChange={this.handleTimeIncrement} />
            <br />
            <Form.Field
              control={Checkbox}
              label="Private"
              onChange={this.handlePrivacyChange}
            />
            <Form.Field
              control={Checkbox}
              label="Correspondence"
              onChange={this.handleLiveChange}
            />



            <Form.Input
              type="text"
              label="Room Name"
              placeholder="optional"
              value={this.state.roomId}
              onChange={this.handleRoomIdChange}
            />

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Close"
            onClick={() => this.props.changeView('')}
          />
          <Button
            positive
            content="New Game"
            onClick={() => this.props.handleCreateGame(boardSize, timeControl, timeIncrement, isFriendGame, isPrivate, isLive, roomId)}
          />

        </Modal.Actions>
      </Modal>
    );
  }
}

export default GameSetup;
