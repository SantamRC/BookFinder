import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import ProtectedRoute from './Components/protectedRoute/Route'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/add'>
            <ProtectedRoute route='add' />
          </Route>
          <Route path='/'>
            <ProtectedRoute route='landing' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
