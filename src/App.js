import './scss/_theme.scss'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import usePersistedState from './usePersistedState'

import Welcome from './setup/Welcome'
import ServerLogin from './setup/ServerLogin'
import Home from './home/Home'

function App() {
  const [servers] = usePersistedState('servers', [])

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (servers.length > 0 ? <Redirect to="/home" /> : <Redirect to="/setup" />)}
        ></Route>
        <Route path="/setup" component={Welcome}></Route>
        <Route path="/login" component={ServerLogin}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App
