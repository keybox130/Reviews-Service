import React from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rooms: []
    }

  }

  componentDidMount() {
    this.getAllStays();
  }

  // gets all stays from the server (will be refactored to get stay)
  getAllStays() {
    axios.get('/stays')
    .then(rooms => {
      console.log(JSON.stringify(rooms));
      this.setState({
        rooms: rooms.data
      });
    });
  }

  render() {
    if (!this.state.rooms.length) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      debugger;
      return (
        <div>
          <h2>Hello world!</h2>
          <ReviewList reviews={this.state.rooms[0].reviews}/>
        </div>
      );
    }

  }
}

export default App;