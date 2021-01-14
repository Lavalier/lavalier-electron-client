import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import usePersistedState from '../usePersistedState'
import { pushJSON } from '../fetchUtils'

import LogoText from '../common/LogoText'
import ErrorBox from '../common/ErrorBox'

function AddProfile() {
  const [name, setName] = useState('')

  const [currentServer] = usePersistedState('currentServer', {})
  const history = useHistory()

  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (name.length > 0) {
      const profileCreateResponse = await pushJSON(
        `${currentServer.address}/api/profiles`,
        {
          name: name
        },
        {
          headers: { 'lavalier-token': currentServer.token },
          method: 'POST'
        }
      )

      if (profileCreateResponse.error) {
        setError(profileCreateResponse.message)
      } else {
        history.goBack()
      }
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <h2 className="text-center mb-4">Create Profile</h2>
          <ErrorBox message={error} />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-bold form-label">Profile Name</label>
              <input
                type="text"
                className="mb-3 form-control form-control-lg"
                placeholder="Keanu"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
              />
            </div>
            <div className="row">
              <div className="col d-grid">
                <button type="button" onClick={history.goBack} className="btn btn-lg btn-primary">
                  <i className="icon-arrow-left-circle icons right align-middle"></i>
                  <span className="align-middle">Back</span>
                </button>
              </div>
              <div className="col d-grid">
                <button type="submit" className="btn btn-lg btn-danger">
                  <span className="align-middle">Create</span>
                  <i className="icon-arrow-right-circle icons left align-middle"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProfile
