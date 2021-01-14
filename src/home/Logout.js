import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

function Logout() {
  const history = useHistory()

  const [servers, setServers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  useEffect(async () => {
    const currentServerId = currentServer.local_server_id

    await fetchJSON(`${currentServer.address}/api/logout`, {
      headers: {
        'lavalier-token': currentServer.token
      },
      method: 'POST'
    })

    const newServers = servers.filter((server) => server.local_server_id != currentServerId)

    await setServers(newServers)
    await setCurrentServer({})

    history.push('/home') // Go home to determine where to route
  }, [])

  return <div />
}

export default Logout
