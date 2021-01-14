import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import LogoText from '../common/LogoText'
import LoadingScreen from '../common/LoadingScreen'
import Profile from './Profile'

function ProfileSelection() {
  const history = useHistory()

  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  const [profiles, setProfiles] = useState()

  // Make sure we have a server before we continue :D
  if (!currentServer.token) {
    history.push('/home') // Go back to home, maybe there is another server that can be set as the currentServer

    return <div />
  }

  // Load profiles
  useEffect(async () => {
    const profilesResponse = await fetchJSON(`${currentServer.address}/api/profiles`, {
      headers: { 'lavalier-token': currentServer.token }
    })

    setProfiles(profilesResponse)
  }, [])

  async function useProfile(profile) {
    await setCurrentServer({
      ...currentServer,
      ...{
        profile: profile._id
      }
    })

    history.push('/home')
  }

  return profiles ? (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <h2 className="text-center mb-4">Who's watching?</h2>
          <div className="row row-cols-auto d-flex justify-content-center">
            {profiles.map((profile) => (
              <div className="col">
                <Profile name={profile.name} onClick={() => useProfile(profile)} />
              </div>
            ))}
            <div className="col">
              <Profile name="Add Profile" onClick={() => history.push('/profiles-add')} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger">Manage Profiles</button>
        </div>
      </div>
    </div>
  ) : (
    <LoadingScreen />
  )
}

export default ProfileSelection
