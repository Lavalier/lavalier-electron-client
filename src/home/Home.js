import { useHistory } from 'react-router-dom'
import usePersistedState from '../usePersistedState'

import LoadingScreen from '../common/LoadingScreen'

function Home() {
  const history = useHistory()

  const [servers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  if (servers.length == 0) {
    history.push('/setup')
  } else if (!currentServer.token) {
    // Set currentServer to the first server in persistant storage if a server is available
    setCurrentServer(servers[0])
  }

  return <LoadingScreen />
}

export default Home