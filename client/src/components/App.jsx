import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rooms: []
    }

    this.getAllStays();
  }

  // gets all stays from the server (will be refactored to get stay)
  getAllStays() {
    axios.get('/stays')
    .then(rooms => {
      console.log(JSON.stringify(rooms));
      this.setState({
        rooms: rooms
      });
    });
  }

  render() {
    return (
      <h2>Hello world!</h2>
    );
  }
}

export default App;