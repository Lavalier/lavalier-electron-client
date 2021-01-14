import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import LoadingScreen from '../common/LoadingScreen'
import Navbar from '../common/Navbar'

function Home() {
  const history = useHistory()

  const [servers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  const [profile, setProfile] = useState()
  const [discovery, setDiscovery] = useState()
  const [featured, setFeatured] = useState()

  // Make sure we have a server before we continue :D
  if (servers.length == 0) {
    history.push('/setup')

    return <div />
  } else if (!currentServer.token) {
    // Set currentServer to the first server in persistant storage if a server is available
    setCurrentServer(servers[0])
  }

  // Ensure a profile is selected before continuing to home
  if (!currentServer.profile) {
    history.push('/profiles')

    return <div />
  }

  // Update currentServer.server_name and download home page data
  useEffect(async () => {
    const serverInfoResponse = await fetchJSON(`${currentServer.address}/api/serverInfo`, {
      headers: {
        'lavalier-token': currentServer.token
      }
    })

    if (!serverInfoResponse.error) {
      await setCurrentServer({
        ...currentServer,
        ...{
          server_name: serverInfoResponse.server_name
        }
      })
    } else {
      // Not authorized
      history.push('/logout')
    }

    const profileResponse = await fetchJSON(`${currentServer.address}/api/profiles/${currentServer.profile}`, {
      headers: {
        'lavalier-token': currentServer.token
      }
    })

    // Profile was not found, go back to profile selection ui
    if (profileResponse.error) {
      // hi, don't fix the nesting of this because it will cause errors, thanks
      if (profileResponse.statusCode != 401) {
        history.push('/profiles')
      }
    } else {
      setProfile(profileResponse)
    }

    const discoveryResponse = await fetchJSON(`${currentServer.address}/api/discovery`, {
      headers: {
        'lavalier-token': currentServer.token
      }
    })

    // Discovery content not found
    if (discoveryResponse.error) {
      // TODO: Error???
    } else {
      setDiscovery(discoveryResponse)
    }

    const featuredContentResponse = await fetchJSON(`${currentServer.address}/api/discovery/featured`, {
      headers: {
        'lavalier-token': currentServer.token
      }
    })

    // Discovery content not found
    if (featuredContentResponse.error) {
      // TODO: Error???
    } else {
      setFeatured(featuredContentResponse)
    }
  }, [])

  return profile && discovery && featured ? (
    <div>
      <div className="min-vh-100">
        <div className="special-gradient special-gradient-one"></div>
        <div className="special-gradient-content min-vh-100">
          <Navbar profile={profile} />
        </div>
      </div>
    </div>
  ) : (
    <LoadingScreen />
  )
}

export default Home
