import { useHistory } from 'react-router-dom'
import usePersistedState from '../usePersistedState'

import LoadingScreen from '../common/LoadingScreen'

function Home() {
  const history = useHistory()

  const [servers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  // Make sure we have a server before we continue :D
  if (servers.length == 0) {
    history.push('/setup')

    return <div />
  } else if (!currentServer.token) {
    // Set currentServer to the first server in persistant storage if a server is available
    setCurrentServer(servers[0])
  }

  return <LoadingScreen />
}

export default Home
