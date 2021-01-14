import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import LogoText from './LogoText'

function Navbar(props) {
  const history = useHistory()

  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  const [profiles, setProfiles] = useState([])

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

    history.go(0)
  }

  function manageProfiles() {
    history.push('/profiles')
  }

  async function signout() {
    history.push('/logout')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-special">
      <div className="container-fluid px-5">
        <a className="navbar-brand">
          <LogoText white small />
        </a>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav me-auto">
            <a className="nav-link active user-select-none">
              <i className="icon-home icons right align-middle" />
              <span className="align-middle">Home</span>
            </a>
            <a className="nav-link user-select-none">
              <i className="icon-magnifier icons right align-middle" />
              <span className="align-middle">Search</span>
            </a>
            <a className="nav-link user-select-none">
              <i className="icon-film icons right align-middle" />
              <span className="align-middle">Movies</span>
            </a>
            <a className="nav-link user-select-none">
              <i className="icon-screen-desktop icons right align-middle" />
              <span className="align-middle">TV Shows</span>
            </a>
            <a className="nav-link user-select-none">
              <i className="icon-heart icons right align-middle" />
              <span className="align-middle">Favorites</span>
            </a>
          </div>
          <div className="navbar-nav">
            <a className="dropdown text-decoration-none">
              <a className="nav-link dropdown-toggle user-select-none" role="button">
                {props.profile.name}
              </a>
              <ul className="dropdown-menu dropdown-menu-end small dropdown-menu-dark d-block">
                {profiles
                  .filter((profile) => profile._id != props.profile._id)
                  .map((profile) => (
                    <li>
                      <a
                        className="dropdown-item text-truncate user-select-none"
                        onClick={async () => useProfile(profile)}
                      >
                        {profile.name}
                      </a>
                    </li>
                  ))}
                <li>
                  <a className="dropdown-item user-select-none" onClick={() => manageProfiles()}>
                    Manage Profiles
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item user-select-none">Account</a>
                </li>
                <li>
                  <a className="dropdown-item user-select-none">Switch Server</a>
                </li>
                <li>
                  <a
                    className="dropdown-item user-select-none"
                    onClick={async () => {
                      signout()
                    }}
                  >
                    Sign out of Lavalier
                  </a>
                </li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
