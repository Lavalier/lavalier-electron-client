import './scss/_theme.scss'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import usePersistedState from './usePersistedState'

import Welcome from './setup/Welcome'
import ServerLogin from './setup/ServerLogin'
import SetupServer from './setup/SetupServer'
import Home from './home/Home'
import ProfileSelection from './home/ProfileSelection'
import AddProfile from './home/AddProfile'
import VideoPlayer from './watch/VideoPlayer'

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
        <Route path="/setup-server" component={SetupServer}></Route>
        <Route path="/login" component={ServerLogin}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/profiles" component={ProfileSelection}></Route>
        <Route path="/profiles-add" component={AddProfile}></Route>
        <Route path="/watch/:id" component={VideoPlayer}></Route>
      </Switch>
    </Router>
  )
}

export default App
