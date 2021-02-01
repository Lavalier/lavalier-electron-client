import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON } from '../fetchUtils'

import Navbar from '../common/Navbar'
import DiscoveryRow from '../common/DiscoveryRow'

function Search(props) {
  const history = useHistory()

  const [servers] = usePersistedState('servers', [])
  const [currentServer, setCurrentServer] = usePersistedState('currentServer', {})

  const [searchResults, setSearchResults] = useState([])

  async function search(e) {
    e.preventDefault()
  }

  return (
    <div>
      <div className="min-vh-100">
        <div className="special-gradient special-gradient-two"></div>
        <div className="special-gradient-content min-vh-100">
          <Navbar profile={props.location.state.profile} />
          <div className="position-absolute start-0 end-0">
            <form onSubmit={search}>
              <input
                type="text"
                className="my-6 form-control form-control-lg"
                placeholder="Search..."
                required
                autoFocus
              />
            </form>
            <div className="mt-6" />
            {searchResults.map((section) => (
              <DiscoveryRow name={section.name} media={section.media} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
