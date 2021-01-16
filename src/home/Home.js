import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import LoadingScreen from '../common/LoadingScreen'
import Navbar from '../common/Navbar'
import DiscoveryRow from '../common/DiscoveryRow'

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
        <div className="special-gradient special-gradient-two"></div>
        <div className="special-gradient-content min-vh-100">
          <Navbar profile={profile} />
          <video
            className="w-100 h-100 position-absolute top-0 object-cover bg-black dimmed-item"
            preload="auto"
            autoPlay
            loop
            muted={featuredVideoMuted}
          >
            <source src="https://vod-progressive.akamaized.net/exp=1610718208~acl=%2A%2F675798835.mp4%2A~hmac=43bd561fe8b391df659fc56931aaf4618faa5a80de8455db9d8a5f0f76c349b7/vimeo-prod-skyfire-std-us/01/30/8/200154504/675798835.mp4?filename=The+Martian+-+Theatrical+Trailer+%28104578%29.mp4" />
          </video>
          <div className="position-absolute start-0 end-0">
            <div className="featured">
              <h1 className="display-1 text-white">The Martian</h1>
              <h4 className="text-white">2015 ‧ Sci-fi/Adventure ‧ 2h 31m</h4>
              <h4 className="text-white mt-5 w-50">
                When astronauts blast off from the planet Mars, they leave behind Mark Watney (Matt Damon), presumed
                dead after a fierce storm.
              </h4>
              <button className="btn btn-danger fw-bolder mt-4">
                <i className="icon-control-play icons right align-middle" />
                <span className="align-middle">Play</span>
              </button>
              <button className="btn btn-secondary fw-bolder mt-4 ms-3">
                <i className="icon-info icons right align-middle" />
                <span className="align-middle">Details</span>
              </button>
              <button
                className="btn btn-secondary btn-lg mt-4 ms-3 rounded-pill float-end"
                onClick={() => setFeatureVideoMuted(!featuredVideoMuted)}
              >
                {featuredVideoMuted ? (
                  <i className="icon-volume-off icons align-middle" />
                ) : (
                  <i className="icon-volume-2 icons align-middle" />
                )}
              </button>
            </div>
            <div className="mt-6" />
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
