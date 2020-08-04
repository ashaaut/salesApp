
import React from "react";
import Csvjson from './components/CSVToJSON'
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  render() {
    return (

        <h1>
          hiii
          <Csvjson/>
        </h1>
    );
  }
}

export default hot(App);
