import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import LoadingScreen from '../common/LoadingScreen'
import Navbar from '../common/Navbar'
import DiscoveryRow from '../common/DiscoveryRow'
import FeaturedJumbotron from './FeaturedJumbotron'

function Home() {
  const history = useHistory()

  const [servers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  const [profile, setProfile] = useState()
  const [discovery, setDiscovery] = useState()
  const [featured, setFeatured] = useState()

  const [featuredVideoMuted, setFeatureVideoMuted] = useState(true)

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

    if (featuredContentResponse.error) {
      setFeatured({})
    } else {
      setFeatured(featuredContentResponse)
    }
  }, [])

  return profile && discovery && featured ? (
    <div>
      <div className="min-vh-100">
        <div className="special-gradient special-gradient-two"></div>
        <div className="special-gradient-content min-vh-100">
          <Navbar profile={profile} />
          {featured._id && (
            <video
              className="w-100 h-100 position-absolute top-0 object-cover bg-black dimmed-item"
              preload="auto"
              autoPlay
              loop
              muted={featuredVideoMuted}
            >
              <source src={featured.trailer} />
            </video>
          )}
          <div className="position-absolute start-0 end-0">
            {featured._id && (
              <FeaturedJumbotron
                content_title={featured.content_title}
                release_date={featured.release_date}
                genres={featured.genres}
                runtime={featured.runtime}
                summary={featured.summary}
                onClick={() => setFeatureVideoMuted(!featuredVideoMuted)}
                muted={featuredVideoMuted}
                onPlay={async () => {
                  history.push(`/watch/${featured._id}`)
                }}
              />
            )}
            {featured._id ? <div className="mt-6" /> : <div className="mt-6-no-video" />}
            {discovery.map((section) => (
              <DiscoveryRow name={section.name} media={section.media} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingScreen />
  )
}

export default Home
