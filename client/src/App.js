import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch} from 'react-router-dom'
import store from './redux/store'
import Scribble from './redux/containers/Scribble'
import Join from './redux/containers/Join'
import Lobby from './redux/containers/Lobby'
import Error from './redux/containers/Error'
import history from './redux/history'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Join}></Route>
          <Route path="/lobby" component={Lobby}></Route> 
          <Route path="/play" component={Scribble}></Route>
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </Provider>
    );
}

export default App;
