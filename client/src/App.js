import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Add from './Components/Add/Add'
import Landing from './Components/Landing/Landing'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/add'>
            <Add />
          </Route>
          <Route path='/landing'>
            <Landing />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
