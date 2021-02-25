import logo from './logo.svg';
import React from 'react';
import Users from './Users.js';
import Messages from './Messages.js';
import Media from './Media.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        messages: [],
        media: []
      }
    }

  handleMessages = (msg) => {
    this.setState({
      messages : msg
    });
  }
  
  handleMedia = (media) => {
    this.setState({
      media: media
    });
  }

  render() {
    return (
      <div className="container">
      <Users onMessageUpdated={this.handleMessages} onMediaUpdated={this.handleMedia}></Users>
      <Messages messages={this.state.messages}></Messages>
        <Media media={this.state.media}></Media>
      </div>
    );  
  }
}

export default App;
